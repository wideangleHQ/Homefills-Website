"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";

import type { Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

import { useStore } from "./store-provider";

/**
 * Blinkit-style compact control: an ADD button that becomes a − qty + stepper.
 * Both states share one footprint so the card never shifts. Quantity lives in
 * the shared cart, so every card, the header badge and the cart drawer agree.
 */
export function AddControl({ product, className }: { product: Product; className?: string }) {
  const { quantityOf, setProductQuantity } = useStore();
  const qty = quantityOf(product.id);
  const addRef = useRef<HTMLButtonElement>(null);
  const plusRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<"add" | "plus" | null>(null);

  // The control swaps elements, so hand keyboard focus to its replacement.
  useEffect(() => {
    if (restoreFocus.current === "plus") plusRef.current?.focus();
    if (restoreFocus.current === "add") addRef.current?.focus();
    restoreFocus.current = null;
  }, [qty]);

  const shell = "h-9 w-[5.25rem] rounded-md font-heading text-sm font-semibold";

  if (qty === 0) {
    return (
      <button
        ref={addRef}
        type="button"
        aria-label={`Add ${product.name} to cart`}
        onClick={() => {
          restoreFocus.current = "plus";
          setProductQuantity(product, 1);
        }}
        className={cn(
          shell,
          "relative animate-in border border-purple bg-surface tracking-wide text-purple duration-150 fade-in after:absolute after:-inset-1 hover:bg-purple-tint active:bg-purple-tint",
          className,
        )}
      >
        ADD
      </button>
    );
  }

  const step =
    "grid h-full w-8 place-items-center transition-colors hover:bg-purple-hover active:bg-purple-pressed";
  return (
    <div
      role="group"
      aria-label={`${product.name} quantity`}
      className={cn(
        shell,
        "relative flex animate-in items-center justify-between overflow-hidden border border-purple bg-purple text-surface duration-150 fade-in",
        className,
      )}
    >
      <button
        type="button"
        aria-label={`Decrease quantity of ${product.name}`}
        className={step}
        onClick={() => {
          if (qty === 1) restoreFocus.current = "add";
          setProductQuantity(product, qty - 1);
        }}
      >
        <Minus className="size-3.5" />
      </button>
      <output aria-live="polite" className="min-w-4 text-center tabular-nums">
        {qty}
      </output>
      <button
        ref={plusRef}
        type="button"
        aria-label={`Increase quantity of ${product.name}`}
        className={step}
        onClick={() => setProductQuantity(product, qty + 1)}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
