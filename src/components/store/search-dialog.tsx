"use client";

import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { categories, categoryHref, getCategory, products } from "@/data/catalog";

import { useStore } from "./store-provider";

const matches = (text: string, q: string) => text.toLowerCase().includes(q);

export function SearchDialog() {
  const { searchOpen, setSearchOpen, openQuickView } = useStore();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const productHits = q
    ? products.filter((p) =>
        [p.name, p.alsoKnownAs ?? "", getCategory(p.category).name].some((t) => matches(t, q)),
      )
    : [];
  const categoryHits = q ? categories.filter((c) => matches(c.name, q) || matches(c.includes, q)) : categories;

  const close = () => {
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <Dialog open={searchOpen} onOpenChange={(open) => (open ? setSearchOpen(true) : close())}>
      <DialogContent className="top-4 max-h-[calc(100dvh-2rem)] translate-y-0 gap-0 overflow-hidden rounded-xl p-0 sm:top-[12vh] sm:max-w-xl">
        <DialogTitle className="sr-only">Search Homefills products</DialogTitle>
        <label className="flex items-center gap-3 border-b border-line px-4 pr-12">
          <Search className="size-5 shrink-0 text-subtle" aria-hidden />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spices, blends, superfoods…"
            aria-label="Search products"
            className="h-14 w-full bg-transparent font-heading text-base text-ink outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:appearance-none"
          />
        </label>

        <div className="max-h-[min(60dvh,32rem)] overflow-y-auto p-2">
          {q && productHits.length === 0 && categoryHits.length === 0 && (
            <p className="px-3 py-8 text-center font-serif text-ink">No products match “{query}”.</p>
          )}

          {productHits.length > 0 && (
            <ul aria-label="Products">
              {productHits.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                      openQuickView(p);
                    }}
                    className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-soft"
                  >
                    <Image src={p.image} alt="" sizes="48px" className="size-12 rounded border border-line bg-surface object-contain" />
                    <span className="flex flex-col">
                      <span className="font-heading font-semibold text-ink">{p.name}</span>
                      <span className="text-meta text-subtle">{getCategory(p.category).name}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {categoryHits.length > 0 && (
            <>
              <p className="eyebrow px-3 pt-3 pb-1 text-subtle">{q ? "Categories" : "Browse categories"}</p>
              <ul aria-label="Categories">
                {categoryHits.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={categoryHref(c.slug)}
                      onClick={close}
                      className="group flex min-h-11 items-center justify-between rounded-md px-3 py-2 font-heading font-medium text-purple hover:bg-soft"
                    >
                      {c.name}
                      <ArrowRight className="size-4 text-subtle transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
