"use client";

import { useStore } from "@/components/store/store-provider";
import type { Product } from "@/data/catalog";

export function HeroProductLinks({ products }: { products: Product[] }) {
  const { openQuickView } = useStore();

  return (
    <p className="flex flex-wrap items-center gap-x-1 text-meta text-ink">
      <span className="mr-1">Pictured:</span>
      {products.map((p, i) => (
        <span key={p.id} className="inline-flex items-center">
          <button
            type="button"
            onClick={() => openQuickView(p)}
            className="min-h-9 font-medium text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink hover:decoration-2"
          >
            {p.name}
          </button>
          {i < products.length - 1 && <span aria-hidden className="ml-1">·</span>}
        </span>
      ))}
    </p>
  );
}
