"use client";

import { useState } from "react";
import { ArrowRight, ChevronRight, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useStore } from "@/components/store/store-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { categories, categoryHref } from "@/data/catalog";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { CountBadge } from "./site-header";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setSearchOpen } = useStore();

  const handleNavClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-1 lg:hidden">
      {/* Search trigger */}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Search products"
        onClick={() => setSearchOpen(true)}
        className="text-purple hover:text-purple-hover"
      >
        <Search className="size-5" />
      </Button>

      {/* Cart trigger */}
      <Link
        href="/cart"
        aria-current={pathname === "/cart" ? "page" : undefined}
        className={buttonVariants({ variant: "ghost", size: "icon-sm", className: "relative text-purple hover:text-purple-hover" })}
        aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
      >
        <ShoppingBag className="size-5" />
        {cartCount > 0 && <CountBadge count={cartCount} />}
      </Link>

      {/* Hamburger menu button */}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="text-purple hover:text-purple-hover"
      >
        <Menu className="size-6" />
      </Button>

      {/* Mobile Drawer Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="flex h-full w-[85vw] max-w-sm flex-col border-l border-line bg-canvas p-0 shadow-xl"
        >
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between border-b border-line px-5 py-4">
            <SheetTitle className="text-left">
              <Logo className="h-9 w-auto" />
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-purple hover:text-purple-hover"
            >
              <X className="size-5" />
            </Button>
          </SheetHeader>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <p className="eyebrow text-subtle mb-3">Navigation</p>
            <nav aria-label="Mobile Navigation Drawer">
              <ul className="flex flex-col space-y-1">
                {primaryNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3.5 py-3 font-heading text-base font-medium transition-colors",
                          active
                            ? "bg-soft text-purple font-semibold"
                            : "text-ink hover:bg-soft hover:text-purple",
                        )}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="size-4 text-subtle" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Product Categories */}
            <div className="mt-8 border-t border-line pt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="eyebrow text-subtle">Product Categories</p>
                <Link
                  href="/shop"
                  onClick={handleNavClick}
                  className="text-meta font-semibold text-purple underline decoration-purple/40 underline-offset-4"
                >
                  View all
                </Link>
              </div>
              <ul className="grid grid-cols-1 gap-1">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={categoryHref(c.slug)}
                      onClick={handleNavClick}
                      className="flex items-center justify-between rounded-md px-3.5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-soft hover:text-purple"
                    >
                      <span>{c.name}</span>
                      <span className="text-meta text-subtle">{c.includes.split(",")[0]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand Promise Callout */}
            <div className="mt-8 rounded-lg border border-line bg-soft p-4">
              <p className="font-heading text-xs font-semibold uppercase tracking-wider text-purple">
                Trust of purity
              </p>
              <p className="mt-1 font-serif text-xs text-ink leading-relaxed">
                Small-batch spices, blends and superfoods packed to preserve aroma and everyday goodness.
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t border-line bg-soft/60 p-5">
            <Link
              href="/shop"
              onClick={handleNavClick}
              className="group flex h-11 w-full items-center justify-center gap-2 rounded-md border border-purple bg-purple px-5 font-heading text-[0.9375rem] font-semibold text-surface transition-colors hover:bg-purple-hover"
            >
              <span>Explore Collection</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
