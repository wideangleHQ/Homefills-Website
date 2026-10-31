"use client";

import { ArrowUpDown, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

import { ProductCard } from "@/components/store/product-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { categories, featuredProducts, products } from "@/data/catalog";
import { catalogueBanners, type Promo } from "@/data/promotions";
import { activeFilters, applyQuery, pricePresets, sortOptions, toSearchString, type SortKey } from "@/lib/shop-query";

import { FilterPanel } from "./filter-panel";
import { categoryName, useGridColumns, useShopQuery } from "./use-shop-query";

const featuredIds = featuredProducts.map((p) => p.id);
const ROWS_PER_PAGE = 3;

export function ShopCatalogue() {
  const { query, update, reset } = useShopQuery();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const columns = useGridColumns();

  const results = useMemo(() => applyQuery(products, query, categoryName, featuredIds), [query]);
  const active = activeFilters(query, categoryName);
  const sheetFilterCount = active.filter((f) => f.key !== "q").length;

  return (
    <section id="catalogue" aria-labelledby="catalogue-title" className="scroll-mt-[calc(var(--header-h)+2.4rem)]">
      {/* Sticky below the global header (which includes its announcement bar). */}
      <div className="sticky top-[calc(var(--header-h)+2.4rem)] z-30 border-b border-line bg-canvas/95 backdrop-blur-xs">
        <div className="container-page flex items-center gap-2 py-2.5 lg:gap-3">
          <label className="relative flex min-w-0 flex-1 items-center lg:max-w-sm">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 size-4.5 text-subtle" aria-hidden />
            <input
              type="search"
              value={query.q}
              onChange={(e) => update({ q: e.target.value }, "replace")}
              placeholder="Search spices, blends…"
              className="h-11 w-full rounded-md border border-subtle bg-surface pr-10 pl-9 font-heading text-[0.9375rem] text-ink placeholder:text-subtle [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query.q && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => update({ q: "" })}
                className="absolute right-1 grid size-9 place-items-center rounded text-subtle hover:text-purple"
              >
                <X className="size-4" />
              </button>
            )}
          </label>

          <div className="hidden items-center gap-2 lg:flex">
            <SelectField
              label="Category"
              value={query.category ?? ""}
              onChange={(v) => update({ category: (v || null) as typeof query.category })}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Price"
              value={priceValue(query.min, query.max)}
              onChange={(v) => {
                const preset = pricePresets[Number(v)];
                update(preset ? { min: preset.min, max: preset.max } : { min: null, max: null });
              }}
            >
              <option value="any">Any price</option>
              {pricePresets.map((p, i) => (
                <option key={p.label} value={i}>
                  {p.label}
                </option>
              ))}
              {priceValue(query.min, query.max) === "custom" && (
                <option value="custom" disabled>
                  Custom range
                </option>
              )}
            </SelectField>
            <SelectField label="Sort by" value={query.sort} onChange={(v) => update({ sort: v as SortKey })}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>
          </div>

          {/* Phones/tablets: sort is an icon over a native select, so the OS picker opens. */}
          <label className="relative grid size-11 shrink-0 place-items-center rounded-md border border-subtle bg-surface text-purple lg:hidden">
            <ArrowUpDown className="size-4.5" aria-hidden />
            <span className="sr-only">Sort by</span>
            <select
              value={query.sort}
              onChange={(e) => update({ sort: e.target.value as SortKey })}
              className="absolute inset-0 cursor-pointer opacity-0"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <Button variant="outline" className="relative shrink-0 max-lg:size-11 max-lg:px-0" onClick={() => setFiltersOpen(true)}>
            <SlidersHorizontal />
            <span className="max-lg:sr-only">More filters</span>
            {sheetFilterCount > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-purple px-1 text-[0.6875rem] leading-5 text-surface max-lg:absolute max-lg:-top-1.5 max-lg:-right-1.5">
                {sheetFilterCount}
                <span className="sr-only"> active</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="container-page pt-4 pb-12 md:pb-16">
        <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-6">
          <h2 id="catalogue-title" className="font-heading text-xl font-semibold md:text-2xl">
            {query.category ? categoryName(query.category) : "All products"}
          </h2>
          <p aria-live="polite" className="text-meta text-subtle">
            {results.length} {results.length === 1 ? "product" : "products"}
          </p>
          {active.length > 0 && (
            <ul className="flex w-full flex-wrap items-center gap-2" aria-label="Active filters">
              {active.map((f) => (
                <li key={f.key}>
                  <button
                    type="button"
                    onClick={() => update(f.remove)}
                    aria-label={`Remove filter ${f.label}`}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-purple bg-purple-tint pr-2.5 pl-3 font-heading text-sm font-semibold text-purple hover:bg-surface"
                  >
                    {f.label} <X className="size-3.5" aria-hidden />
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={reset}
                  className="min-h-9 px-2 font-heading text-sm font-semibold text-purple underline underline-offset-4 hover:text-purple-hover"
                >
                  Clear all
                </button>
              </li>
            </ul>
          )}
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-6 md:p-8">
            <h3 className="font-heading text-h3 font-semibold">No products match these filters.</h3>
            <p className="font-serif text-ink">Try a different search, widen the price range or clear the filters.</p>
            <Button onClick={reset}>Clear all filters</Button>
          </div>
        ) : (
          <ProductGrid key={`${toSearchString({ ...query, sort: "featured" })}`} items={results} columns={columns} />
        )}
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent
          side={columns >= 4 ? "right" : "bottom"}
          className="gap-0 bg-canvas data-[side=bottom]:max-h-[88dvh] data-[side=bottom]:rounded-t-xl data-[side=right]:w-full data-[side=right]:sm:max-w-md"
        >
          <SheetHeader className="border-b border-line px-5 py-4">
            <SheetTitle className="text-xl font-semibold text-purple">Filters</SheetTitle>
            <SheetDescription>Results update as you choose.</SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <FilterPanel query={query} update={update} />
          </div>
          <SheetFooter className="flex-row gap-3 border-t border-line px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Button variant="outline" className="flex-1" onClick={reset} disabled={active.length === 0}>
              Clear all
            </Button>
            <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
              Show {results.length} {results.length === 1 ? "product" : "products"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </section>
  );
}

function priceValue(min: number | null, max: number | null) {
  if (min === null && max === null) return "any";
  const i = pricePresets.findIndex((p) => p.min === min && p.max === max);
  return i === -1 ? "custom" : String(i);
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="relative flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 cursor-pointer appearance-none rounded-md border border-subtle bg-surface pr-9 pl-3 font-heading text-sm font-medium text-ink hover:border-purple"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-purple" aria-hidden />
    </label>
  );
}

/**
 * Product grid with promotional strips at complete-row boundaries. `catalogueBanners` says
 * which row each strip follows; the current column count turns that into an index, and a strip
 * only appears when products continue after it. Load More adds whole rows.
 */
function ProductGrid({ items, columns }: { items: typeof products; columns: number }) {
  const [rows, setRows] = useState(ROWS_PER_PAGE);
  const visible = items.slice(0, rows * columns);

  const chunks: { items: typeof products; banner?: Promo }[] = [];
  let start = 0;
  for (const { afterRow, promo } of catalogueBanners) {
    const end = afterRow * columns;
    if (end >= visible.length) break;
    chunks.push({ items: visible.slice(start, end), banner: promo });
    start = end;
  }
  chunks.push({ items: visible.slice(start) });

  return (
    <>
      {chunks.map((chunk, i) => (
        <div key={i}>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4 lg:gap-x-5 xl:grid-cols-5">
            {chunk.items.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} detail="spec" />
              </li>
            ))}
          </ul>
          {chunk.banner && <PromoStrip promo={chunk.banner} />}
        </div>
      ))}

      <div className="mt-8 flex flex-col items-center gap-2">
        {visible.length < items.length ? (
          <>
            <p className="text-meta text-subtle">
              Showing {visible.length} of {items.length}
            </p>
            <Button variant="outline" onClick={() => setRows((r) => r + ROWS_PER_PAGE)}>
              Load more products
            </Button>
          </>
        ) : (
          <p className="text-meta text-subtle">
            {items.length > columns ? `You've seen all ${items.length} products.` : null}
          </p>
        )}
      </div>
    </>
  );
}

function PromoStrip({ promo }: { promo: Promo }) {
  return (
    <aside aria-label="Promotion" className="my-6 md:my-8">
      <Link
        href={promo.href}
        className="group relative block aspect-[2.1/1] overflow-hidden rounded-xl bg-soft"
        aria-label={`${promo.cta}: ${promo.alt}`}
      >
        <Image
          src={promo.image}
          alt=""
          fill
          sizes="(min-width: 1520px) 1328px, 100vw"
          className="object-cover transition-transform duration-500 ease-(--ease-soft) group-hover:scale-[1.01]"
        />
      </Link>
    </aside>
  );
}
