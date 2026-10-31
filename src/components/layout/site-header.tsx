"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useStore } from "@/components/store/store-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { AnnouncementBar } from "./announcement-bar";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cartCount, setSearchOpen } = useStore();
  const [scrolledBeyondHero, setScrolledBeyondHero] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolledBeyondHero(true);
      return;
    }

    const checkScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setScrolledBeyondHero(window.scrollY > window.innerHeight * 0.75);
        return;
      }
      const rect = hero.getBoundingClientRect();
      // Hero has scrolled past when its bottom is near or above header area
      setScrolledBeyondHero(rect.bottom <= 80);
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);

  const showSolidHeader = !isHome || scrolledBeyondHero;

  return (
    <header
      className={cn(
        "top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-300 ease-(--ease-soft)",
        // On homepage, the header sits directly over the hero image area
        isHome ? "fixed inset-x-0" : "sticky",
        showSolidHeader
          ? "border-b border-line bg-canvas/95 backdrop-blur-xs shadow-xs"
          : "border-b border-transparent bg-transparent shadow-none",
      )}
    >
      {/* Scroll-triggered promotional announcement slider */}
      <AnnouncementBar isVisible={showSolidHeader} isHome={isHome} />

      <div className="container-page flex h-(--header-h) items-center justify-between gap-4 sm:gap-6">
        <Logo className="h-10 lg:h-11" preload />

        {/* Desktop only: on mobile the hamburger menu and bottom bar provide navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center px-4 text-[0.9375rem] font-medium text-purple transition-colors duration-150 hover:text-purple-hover",
                      "after:absolute after:inset-x-4 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-purple after:transition-transform after:duration-200 hover:after:scale-x-100",
                      active && "after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop controls */}
        <div className="hidden items-center gap-1 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search products"
            onClick={() => setSearchOpen(true)}
            className="text-purple hover:text-purple-hover"
          >
            <Search className="size-5" />
          </Button>
          <Link
            href="/cart"
            aria-current={pathname === "/cart" ? "page" : undefined}
            className={buttonVariants({ variant: "ghost", size: "icon", className: "relative text-purple hover:text-purple-hover" })}
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && <CountBadge count={cartCount} />}
          </Link>
        </div>

        {/* Mobile controls including hamburger menu */}
        <MobileMenu />
      </div>
    </header>
  );
}

export function CountBadge({ count, className }: { count: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-1.5 right-1 grid min-w-4.5 place-items-center rounded-full bg-purple px-1 font-heading text-[0.6875rem] leading-4.5 font-semibold text-surface",
        className,
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
