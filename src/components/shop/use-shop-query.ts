"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useSyncExternalStore } from "react";

import { getCategory, isCategorySlug, products } from "@/data/catalog";
import { emptyQuery, parseQuery, toSearchString, type ShopQuery } from "@/lib/shop-query";

export const categoryName = (slug: Parameters<typeof getCategory>[0]) => getCategory(slug).name;

/**
 * The shop query lives in the URL. Updates use the native History API, which Next.js keeps in
 * sync with useSearchParams without a server round-trip. Discrete changes push (so Back undoes
 * them); typing in search replaces.
 */
export function useShopQuery() {
  const params = useSearchParams();
  const pathname = usePathname();
  const query = useMemo(() => parseQuery(new URLSearchParams(params.toString()), products, isCategorySlug), [params]);

  const update = (patch: Partial<ShopQuery>, mode: "push" | "replace" = "push") => {
    const url = `${pathname}${toSearchString({ ...query, ...patch })}`;
    window.history[mode === "push" ? "pushState" : "replaceState"](null, "", url);
  };
  const reset = () => update(emptyQuery);

  return { query, update, reset };
}

/** Product grid columns, matching the grid classes in ProductGrid. */
const columnQueries = [
  ["(min-width: 1280px)", 5],
  ["(min-width: 1024px)", 4],
  ["(min-width: 768px)", 3],
] as const;

function subscribe(callback: () => void) {
  const lists = columnQueries.map(([q]) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", callback));
  return () => lists.forEach((l) => l.removeEventListener("change", callback));
}

export function useGridColumns() {
  return useSyncExternalStore(
    subscribe,
    () => columnQueries.find(([q]) => window.matchMedia(q).matches)?.[1] ?? 2,
    () => 4,
  );
}
