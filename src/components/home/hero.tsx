import Image from "next/image";
import Link from "next/link";

import desktopHeroBanner from "@/assets/Images/Hero Banner.png";
import mobileHeroBanner from "@/assets/Images/Mobile Hero Banner.png";

/**
 * Homefills Homepage Hero Section — Responsive Full-Screen Visual
 *
 * Design concept: Pure Ingredients. Honest Goodness.
 * Minimal, modern, spacious, warm, refined, premium.
 *
 * Full-screen visual:
 * - Mobile: Mobile Hero Banner.png in full screen.
 *   CTA is placed directly below the hero text for mobile view only.
 * - Desktop: Hero Banner.png in full screen edge-to-edge.
 *   CTA positioned towards the bottom of the hero section.
 * - Header: Transparent initial header directly over hero.
 *
 * Strictly no Lucide icons in hero, no badges, no gradients, no secondary CTAs.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex h-[calc(100svh-var(--bottom-nav-h)-env(safe-area-inset-bottom,0px))] sm:h-auto sm:min-h-svh w-full flex-col justify-between overflow-hidden bg-[#F4E4C1] pt-24 min-[375px]:pt-28 pb-3 sm:pt-32 sm:pb-6 lg:pt-[clamp(6rem,13.33svh,9rem)] lg:pb-8"
    >
      {/* 1. Mobile full-screen portrait visual (9:16) */}
      <div className="absolute inset-0 z-0 sm:hidden pointer-events-none">
        <Image
          src={mobileHeroBanner}
          alt="Homefills spice packets — Kali Mirch, Lal Mirch, Dhania"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
      </div>

      {/* 2. Desktop full-screen landscape visual (16:9) */}
      <div className="absolute inset-0 z-0 hidden sm:block pointer-events-none">
        <Image
          src={desktopHeroBanner}
          alt="Homefills spice packets — Kali Mirch, Lal Mirch, Dhania"
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom select-none"
        />
      </div>

      {/* 3. Hero Text & Mobile CTA */}
      <div className="container-page relative z-10 flex flex-col items-center text-center px-4 pt-1 sm:pt-2">
        <h1
          id="hero-title"
          className="font-heading text-[1.875rem] leading-[1.15] font-semibold tracking-[-0.02em] text-purple transition-opacity duration-700 min-[360px]:text-[2.125rem] min-[390px]:text-[2.35rem] min-[428px]:text-[2.5rem] sm:text-4xl md:text-[2.75rem] lg:text-[3rem] sm:leading-tight"
        >
          <span className="block sm:inline">Pure Ingredients.</span>{" "}
          <span className="block sm:inline">Honest Goodness.</span>
        </h1>

        {/* Mobile View Only: CTA placed directly below the hero text */}
        <div className="mt-4 min-[375px]:mt-5 sm:hidden">
          <Link
            href="/shop"
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-md border border-purple bg-purple px-5 font-heading text-sm font-semibold text-surface shadow-xs transition-[background-color,border-color,transform] duration-200 ease-(--ease-soft) hover:border-purple-hover hover:bg-purple-hover active:border-purple-pressed active:bg-purple-pressed"
          >
            <span>Explore Collection</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-(--ease-soft) group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Spacer pushing desktop CTA to bottom */}
      <div className="flex-1 pointer-events-none" />

      {/* 4. Desktop View Only: CTA positioned towards the bottom */}
      <div className="container-page relative z-10 hidden sm:flex justify-center pb-1 sm:pb-2">
        <Link
          href="/shop"
          className="group inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-md border border-purple bg-purple px-6 sm:px-7 font-heading text-[0.9375rem] font-semibold text-surface shadow-xs transition-[background-color,border-color,transform] duration-200 ease-(--ease-soft) hover:border-purple-hover hover:bg-purple-hover active:border-purple-pressed active:bg-purple-pressed"
        >
          <span>Explore Collection</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-(--ease-soft) group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
