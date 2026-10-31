import type { CategorySlug } from "./catalog";

/*
 * DEMONSTRATION OFFERS. These are not Homefills promotions. They exist to show how a cart
 * progress bar behaves, and the UI labels them as demo wherever they appear.
 * Replace with real commercial terms (e.g. Shopify discounts / shipping rates) before launch.
 *
 * Calculation order (see lib/cart-pricing.ts):
 *   1. Eligible subtotal = sum of price × quantity for eligible products. Both thresholds and the
 *      progress bar use this, before any discount or delivery.
 *   2. Discount = percent of the eligible subtotal, rounded to the rupee, capped at maxDiscount,
 *      applied once. It never touches delivery.
 *   3. Delivery = deliveryCharge unless the eligible subtotal reaches the free-delivery threshold.
 *   4. To pay = max(0, items subtotal − discount) + delivery.
 */
export type OfferConfig = {
  isDemo: boolean;
  /** Flat demo delivery fee in ₹ below the free-delivery threshold. */
  deliveryCharge: number;
  freeDelivery: { threshold: number };
  discount: {
    threshold: number;
    percent: number;
    /** Largest discount in ₹ the offer can give. */
    maxDiscount: number;
    /** Categories the offer covers; "all" covers the whole catalogue. */
    eligibleCategories: CategorySlug[] | "all";
    /** Individual products left out of the offer. */
    excludedProductIds: string[];
  };
};

export const demoOffers: OfferConfig = {
  isDemo: true,
  deliveryCharge: 40,
  freeDelivery: { threshold: 200 },
  discount: {
    threshold: 500,
    percent: 30,
    maxDiscount: 200,
    eligibleCategories: "all",
    excludedProductIds: [],
  },
};
