"use client";

import Image from "next/image";

import { formatPrice, getCategory, productSpec, type Product } from "@/data/catalog";

import { AddControl } from "./add-control";
import { useStore } from "./store-provider";

/**
 * Compact quick-commerce card: square pack tile with ADD on its corner, then name, price + pack size,
 * category and either a short description (homepage) or one pack attribute (shop grid).
 */
export function ProductCard({ product, detail = "description" }: { product: Product; detail?: "description" | "spec" }) {
  const { openQuickView } = useStore();
  const spec = productSpec(product);

  return (
    <article className="group flex h-full flex-col gap-2">
      <div className="relative">
        <button
          type="button"
          onClick={() => openQuickView(product)}
          aria-label={`Quick view: ${product.name}`}
          className="relative block aspect-square w-full overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-200 hover:border-purple"
        >
          <Image
            src={product.image}
            alt={`${product.name} pack`}
            fill
            sizes="(min-width: 768px) 224px, 45vw"
            className="object-contain p-2 transition-transform duration-300 ease-(--ease-soft) group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </button>
        <AddControl product={product} className="absolute right-2 bottom-2" />
      </div>

      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="line-clamp-2 font-heading text-sm leading-tight font-semibold text-purple sm:text-[0.9375rem]">
          {product.name}
        </h3>
        <p className="font-heading text-lg leading-tight font-bold text-purple tabular-nums sm:text-xl">
          {formatPrice(product.price)}
          <span className="ml-1.5 align-middle font-sans text-meta font-normal text-subtle">{product.packSize}</span>
        </p>
        <p className="mt-0.5 text-meta text-subtle">{getCategory(product.category).name}</p>
        {/* Dropped only on very short screens so the section still fits in one view. */}
        {detail === "description" ? (
          <p className="line-clamp-2 text-meta text-ink [@media(max-height:40rem)]:hidden">{product.description}</p>
        ) : (
          spec && <p className="truncate text-meta text-ink">{spec}</p>
        )}
      </div>
    </article>
  );
}
