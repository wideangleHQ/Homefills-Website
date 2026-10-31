/*
 * Self-check for the cart maths. Run with: node src/lib/cart-pricing.check.mts
 * (Node 22.6+ strips the types; excluded from tsc because of the .ts import below.)
 */
import assert from "node:assert/strict";

import type { OfferConfig } from "../data/offers";
import { priceCart, rankAddOns } from "./cart-pricing.ts";

const offers: OfferConfig = {
  isDemo: true,
  deliveryCharge: 40,
  freeDelivery: { threshold: 200 },
  discount: { threshold: 500, percent: 30, maxDiscount: 200, eligibleCategories: "all", excludedProductIds: [] },
};
const item = (id: string, price: number, category = "ground-spices") => ({ id, price, category }) as const;
const cart = (...lines: [ReturnType<typeof item>, number][]) =>
  lines.map(([product, quantity]) => ({ product: product as never, quantity }));

// The brief's example table.
for (const [subtotal, deliveryLeft, discountLeft] of [
  [150, 50, 350],
  [200, 0, 300],
  [350, 0, 150],
  [500, 0, 0],
  [650, 0, 0],
] as const) {
  const p = priceCart(cart([item("a", subtotal), 1]), offers);
  assert.equal(p.milestones[0].remaining, deliveryLeft, `delivery remaining at ${subtotal}`);
  assert.equal(p.milestones[1].remaining, discountLeft, `discount remaining at ${subtotal}`);
}

// Delivery fee below and at the threshold.
assert.equal(priceCart(cart([item("a", 150), 1]), offers).deliveryFee, 40);
assert.equal(priceCart(cart([item("a", 100), 2]), offers).deliveryFee, 0);
assert.equal(priceCart(cart([item("a", 150), 1]), offers).total, 190);

// Discount: 30% once, never on delivery, capped.
const at500 = priceCart(cart([item("a", 95), 4], [item("b", 120), 1]), offers);
assert.deepEqual([at500.subtotal, at500.discount, at500.deliveryFee, at500.total], [500, 150, 0, 350]);
assert.equal(priceCart(cart([item("a", 800), 1]), offers).discount, 200, "capped at maxDiscount");
assert.equal(priceCart(cart([item("a", 499), 1]), offers).discount, 0, "nothing below the threshold");

// Only eligible products count, for both the threshold and the discount.
const partial = { ...offers, discount: { ...offers.discount, excludedProductIds: ["kit"] } };
const mixed = priceCart(cart([item("kit", 549), 1], [item("a", 100), 1]), partial);
assert.equal(mixed.eligibleSubtotal, 100);
assert.equal(mixed.discount, 0, "excluded product neither unlocks nor earns the discount");
assert.equal(mixed.deliveryFee, 40);

// Empty cart and zero quantities.
assert.deepEqual(priceCart([], offers).total, 0);
assert.equal(priceCart(cart([item("a", 100), 0]), offers).subtotal, 0);

// Add-ons: in-cart products excluded; the cheapest gap-closer leads; unlocked carts get complements.
const catalogue = [item("cheap", 45), item("mid", 65), item("closer", 70), item("big", 199, "superfoods"), item("inCart", 95, "blended-spices")];
const gap = rankAddOns(catalogue, new Set(["inCart"]), 50).map((p) => p.id);
assert.deepEqual(gap.slice(0, 3), ["mid", "closer", "big"]);
assert.ok(!gap.includes("inCart"));
const unlocked = rankAddOns([...catalogue, item("blend2", 85, "blended-spices")], new Set(["inCart"]), null).map((p) => p.id);
assert.equal(unlocked[0], "blend2", "same-category complement first when nothing is left to unlock");

console.log("cart-pricing: all checks passed");
