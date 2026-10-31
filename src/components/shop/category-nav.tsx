"use client";

import { LayoutGrid } from "lucide-react";
import Image from "next/image";

import { categories, type CategorySlug } from "@/data/catalog";
import { cn } from "@/lib/utils";

import { useShopQuery } from "./use-shop-query";

const chip =
  "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border py-1 pr-4 pl-1 font-heading text-sm font-semibold whitespace-nowrap transition-colors duration-150";

/** Category chips. Selecting one updates ?category= and brings the catalogue into view. */
export function CategoryNav() {
  const { query, update } = useShopQuery();

  const select = (category: CategorySlug | null) => {
    update({ category });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("catalogue")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const options: { slug: CategorySlug | null; name: string; image?: (typeof categories)[number]["image"] }[] = [
    { slug: null, name: "All products" },
    ...categories,
  ];

  return (
    <nav aria-label="Shop by category" className="container-page">
      <ul className="-mx-4 flex snap-x gap-2 overflow-x-auto scroll-px-4 px-4 py-1 [scrollbar-width:none] min-[30rem]:-mx-5 min-[30rem]:px-5 md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
        {options.map((o) => {
          const active = query.category === o.slug;
          return (
            <li key={o.slug ?? "all"}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => select(o.slug)}
                className={cn(
                  chip,
                  active
                    ? "border-purple bg-purple text-surface"
                    : "border-line bg-surface text-purple hover:border-purple",
                )}
              >
                <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-soft">
                  {o.image ? (
                    <Image src={o.image} alt="" fill sizes="36px" className="object-cover" />
                  ) : (
                    <LayoutGrid className="size-4 text-purple" aria-hidden />
                  )}
                </span>
                {o.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CategoryNavFallback() {
  return <div className="container-page h-[3.25rem]" aria-hidden />;
}
