import type { CategorySlug, PackType, Product, ProductForm } from "@/data/catalog";

/*
 * Shop filtering, sorting and URL state. Pure functions over a product list, so the same logic
 * can run against Shopify data later. The URL is the source of truth:
 *   /shop?category=ground-spices&q=haldi&sort=price-asc&min=50&max=150&form=Ground,Whole&pack=Pouch&note=Fortified
 */

export type SortKey = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
];

export const pricePresets = [
  { label: "Under ₹100", min: null, max: 99 },
  { label: "₹100 – ₹200", min: 100, max: 200 },
  { label: "Over ₹200", min: 201, max: null },
] as const;

export type ShopQuery = {
  q: string;
  category: CategorySlug | null;
  sort: SortKey;
  min: number | null;
  max: number | null;
  forms: ProductForm[];
  packs: PackType[];
  notes: string[];
};

export const emptyQuery: ShopQuery = {
  q: "",
  category: null,
  sort: "featured",
  min: null,
  max: null,
  forms: [],
  packs: [],
  notes: [],
};

/** The values each multi-select filter can take, read from the products themselves. */
export function filterOptions(products: Product[]) {
  const uniq = <T,>(values: T[]) => [...new Set(values)];
  return {
    forms: uniq(products.map((p) => p.form)),
    packs: uniq(products.map((p) => p.packType)),
    notes: uniq(products.flatMap((p) => p.packNotes ?? [])),
    priceRange: [Math.min(...products.map((p) => p.price)), Math.max(...products.map((p) => p.price))] as const,
  };
}

const num = (value: string | null) => {
  if (value === null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : null;
};

/** Reads the URL, dropping anything unknown so a bad link degrades to a wider result, never an error. */
export function parseQuery(
  params: URLSearchParams,
  products: Product[],
  isCategory: (value: string | null) => value is CategorySlug,
): ShopQuery {
  const options = filterOptions(products);
  const list = <T extends string>(key: string, allowed: readonly T[]) =>
    (params.get(key) ?? "").split(",").filter((v): v is T => (allowed as readonly string[]).includes(v));
  const sort = params.get("sort");
  const category = params.get("category");

  return {
    q: (params.get("q") ?? "").slice(0, 80),
    category: isCategory(category) ? category : null,
    sort: sortOptions.some((o) => o.value === sort) ? (sort as SortKey) : "featured",
    min: num(params.get("min")),
    max: num(params.get("max")),
    forms: list("form", options.forms),
    packs: list("pack", options.packs),
    notes: list("note", options.notes),
  };
}

export function toSearchString(query: ShopQuery) {
  const params = new URLSearchParams();
  if (query.category) params.set("category", query.category);
  if (query.q.trim()) params.set("q", query.q);
  if (query.sort !== "featured") params.set("sort", query.sort);
  if (query.min !== null) params.set("min", String(query.min));
  if (query.max !== null) params.set("max", String(query.max));
  if (query.forms.length) params.set("form", query.forms.join(","));
  if (query.packs.length) params.set("pack", query.packs.join(","));
  if (query.notes.length) params.set("note", query.notes.join(","));
  const s = params.toString();
  return s ? `?${s}` : "";
}

function matchesSearch(product: Product, q: string, categoryName: string) {
  const haystack = [
    product.name,
    product.alsoKnownAs,
    product.description,
    categoryName,
    product.form,
    product.packType,
    ...(product.packNotes ?? []),
  ]
    .join(" ")
    .toLowerCase();
  // Every word must appear somewhere, so "ground haldi" narrows rather than widens.
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

type Group = "q" | "category" | "price" | "forms" | "packs" | "notes";

function matches(product: Product, query: ShopQuery, categoryName: (slug: CategorySlug) => string, skip?: Group) {
  if (skip !== "q" && query.q.trim() && !matchesSearch(product, query.q, categoryName(product.category))) return false;
  if (skip !== "category" && query.category && product.category !== query.category) return false;
  if (skip !== "price" && query.min !== null && product.price < query.min) return false;
  if (skip !== "price" && query.max !== null && product.price > query.max) return false;
  if (skip !== "forms" && query.forms.length && !query.forms.includes(product.form)) return false;
  if (skip !== "packs" && query.packs.length && !query.packs.includes(product.packType)) return false;
  if (skip !== "notes" && query.notes.length && !query.notes.some((n) => product.packNotes?.includes(n))) return false;
  return true;
}

export function applyQuery(
  products: Product[],
  query: ShopQuery,
  categoryName: (slug: CategorySlug) => string,
  featuredIds: string[],
) {
  const rank = (p: Product) => {
    const i = featuredIds.indexOf(p.id);
    return i === -1 ? featuredIds.length + products.indexOf(p) : i;
  };
  const compare: Record<SortKey, (a: Product, b: Product) => number> = {
    featured: (a, b) => rank(a) - rank(b),
    "price-asc": (a, b) => a.price - b.price || a.name.localeCompare(b.name),
    "price-desc": (a, b) => b.price - a.price || a.name.localeCompare(b.name),
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
  };
  return products.filter((p) => matches(p, query, categoryName)).sort(compare[query.sort]);
}

/** How many products each option would show, given every *other* active filter. */
export function facetCounts(products: Product[], query: ShopQuery, categoryName: (slug: CategorySlug) => string) {
  const count = <K extends string>(group: Group, key: (p: Product) => K[]) => {
    const counts = new Map<K, number>();
    for (const p of products) {
      if (!matches(p, query, categoryName, group)) continue;
      for (const k of key(p)) counts.set(k, (counts.get(k) ?? 0) + 1);
    }
    return counts;
  };
  return {
    category: count("category", (p) => [p.category]),
    forms: count("forms", (p) => [p.form]),
    packs: count("packs", (p) => [p.packType]),
    notes: count("notes", (p) => p.packNotes ?? []),
  };
}

export type ActiveFilter = { key: string; label: string; remove: Partial<ShopQuery> };

export function activeFilters(query: ShopQuery, categoryName: (slug: CategorySlug) => string): ActiveFilter[] {
  const out: ActiveFilter[] = [];
  if (query.q.trim()) out.push({ key: "q", label: `“${query.q.trim()}”`, remove: { q: "" } });
  if (query.category) out.push({ key: "category", label: categoryName(query.category), remove: { category: null } });
  if (query.min !== null || query.max !== null) {
    const label =
      query.min !== null && query.max !== null
        ? `₹${query.min} – ₹${query.max}`
        : query.min !== null
          ? `From ₹${query.min}`
          : `Up to ₹${query.max}`;
    out.push({ key: "price", label, remove: { min: null, max: null } });
  }
  for (const f of query.forms) out.push({ key: `form-${f}`, label: f, remove: { forms: query.forms.filter((x) => x !== f) } });
  for (const p of query.packs) out.push({ key: `pack-${p}`, label: p, remove: { packs: query.packs.filter((x) => x !== p) } });
  for (const n of query.notes) out.push({ key: `note-${n}`, label: n, remove: { notes: query.notes.filter((x) => x !== n) } });
  return out;
}
