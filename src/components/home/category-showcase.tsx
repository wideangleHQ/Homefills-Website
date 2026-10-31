import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { categories, categoryHref } from "@/data/catalog";

import { ParallaxFrame } from "./parallax-frame";
import { SectionHeading } from "./section-heading";

export function CategoryShowcase() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-title"
      className="section-y scroll-mt-(--header-h) bg-soft"
    >
      <div className="container-page">
        <SectionHeading
          id="categories-title"
          eyebrow="Categories"
          title="Six shelves of the Homefills pantry."
          description="From whole and ground spices to superfoods and kitchen staples."
          action={{ label: "View all products", href: "/shop" }}
        />

        {/* Staggered middle column on desktop for an editorial rhythm. */}
        <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 md:grid-cols-3 md:gap-y-10 lg:gap-x-8 lg:pb-16 lg:[&>li:nth-child(3n+2)]:translate-y-16">
          {categories.map((category, i) => (
            <li key={category.slug}>
              <Reveal delay={(i % 3) * 0.06}>
                <Link href={categoryHref(category.slug)} className="group flex flex-col gap-3 md:gap-4">
                  <ParallaxFrame>
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1536px) 480px, (min-width: 768px) 34vw, 52vw"
                      className="object-cover transition-transform duration-500 ease-(--ease-soft) group-hover:scale-[1.03]"
                    />
                  </ParallaxFrame>
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex flex-col gap-1">
                      <span className="font-heading text-meta text-subtle tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-base font-semibold text-purple sm:text-h3">
                        {category.name}
                      </span>
                      <span className="hidden font-serif text-sm text-ink sm:block">{category.includes}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="mt-6 hidden size-5 shrink-0 text-ink transition-transform duration-200 group-hover:translate-x-1 sm:block"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
