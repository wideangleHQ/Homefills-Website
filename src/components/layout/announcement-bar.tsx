"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  isVisible?: boolean;
  isHome?: boolean;
  className?: string;
}

export function AnnouncementBar({
  isVisible = true,
  isHome = false,
  className,
}: AnnouncementBarProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Subtle mobile promotional rotation between the two verified brand statements
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={cn(
        "w-full overflow-hidden border-b border-line bg-soft text-ink transition-all duration-300 ease-(--ease-soft)",
        // On the homepage, hidden on initial presentation until scrolled beyond hero
        isHome && !isVisible
          ? "max-h-0 -translate-y-full border-b-0 opacity-0 pointer-events-none"
          : "max-h-12 translate-y-0 opacity-100",
        className,
      )}
    >
      <div className="container-page flex min-h-9 items-center justify-center py-1.5 text-center text-meta">
        {/* Desktop presentation: refined single line with verified promotional content */}
        <p className="hidden sm:flex sm:items-center sm:justify-center sm:gap-x-2">
          <span>Trust of purity as mother &amp; child.</span>
          <span aria-hidden="true" className="text-subtle">·</span>
          <span>Spices, blends, superfoods &amp; staples.</span>
          <Link
            href="/shop"
            className="ml-1 font-semibold text-purple underline decoration-purple/40 underline-offset-4 transition-colors hover:text-purple-hover hover:decoration-purple"
          >
            Shop now →
          </Link>
        </p>

        {/* Mobile presentation: restrained promotional slider preventing text crowding */}
        <div className="relative flex h-5 w-full items-center justify-center sm:hidden">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-(--ease-soft)",
              activeSlide === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
            )}
          >
            <span className="truncate font-medium">Trust of purity as mother &amp; child.</span>
          </div>
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity duration-500 ease-(--ease-soft)",
              activeSlide === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
            )}
          >
            <span className="truncate">Spices, blends &amp; staples.</span>
            <Link
              href="/shop"
              className="shrink-0 font-semibold text-purple underline decoration-purple/40 underline-offset-4"
            >
              Shop now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
