import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { storyProduct } from "@/data/catalog";

export function BrandStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="section-y scroll-mt-(--header-h)">
      <div className="container-page grid items-center gap-10 md:grid-cols-12 md:gap-8 lg:min-h-[80svh] lg:gap-16">
        <Reveal className="order-2 md:order-1 md:col-span-5">
          <figure className="mx-auto flex max-w-64 flex-col gap-3 sm:max-w-xs md:max-w-none">
            <Image
              src={storyProduct.image}
              alt={`${storyProduct.name} (${storyProduct.alsoKnownAs}) pouch with the Homefills promise printed on the front`}
              sizes="(min-width: 768px) 38vw, 90vw"
              className="h-auto w-full rounded-lg"
            />
            <figcaption className="text-meta text-subtle">
              The Homefills promise, as printed on the {storyProduct.alsoKnownAs} pouch.
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="order-1 flex flex-col gap-6 md:order-2 md:col-span-7 lg:gap-8">
          <p className="eyebrow text-purple">Our story</p>
          <h2 id="story-title" className="text-h2 font-semibold">
            A name for the things that fill a home kitchen.
          </h2>
          <blockquote className="border-l-2 border-purple pl-5 font-serif text-lead text-ink md:pl-6">
            <p>
              “We at homefills select small batches of spices, pulses or dry-fruits carefully from the best
              lot. Then we pack them manually, in clean &amp; hygienic conditions to preserve the maximum
              aroma &amp; freshness.”
            </p>
          </blockquote>
          <p className="max-w-xl font-serif text-ink">
            Every pack carries the same line under the logo — <em className="not-italic text-ink">trust of
            purity as mother &amp; child</em> — and the range now runs from whole and ground spices to
            masala blends, superfoods and everyday staples.
          </p>
          <Link href="/shop" className={buttonVariants({ variant: "outline", className: "self-start" })}>
            Shop the range <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
