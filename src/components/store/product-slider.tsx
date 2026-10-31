"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { Product } from "@/data/catalog";

import { ProductCard } from "./product-card";

/**
 * Horizontal, scroll-snapping product carousel. Native overflow scrolling gives
 * touch, trackpad and keyboard (focusable region + arrow keys) for free; the
 * arrows are an extra for pointer users. No autoplay, no looping.
 *
 * Card width is a CSS variable derived from both viewport width and height, so
 * the whole section keeps fitting on short screens.
 */
export function ProductSlider({
  products,
  label,
  header,
  footer,
}: {
  products: Product[];
  label: string;
  header: ReactNode;
  footer?: ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      const start = el.scrollLeft <= 1;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      setEdge((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const scrollByPage = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <div className="mb-3 flex items-end justify-between gap-6 md:mb-[clamp(0.75rem,2.5dvh,1.5rem)]">
        {header}
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous products"
            disabled={edge.start}
            onClick={() => scrollByPage(-1)}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next products"
            disabled={edge.end}
            onClick={() => scrollByPage(1)}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      {/* Bleeds to the screen edge on phones so the next card peeks in. */}
      <div
        ref={scroller}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="-mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain px-4 py-1 [scrollbar-width:none] min-[30rem]:-mx-5 min-[30rem]:scroll-px-5 min-[30rem]:px-5 md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-3 [--card-w:clamp(8.5rem,min(42vw,30dvh),14rem)] md:gap-4 md:[--card-w:clamp(9.5rem,min(22vw,24dvh),14rem)]">
          {products.map((product) => (
            <li key={product.id} className="w-(--card-w) shrink-0 snap-start">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
      {footer}
    </>
  );
}
