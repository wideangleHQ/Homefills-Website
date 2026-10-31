import type { CategorySlug, Product } from "@/data/catalog";
import type { OfferConfig } from "@/data/offers";

/*
 * Cart maths and add-on ranking. Pure functions with type-only imports, so they can run on any
 * product source (and directly under Node: see cart-pricing.check.mts).
 */

type PricedProduct = Pick<Product, "id" | "price" | "category">;
export type PricedLine = { product: PricedProduct; quantity: number };

export type Milestone = {
  id: "delivery" | "discount";
  threshold: number;
  unlocked: boolean;
  /** ₹ still needed; 0 once unlocked. */
  remaining: number;
};

export function isEligible(product: PricedProduct, offers: OfferConfig) {
  const { eligibleCategories, excludedProductIds } = offers.discount;
  if (excludedProductIds.includes(product.id)) return false;
  return eligibleCategories === "all" || eligibleCategories.includes(product.category);
}

export function priceCart(lines: PricedLine[], offers: OfferConfig) {
  const sum = (ls: PricedLine[]) => ls.reduce((n, l) => n + l.product.price * Math.max(0, l.quantity), 0);
  const subtotal = sum(lines);
  const eligibleSubtotal = sum(lines.filter((l) => isEligible(l.product, offers)));
  const empty = subtotal === 0;

  const milestone = (id: Milestone["id"], threshold: number): Milestone => ({
    id,
    threshold,
    unlocked: eligibleSubtotal >= threshold,
    remaining: Math.max(0, threshold - eligibleSubtotal),
  });
  const delivery = milestone("delivery", offers.freeDelivery.threshold);
  const discountMilestone = milestone("discount", offers.discount.threshold);

  const discount = discountMilestone.unlocked
    ? Math.min(Math.round((eligibleSubtotal * offers.discount.percent) / 100), offers.discount.maxDiscount, subtotal)
    : 0;
  const deliveryFee = empty || delivery.unlocked ? 0 : offers.deliveryCharge;
  const deliverySaved = !empty && delivery.unlocked ? offers.deliveryCharge : 0;

  return {
    subtotal,
    eligibleSubtotal,
    discount,
    deliveryFee,
    deliverySaved,
    savings: discount + deliverySaved,
    total: Math.max(0, subtotal - discount) + deliveryFee,
    milestones: [delivery, discountMilestone] as const,
    /** The first milestone not yet reached, if any. */
    next: [delivery, discountMilestone].find((m) => !m.unlocked) ?? null,
  };
}

export type CartPricing = ReturnType<typeof priceCart>;

/** Category order for add-ons when nothing else decides: spices first, then superfoods and staples. */
export const addOnCategoryPriority: CategorySlug[] = [
  "whole-spices",
  "ground-spices",
  "blended-spices",
  "superfoods",
  "foodstuff",
  "food-additives",
];

/**
 * Add-on order for the cart page.
 * - A milestone is still locked: products that close the gap on their own come first, cheapest
 *   first (the smallest helpful step), then the rest, largest contribution first.
 * - Everything is unlocked: complementary picks from the categories already in the cart, then
 *   the rest by category priority. No pressure to spend more.
 * Products already in the cart are never recommended.
 */
export function rankAddOns<P extends PricedProduct>(
  products: P[],
  cartIds: Set<string>,
  remaining: number | null,
  limit = 10,
) {
  const cartCategories = new Set(products.filter((p) => cartIds.has(p.id)).map((p) => p.category));
  const priority = (p: P) => addOnCategoryPriority.indexOf(p.category);
  const candidates = products.filter((p) => !cartIds.has(p.id));

  let ranked: P[];
  if (remaining !== null && remaining > 0) {
    const closers = candidates.filter((p) => p.price >= remaining).sort((a, b) => a.price - b.price || priority(a) - priority(b));
    const steps = candidates.filter((p) => p.price < remaining).sort((a, b) => b.price - a.price || priority(a) - priority(b));
    ranked = [...closers, ...steps];
  } else {
    ranked = [...candidates].sort(
      (a, b) =>
        Number(cartCategories.has(b.category)) - Number(cartCategories.has(a.category)) ||
        priority(a) - priority(b) ||
        a.price - b.price,
    );
  }
  return ranked.slice(0, limit);
}
