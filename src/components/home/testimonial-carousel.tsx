"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/data/testimonials";

/**
 * Swipeable testimonial row: 1.15 cards on phones, 2 on tablets, 3 from lg up. Native scroll-snap
 * gives touch, trackpad and keyboard (focusable region + arrow keys); the arrows only appear when
 * there is something to scroll to. No autoplay.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ start: true, end: true });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      const start = el.scrollLeft <= 1;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      setState((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const overflowing = !(state.start && state.end);
  const page = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      {overflowing && (
        <div className="mb-4 hidden justify-end gap-2 md:flex">
          <Button variant="outline" size="icon" aria-label="Previous testimonials" disabled={state.start} onClick={() => page(-1)}>
            <ChevronLeft className="size-5" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Next testimonials" disabled={state.end} onClick={() => page(1)}>
            <ChevronRight className="size-5" />
          </Button>
        </div>
      )}

      <div
        ref={scroller}
        role="region"
        aria-label="Customer testimonials"
        tabIndex={0}
        className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 py-1 [scrollbar-width:none] min-[30rem]:-mx-5 min-[30rem]:scroll-px-5 min-[30rem]:px-5 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex gap-3 md:gap-4 lg:gap-6">
          {items.map((t) => (
            <li
              key={t.id}
              className="flex w-[87%] shrink-0 snap-start flex-col min-[30rem]:w-[60%] md:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <figure className="flex h-full flex-col justify-between gap-5 rounded-lg border border-line bg-surface p-5 transition-colors duration-200 hover:border-purple md:p-6">
                <blockquote>
                  <p className="font-serif text-base leading-relaxed text-ink md:text-[1.0625rem]">“{t.quote}”</p>
                </blockquote>
                {(t.name || t.location || t.photo || t.rating !== undefined) && (
                  <figcaption className="flex items-center gap-3">
                    {t.photo && (
                      <Image
                        src={t.photo}
                        alt={t.name ?? ""}
                        width={44}
                        height={44}
                        sizes="44px"
                        className="size-11 shrink-0 rounded-full object-cover"
                      />
                    )}
                    <span className="flex flex-col">
                      {t.name && <span className="font-heading font-semibold text-purple">{t.name}</span>}
                      {t.location && <span className="text-meta text-subtle">{t.location}</span>}
                      {t.rating !== undefined && (
                        <span className="text-meta text-ink tabular-nums">Rated {t.rating} out of 5</span>
                      )}
                    </span>
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
