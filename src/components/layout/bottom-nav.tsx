"use client";

import { House, LayoutGrid, Search, ShoppingBag, Store, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useStore } from "@/components/store/store-provider";

import { CountBadge } from "./site-header";

const itemClass =
  "relative flex h-(--bottom-nav-h) flex-1 flex-col items-center justify-center gap-1 font-heading text-[0.6875rem] font-medium text-subtle transition-colors duration-150 aria-[current=page]:text-purple";

function Item({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <>
      {active && <span aria-hidden className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-purple" />}
      <Icon className="size-5.5" strokeWidth={active ? 2.25 : 1.75} />
      <span>{label}</span>
    </>
  );
}

/** Mobile/tablet navigation (design.md §11). Hidden from lg up, where the header nav takes over. */
export function BottomNav() {
  const pathname = usePathname();
  const { cartCount, setCartOpen, setSearchOpen } = useStore();

  const links = [
    { label: "Home", href: "/", icon: House },
    { label: "Categories", href: "/#categories", icon: LayoutGrid },
    { label: "Shop", href: "/shop", icon: Store },
  ];

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="mx-auto flex max-w-xl">
        {links.map((l) => {
          const active = l.href === pathname;
          return (
            <li key={l.href} className="flex flex-1">
              <Link href={l.href} aria-current={active ? "page" : undefined} className={itemClass}>
                <Item icon={l.icon} label={l.label} active={active} />
              </Link>
            </li>
          );
        })}
        <li className="flex flex-1">
          <button type="button" className={itemClass} onClick={() => setSearchOpen(true)}>
            <Item icon={Search} label="Search" />
          </button>
        </li>
        <li className="flex flex-1">
          <button
            type="button"
            className={itemClass}
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            onClick={() => setCartOpen(true)}
          >
            <Item icon={ShoppingBag} label="Cart" />
            {cartCount > 0 && <CountBadge count={cartCount} className="top-2 right-[calc(50%-1.25rem)]" />}
          </button>
        </li>
      </ul>
    </nav>
  );
}
