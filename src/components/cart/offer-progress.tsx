"use client";

import { Check } from "lucide-react";

import { formatPrice } from "@/data/catalog";
import type { OfferConfig } from "@/data/offers";
import type { CartPricing } from "@/lib/cart-pricing";
import { cn } from "@/lib/utils";

/**
 * Milestone progress bar for the demo cart offers. Width and messages derive from the eligible
 * subtotal, so every quantity change updates it immediately.
 */
export function OfferProgress({
  pricing,
  offers,
  compact = false,
}: {
  pricing: CartPricing;
  offers: OfferConfig;
  compact?: boolean;
}) {
  const [delivery, discount] = pricing.milestones;
  const end = discount.threshold;
  const fill = Math.min(100, (pricing.eligibleSubtotal / end) * 100);
  const deliveryAt = (delivery.threshold / end) * 100;
  const pct = offers.discount.percent;

  const status = discount.unlocked
    ? { title: `Great choice! You've unlocked ${pct}% OFF.`, sub: "Free delivery is included too." }
    : delivery.unlocked
      ? {
          title: "Congratulations! You've unlocked FREE DELIVERY.",
          sub: `Add ${formatPrice(discount.remaining)} more to unlock ${pct}% OFF!`,
        }
      : {
          title: `Add ${formatPrice(delivery.remaining)} more to unlock FREE DELIVERY!`,
          sub: `${formatPrice(discount.remaining)} more unlocks ${pct}% OFF.`,
        };

  const markers = [
    { m: delivery, at: deliveryAt, label: "Free delivery" },
    { m: discount, at: 100, label: `${pct}% off` },
  ];

  return (
    <section
      aria-label="Cart offers"
      className={cn("rounded-lg border border-line bg-surface", compact ? "p-4" : "p-4 sm:p-5")}
    >
      <div className="flex items-start justify-between gap-3">
        <div aria-live="polite" className="min-w-0">
          <p className={cn("font-heading font-semibold text-purple", compact ? "text-sm" : "text-[0.9375rem] sm:text-base")}>
            {status.title}
          </p>
          <p className="mt-0.5 text-meta text-ink">{status.sub}</p>
        </div>
        {offers.isDemo && (
          <span className="shrink-0 rounded-full border border-orange px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-ink uppercase">
            Demo offer
          </span>
        )}
      </div>

      <div className="relative mt-4 mb-9 px-2.5">
        <div
          role="progressbar"
          aria-label="Progress towards demo offers"
          aria-valuemin={0}
          aria-valuemax={end}
          aria-valuenow={Math.min(pricing.eligibleSubtotal, end)}
          aria-valuetext={`${formatPrice(pricing.eligibleSubtotal)} of ${formatPrice(end)}`}
          className="h-2 overflow-hidden rounded-full bg-disabled"
        >
          <div
            className="h-full rounded-full bg-purple transition-[width] duration-300 ease-(--ease-soft) motion-reduce:transition-none"
            style={{ width: `${fill}%` }}
          />
        </div>

        {markers.map(({ m, at, label }) => (
          <div
            key={m.id}
            className="absolute top-1 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `calc(0.625rem + (100% - 1.25rem) * ${at / 100})` }}
          >
            <span
              className={cn(
                "-mt-2.5 grid size-5 place-items-center rounded-full border-2 transition-colors duration-300",
                m.unlocked ? "border-purple bg-purple text-surface" : "border-subtle bg-surface",
              )}
            >
              {m.unlocked && <Check className="size-3" strokeWidth={3} aria-hidden />}
            </span>
            <span
              className={cn(
                "mt-1 text-center text-[0.6875rem] leading-tight whitespace-nowrap sm:text-meta",
                // Keep the last label inside the card instead of centring past the edge.
                at === 100 && "translate-x-[-35%]",
                m.unlocked ? "font-semibold text-purple" : "text-subtle",
              )}
            >
              {formatPrice(m.threshold)} · {label}
              <span className="sr-only">{m.unlocked ? " unlocked" : ` locked, ${formatPrice(m.remaining)} to go`}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
