"use client";

import { categories, formatPrice, products } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { facetCounts, filterOptions, pricePresets, type ShopQuery } from "@/lib/shop-query";

import { categoryName } from "./use-shop-query";

const options = filterOptions(products);

const legend = "mb-2 font-heading text-sm font-semibold text-purple";
const row =
  "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2 text-[0.9375rem] text-ink hover:bg-soft has-disabled:cursor-not-allowed has-disabled:text-subtle";
const input = "size-4.5 accent-purple";

/** Every filter, used inside the More filters / Filters sheet. Changes apply immediately. */
export function FilterPanel({
  query,
  update,
}: {
  query: ShopQuery;
  update: (patch: Partial<ShopQuery>, mode?: "push" | "replace") => void;
}) {
  const counts = facetCounts(products, query, categoryName);
  const toggle = <T extends string>(list: T[], value: T) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const checkboxGroup = <T extends string>(
    title: string,
    values: readonly T[],
    selected: T[],
    countMap: Map<T, number>,
    key: "forms" | "packs" | "notes",
  ) =>
    values.length > 0 && (
      <fieldset>
        <legend className={legend}>{title}</legend>
        {values.map((v) => {
          const n = countMap.get(v) ?? 0;
          const checked = selected.includes(v);
          return (
            <label key={v} className={row}>
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className={input}
                  checked={checked}
                  disabled={!checked && n === 0}
                  onChange={() => update({ [key]: toggle(selected, v) })}
                />
                {v}
              </span>
              <span className="text-meta text-subtle tabular-nums">{n}</span>
            </label>
          );
        })}
      </fieldset>
    );

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className={legend}>Category</legend>
        {[{ slug: null, name: "All products" }, ...categories].map((c) => {
          const n = c.slug
            ? (counts.category.get(c.slug) ?? 0)
            : [...counts.category.values()].reduce((a, b) => a + b, 0);
          return (
            <label key={c.slug ?? "all"} className={row}>
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shop-category"
                  className={input}
                  checked={query.category === c.slug}
                  onChange={() => update({ category: c.slug })}
                />
                {c.name}
              </span>
              <span className="text-meta text-subtle tabular-nums">{n}</span>
            </label>
          );
        })}
      </fieldset>

      <fieldset>
        <legend className={legend}>Price</legend>
        <div className="mb-3 flex flex-wrap gap-2">
          {pricePresets.map((p) => {
            const active = query.min === p.min && query.max === p.max;
            return (
              <button
                key={p.label}
                type="button"
                aria-pressed={active}
                onClick={() => update(active ? { min: null, max: null } : { min: p.min, max: p.max })}
                className={cn(
                  "min-h-10 rounded-full border px-3.5 font-heading text-sm font-semibold transition-colors",
                  active ? "border-purple bg-purple text-surface" : "border-subtle bg-surface text-purple hover:border-purple",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-end gap-3">
          {(["min", "max"] as const).map((k) => (
            <label key={k} className="flex flex-1 flex-col gap-1 text-meta text-subtle">
              {k === "min" ? "Min (₹)" : "Max (₹)"}
              <input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder={String(k === "min" ? options.priceRange[0] : options.priceRange[1])}
                value={query[k] ?? ""}
                onChange={(e) => update({ [k]: e.target.value === "" ? null : Math.max(0, Math.round(Number(e.target.value))) }, "replace")}
                className="h-11 w-full rounded-md border border-subtle bg-surface px-3 font-heading text-[0.9375rem] text-ink"
              />
            </label>
          ))}
        </div>
        <p className="mt-2 text-meta text-subtle">
          Range in this demo: {formatPrice(options.priceRange[0])} – {formatPrice(options.priceRange[1])}
        </p>
      </fieldset>

      {checkboxGroup("Product type", options.forms, query.forms, counts.forms, "forms")}
      {checkboxGroup("Pack", options.packs, query.packs, counts.packs, "packs")}
      {checkboxGroup("Printed on the pack", options.notes, query.notes, counts.notes, "notes")}
    </div>
  );
}
