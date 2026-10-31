"use client";

import { MotionConfig } from "motion/react";
import { createContext, use, useState, type ReactNode } from "react";

import type { Product } from "@/data/catalog";

export type CartLine = { product: Product; quantity: number };

type Store = {
  cart: CartLine[];
  cartCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  /** Quantity of one product in the cart (0 when absent). */
  quantityOf: (productId: string) => number;
  /** Set a product's quantity directly, adding or removing the line as needed. Does not open the cart. */
  setProductQuantity: (product: Product, quantity: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickView: Product | null;
  openQuickView: (product: Product | null) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const StoreContext = createContext<Store | null>(null);

// ponytail: in-memory demo cart, resets on reload; persist when real checkout lands.
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, openQuickView] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((lines) =>
      lines.some((l) => l.product.id === product.id)
        ? lines.map((l) =>
            l.product.id === product.id ? { ...l, quantity: l.quantity + quantity } : l,
          )
        : [...lines, { product, quantity }],
    );
    openQuickView(null);
    setCartOpen(true);
  };

  const setQuantity = (productId: string, quantity: number) =>
    setCart((lines) =>
      quantity < 1
        ? lines.filter((l) => l.product.id !== productId)
        : lines.map((l) => (l.product.id === productId ? { ...l, quantity } : l)),
    );

  const quantityOf = (productId: string) => cart.find((l) => l.product.id === productId)?.quantity ?? 0;

  const setProductQuantity = (product: Product, quantity: number) =>
    setCart((lines) => {
      const rest = lines.filter((l) => l.product.id !== product.id);
      if (quantity < 1) return rest;
      const existing = lines.find((l) => l.product.id === product.id);
      return existing
        ? lines.map((l) => (l.product.id === product.id ? { ...l, quantity } : l))
        : [...rest, { product, quantity }];
    });

  const store: Store = {
    cart,
    cartCount: cart.reduce((n, l) => n + l.quantity, 0),
    addToCart,
    setQuantity,
    quantityOf,
    setProductQuantity,
    cartOpen,
    setCartOpen,
    quickView,
    openQuickView,
    searchOpen,
    setSearchOpen,
  };

  return (
    <StoreContext value={store}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </StoreContext>
  );
}

export function useStore() {
  const store = use(StoreContext);
  if (!store) throw new Error("useStore must be used inside <StoreProvider>");
  return store;
}
