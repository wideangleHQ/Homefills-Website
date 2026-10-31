"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { Promo } from "@/data/promotions";
import { cn } from "@/lib/utils";

/**
 * Hero promo carousel. Native scroll-snap handles swipe and trackpad; arrows and dots move it
 * programmatically. No autoplay, so nothing moves unless the shopper asks.
 */
export function PromoSlider({ slides }: { slides: Promo[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const target = (i + slides.length) % slides.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: target * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-purple/20 bg-surface/90 text-purple shadow-float transition-colors hover:bg-surface md:grid";

  return (
    <section aria-roledescription="carousel" aria-label="Featured promotions" className="container-page">
      <div className="relative">
        <div
          ref={track}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className="relative aspect-[2.1/1] w-full shrink-0 snap-start bg-soft"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                preload={i === 0}
                sizes="(min-width: 1520px) 1328px, 100vw"
                className="object-cover"
              />
              {slide.overlay && (
                // Sits in the empty wall above the packs (the top ~third of this artwork).
                <div className="absolute top-[6%] left-[4%] flex flex-col gap-0.5 sm:gap-1.5">
                  <p className="eyebrow text-purple max-sm:text-[0.625rem]">{slide.overlay.eyebrow}</p>
                  <p className="font-heading text-sm leading-tight font-semibold text-purple sm:text-2xl lg:text-[2rem]">
                    {slide.overlay.title}
                  </p>
                </div>
              )}
              {/* The whole slide is the link; the pill is its visible label from sm up. */}
              <Link href={slide.href} className="group absolute inset-0 rounded-xl" aria-label={slide.cta}>
                <span className="absolute right-[3%] bottom-[7%] hidden items-center gap-2 rounded-md bg-purple px-4 py-2.5 font-heading text-sm font-semibold text-surface transition-colors group-hover:bg-purple-hover sm:inline-flex">
                  {slide.cta} <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          ))}
        </div>

        <button type="button" aria-label="Previous promotion" onClick={() => go(index - 1)} className={cn(arrow, "left-3")}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" aria-label="Next promotion" onClick={() => go(index + 1)} className={cn(arrow, "right-3")}>
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-2 flex justify-center gap-1">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to promotion ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
            className="group grid size-8 place-items-center"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-[width,background-color] duration-200",
                i === index ? "w-6 bg-purple" : "w-1.5 bg-subtle/40 group-hover:bg-subtle",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
