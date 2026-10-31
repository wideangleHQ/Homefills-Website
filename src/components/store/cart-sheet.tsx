"use client";

import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { OfferProgress } from "@/components/cart/offer-progress";
import { formatPrice, getCategory } from "@/data/catalog";
import { demoOffers } from "@/data/offers";
import { priceCart } from "@/lib/cart-pricing";

import { QuantityStepper } from "./quantity-stepper";
import { useStore } from "./store-provider";

export function CartSheet() {
  const { cart, cartCount, cartOpen, setCartOpen, setQuantity } = useStore();
  const pricing = priceCart(cart, demoOffers);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="gap-0 bg-surface data-[side=right]:w-full data-[side=right]:sm:max-w-md">
        <SheetHeader className="border-b border-line px-5 py-5">
          <SheetTitle className="text-xl font-semibold text-purple">Your cart</SheetTitle>
          <SheetDescription>
            {cartCount === 0 ? "Nothing added yet." : `${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          </SheetDescription>
        </SheetHeader>

        {cart.length > 0 && (
          <div className="border-b border-line px-5 py-4">
            <OfferProgress pricing={pricing} offers={demoOffers} compact />
          </div>
        )}

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="size-8 text-subtle" strokeWidth={1.5} />
            <p className="max-w-60 font-serif text-ink">Add spices, blends or superfoods to see them here.</p>
            <Link href="/shop" onClick={() => setCartOpen(false)} className={buttonVariants({ variant: "outline" })}>
              Browse products
            </Link>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
            {cart.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-4 py-4">
                <Image
                  src={product.image}
                  alt=""
                  sizes="80px"
                  className="size-20 shrink-0 rounded-md border border-line bg-surface object-contain"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div>
                    <p className="text-meta text-subtle">{getCategory(product.category).name}</p>
                    <p className="font-heading font-semibold text-ink">{product.name}</p>
                    <p className="text-sm tabular-nums text-purple">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <QuantityStepper
                      label={product.name}
                      value={quantity}
                      onChange={(q) => setQuantity(product.id, q)}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => setQuantity(product.id, 0)}
                    >
                      <Trash2 className="size-4.5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <SheetFooter className="gap-3 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <p className="flex items-baseline justify-between font-heading font-semibold text-ink">
              <span>To pay (demo prices)</span>
              <span className="tabular-nums text-purple">{formatPrice(pricing.total)}</span>
            </p>
            <Link
              href="/cart"
              onClick={() => setCartOpen(false)}
              className={buttonVariants({ className: "w-full" })}
            >
              View cart and offers
            </Link>
            <Link
              href="/shop"
              onClick={() => setCartOpen(false)}
              className={buttonVariants({ variant: "outline", className: "w-full" })}
            >
              Continue shopping
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
