"use client";

import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AddControl } from "@/components/store/add-control";
import { ProductSlider } from "@/components/store/product-slider";
import { useStore } from "@/components/store/store-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice, products } from "@/data/catalog";
import { demoOffers } from "@/data/offers";
import { priceCart, rankAddOns } from "@/lib/cart-pricing";

import { OfferProgress } from "./offer-progress";

export function CartView() {
  const { cart, cartCount, setProductQuantity } = useStore();
  const pricing = priceCart(cart, demoOffers);

  // Ranked once when the page opens. Products added from this row stay in it (as a quantity
  // control) instead of jumping away, and the order doesn't reshuffle under the shopper's thumb.
  const [addOns] = useState(() =>
    rankAddOns(products, new Set(cart.map((l) => l.product.id)), pricing.next?.remaining ?? null),
  );

  if (cart.length === 0) {
    return (
      <div className="container-page flex min-h-[50svh] flex-col items-start justify-center gap-4 py-12">
        <h1 className="text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-tight font-semibold">
          Your cart is waiting for something good.
        </h1>
        <p className="max-w-md font-serif text-ink">Spices, blends, superfoods and staples are a tap away.</p>
        <Link href="/shop" className={buttonVariants({ size: "lg" })}>
          Explore Our Collection <ArrowRight />
        </Link>
      </div>
    );
  }

  const pct = demoOffers.discount.percent;
  const addOnMessage = pricing.next
    ? pricing.next.id === "delivery"
      ? `Just ${formatPrice(pricing.next.remaining)} away from free delivery.`
      : `Add ${formatPrice(pricing.next.remaining)} more to unlock ${pct}% OFF.`
    : "Complete your kitchen essentials with a few more favourites.";

  return (
    <div className="container-page pt-5 pb-12 md:pt-8 md:pb-16">
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 md:mb-7">
        <h1 className="text-[clamp(1.75rem,1.2rem+2vw,2.5rem)] leading-tight font-semibold">Your cart</h1>
        <p className="text-meta text-subtle">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start xl:gap-10">
        <div className="flex min-w-0 flex-col gap-8">
          <OfferProgress pricing={pricing} offers={demoOffers} />

          <section aria-labelledby="cart-items-title">
            <h2 id="cart-items-title" className="sr-only">
              Items in your cart
            </h2>
            <ul className="divide-y divide-line rounded-lg border border-line bg-surface">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-3 p-3 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4">
                  <Image
                    src={product.image}
                    alt=""
                    sizes="80px"
                    className="aspect-square h-auto w-full rounded-md border border-line bg-surface object-contain"
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-heading font-semibold text-purple">{product.name}</p>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => setProductQuantity(product, 0)}
                        className="-mt-2 -mr-2 grid size-10 shrink-0 place-items-center rounded-md text-subtle hover:bg-purple-tint hover:text-purple sm:hidden"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <p className="text-meta text-subtle">
                      {product.packSize} · {formatPrice(product.price)} each
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3 sm:hidden">
                      <AddControl product={product} />
                      <p className="font-heading font-semibold text-ink tabular-nums">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden items-center gap-4 sm:flex">
                    <AddControl product={product} />
                    <p className="w-16 text-right font-heading font-semibold text-ink tabular-nums">
                      {formatPrice(product.price * quantity)}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => setProductQuantity(product, 0)}
                      className="grid size-10 place-items-center rounded-md text-subtle hover:bg-purple-tint hover:text-purple"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {addOns.length > 0 && (
            <section aria-labelledby="addons-title">
              <ProductSlider
                products={addOns}
                label="Suggested add-ons"
                header={
                  <div className="flex flex-col gap-1">
                    <h2 id="addons-title" className="text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-tight font-semibold">
                      A Little More Goodness?
                    </h2>
                    <p className="font-serif text-sm text-ink sm:text-base">{addOnMessage}</p>
                  </div>
                }
              />
            </section>
          )}
        </div>

        <OrderSummary pricing={pricing} itemCount={cartCount} />
      </div>
    </div>
  );
}

function OrderSummary({ pricing, itemCount }: { pricing: ReturnType<typeof priceCart>; itemCount: number }) {
  const { discount: d, deliveryCharge, freeDelivery } = demoOffers;
  const row = "flex items-baseline justify-between gap-4";

  return (
    <aside
      aria-labelledby="summary-title"
      className="rounded-lg border border-line bg-surface p-5 lg:sticky lg:top-[calc(var(--header-h)+2.4rem+1rem)]"
    >
      <h2 id="summary-title" className="mb-4 font-heading text-lg font-semibold text-purple">
        Price details
      </h2>
      <dl className="flex flex-col gap-2.5 text-[0.9375rem] text-ink">
        <div className={row}>
          <dt>
            Items subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </dt>
          <dd className="tabular-nums">{formatPrice(pricing.subtotal)}</dd>
        </div>
        {pricing.discount > 0 && (
          <div className={row}>
            <dt>
              Demo discount ({d.percent}% off)
              <span className="block text-meta text-subtle">Max {formatPrice(d.maxDiscount)}</span>
            </dt>
            <dd className="text-success tabular-nums">−{formatPrice(pricing.discount)}</dd>
          </div>
        )}
        <div className={row}>
          <dt>Delivery (demo)</dt>
          <dd className="tabular-nums">
            {pricing.deliveryFee === 0 ? (
              <>
                <s className="mr-1.5 text-subtle">{formatPrice(deliveryCharge)}</s>
                <span className="font-semibold text-success">FREE</span>
              </>
            ) : (
              formatPrice(pricing.deliveryFee)
            )}
          </dd>
        </div>
        {pricing.savings > 0 && (
          <div className={row}>
            <dt>Total savings</dt>
            <dd className="font-semibold text-success tabular-nums">{formatPrice(pricing.savings)}</dd>
          </div>
        )}
        <div className={`${row} mt-1 border-t border-line pt-3 font-heading text-lg font-semibold`}>
          <dt>To pay</dt>
          <dd className="text-purple tabular-nums">{formatPrice(pricing.total)}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-col gap-2.5">
        <Button disabled className="w-full">
          Checkout unavailable in demo
        </Button>
        <Link href="/shop" className={buttonVariants({ variant: "outline", className: "w-full" })}>
          Continue shopping
        </Link>
      </div>

      <p className="mt-4 text-meta text-subtle">
        Demo offers for this storefront, not real Homefills promotions: free delivery from{" "}
        {formatPrice(freeDelivery.threshold)} (otherwise {formatPrice(deliveryCharge)}); {d.percent}% off eligible
        items from {formatPrice(d.threshold)}, up to {formatPrice(d.maxDiscount)}, never on delivery. Prices are
        placeholders and no orders are taken.
      </p>
    </aside>
  );
}
