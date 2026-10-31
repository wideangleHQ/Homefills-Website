import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ProductSlider } from "@/components/store/product-slider";
import { featuredProducts } from "@/data/catalog";

/*
 * One-viewport section: min-height is the space below the sticky header and
 * announcement bar (and, below lg, above the fixed bottom nav + safe area).
 * Content is sized by dvh-aware card widths, so it fits without clipping;
 * it is capped at 44rem so tall monitors don't gain empty bands.
 */
export function FeaturedProducts() {
  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="flex bg-soft min-h-[min(44rem,calc(100dvh-var(--header-h)-2.4rem-var(--bottom-nav-h)-env(safe-area-inset-bottom)))] scroll-mt-[1.4rem] flex-col justify-center py-3 sm:py-5 md:py-[clamp(1rem,3.5dvh,2rem)] lg:min-h-[min(44rem,calc(100dvh-var(--header-h)-2.4rem))]"
    >
      <div className="container-page w-full">
        <ProductSlider
          products={featuredProducts}
          label="Featured products"
          header={
            <div className="flex max-w-3xl flex-col gap-1 md:gap-2">
              <h2
                id="featured-title"
                className="text-[clamp(1.375rem,1rem+1.7vw,2.5rem)] leading-tight font-semibold"
              >
                A Little Goodness for Every Kitchen.
              </h2>
              <p className="max-w-xl font-serif text-sm leading-snug text-ink sm:text-base md:text-lead">
                Explore some of our favourites, thoughtfully selected for your everyday cooking.
              </p>
            </div>
          }
          footer={
            <div className="mt-1 flex flex-wrap items-center justify-between gap-x-6">
              <Link
                href="/shop"
                className="group inline-flex min-h-11 items-center gap-1.5 font-heading text-sm font-semibold text-purple underline decoration-purple/40 underline-offset-4 hover:text-purple-hover hover:decoration-purple [@media(max-height:36rem)]:min-h-9"
              >
                View all products
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <p className="text-meta text-subtle">Prices and pack sizes shown are demo placeholders.</p>
            </div>
          }
        />
      </div>
    </section>
  );
}
