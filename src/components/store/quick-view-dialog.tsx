"use client";

import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { categoryHref, DEMO_PRICING, formatPrice, getCategory, type Product } from "@/data/catalog";

import { QuantityStepper } from "./quantity-stepper";
import { useStore } from "./store-provider";

export function QuickViewDialog() {
  const { quickView, openQuickView } = useStore();

  return (
    <Dialog open={quickView !== null} onOpenChange={(open) => !open && openQuickView(null)}>
      {/* Phones: a bottom sheet. From sm up: a centred modal. */}
      <DialogContent className="max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-xl p-0 sm:max-w-3xl max-sm:top-auto max-sm:bottom-0 max-sm:left-0 max-sm:max-h-[88dvh] max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:pb-[env(safe-area-inset-bottom)]">
        {/* key resets quantity when a different product opens */}
        {quickView && <QuickViewBody key={quickView.id} product={quickView} />}
      </DialogContent>
    </Dialog>
  );
}

function QuickViewBody({ product }: { product: Product }) {
  const { addToCart, openQuickView } = useStore();
  const [quantity, setQuantity] = useState(1);
  const category = getCategory(product.category);

  return (
    <div className="grid sm:grid-cols-2">
      <div className="relative h-56 bg-surface sm:h-auto sm:min-h-96">
        <Image
          src={product.image}
          alt={`${product.name} pack`}
          fill
          loading="eager"
          sizes="(min-width: 640px) 384px, 100vw"
          className="object-contain p-6"
        />
      </div>
      <div className="flex flex-col gap-5 border-t border-line p-6 sm:border-t-0 sm:border-l sm:p-8">
        <div className="flex flex-col gap-2 pr-8">
          <p className="eyebrow text-purple">{category.name}</p>
          <DialogTitle className="text-h3 font-semibold text-purple">{product.name}</DialogTitle>
          {product.alsoKnownAs && (
            <DialogDescription className="font-serif text-base text-ink">{product.alsoKnownAs}</DialogDescription>
          )}
        </div>

        {product.packNotes && (
          <ul className="flex flex-col gap-2" aria-label="Printed on the pack">
            {product.packNotes.map((note) => (
              <li key={note} className="flex items-center gap-2 text-sm text-ink">
                <Check className="size-4 text-success" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        )}

        <p className="font-serif text-ink">{product.description}</p>

        <dl className="grid grid-cols-3 gap-3 border-y border-line py-3 text-sm">
          {[
            ["Pack size", product.packSize],
            ["Type", product.form],
            ["Pack", product.packType],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="text-meta text-subtle">{term}</dt>
              <dd className="font-heading font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="font-heading text-h3 font-semibold text-purple tabular-nums">
          {formatPrice(product.price)}
          <span className="ml-2 text-meta font-normal text-subtle">{DEMO_PRICING ? "Demo price and pack size" : product.packSize}</span>
        </p>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex gap-3">
            <QuantityStepper label={product.name} value={quantity} onChange={setQuantity} />
            <Button className="flex-1" onClick={() => addToCart(product, quantity)}>
              Add to cart
            </Button>
          </div>
          <Link
            href={categoryHref(product.category)}
            onClick={() => openQuickView(null)}
            className="group inline-flex min-h-11 items-center gap-2 self-start font-heading text-[0.9375rem] font-semibold text-purple hover:text-purple-hover"
          >
            More {category.name}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
