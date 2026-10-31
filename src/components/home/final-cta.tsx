import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { categories, categoryHref } from "@/data/catalog";

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="on-purple bg-purple text-surface">
      <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-24">
        <Reveal className="flex flex-col items-start gap-5 lg:col-span-7">
          <h2 id="final-title" className="text-h2 font-semibold text-surface">
            Stock your kitchen with Homefills.
          </h2>
          <p className="max-w-lg font-serif text-lead text-peach">
            Browse the complete range of spices, blends, superfoods and staples.
          </p>
          <Link href="/shop" className={buttonVariants({ size: "lg", variant: "light" })}>
            Shop all products <ArrowRight />
          </Link>
        </Reveal>

        <nav aria-label="Shop by category" className="lg:col-span-5">
          <ul className="grid grid-cols-2 border-t border-peach/30">
            {categories.map((c) => (
              <li key={c.slug} className="border-b border-peach/30">
                <Link
                  href={categoryHref(c.slug)}
                  className="group flex min-h-12 items-center justify-between gap-2 py-2 pr-3 font-heading text-[0.9375rem] font-semibold text-peach hover:text-surface hover:underline hover:underline-offset-4"
                >
                  {c.name}
                  <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
