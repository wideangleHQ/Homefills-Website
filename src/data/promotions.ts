import type { StaticImageData } from "next/image";

import trustedByMothersAd from "@/assets/Images/Ads/2.png";
import foodProductsAd from "@/assets/Images/Ads/3.png";
import superfoodsAd from "@/assets/Images/Ads/4.png";
import groundSpicesAd from "@/assets/Images/Ads/5.png";
import breakfastAd from "@/assets/Images/Ads/6.png";
import wholeSpicesBanner from "@/assets/Images/Hero Banner.png";

import { categoryHref, type CategorySlug } from "./catalog";

/*
 * Shop promotional configuration. Every creative is a supplied Homefills asset; the copy baked
 * into each image is the client's own. Placement lives here so the page never hardcodes ads.
 *
 * Asset audit (src/assets/Images/Ads):
 *   2.png 1076×1080 square   "Trusted by Mothers! Perfected by Homefills!" (blended masalas)
 *   3.png 1920×924  2.08:1   "Make your Boring Food Interesting!" (Poha, Raagi, Sooji…)
 *   4.png 1920×912  2.11:1   "Make Your Diet More Healthier!" (superfood jars)
 *   5.png 1920×912  2.11:1   "…Best Quality Ground Spices!" (ground spice pouches)
 *   6.png 1920×917  2.09:1   "Instant & Tasty Breakfast Options!" (Chana Sattu)
 * Plus Hero Banner.png 1672×941, whole-spice pouches with no baked-in text.
 */

export type Promo = {
  id: string;
  image: StaticImageData;
  /** Describes the artwork, including any text baked into it. */
  alt: string;
  href: string;
  cta: string;
  /** Short overlay copy, only for artwork without its own text. */
  overlay?: { eyebrow: string; title: string };
};

const promo = (id: string, image: StaticImageData, alt: string, category: CategorySlug, cta: string, overlay?: Promo["overlay"]): Promo => ({
  id,
  image,
  alt,
  href: categoryHref(category),
  cta,
  overlay,
});

export const heroSlides: Promo[] = [
  promo(
    "whole-spices",
    wholeSpicesBanner,
    "Homefills Kali Mirch, Lal Mirch and Dhania whole-spice pouches with bowls of peppercorns and coriander seeds.",
    "whole-spices",
    "Shop whole spices",
    { eyebrow: "Whole spices", title: "Kali Mirch, Lal Mirch & Dhania" },
  ),
  promo(
    "superfoods",
    superfoodsAd,
    "Make Your Diet More Healthier! Homefills chia, flax and basil seed jars on a checked tablecloth.",
    "superfoods",
    "Shop superfoods",
  ),
  promo(
    "breakfast",
    breakfastAd,
    "Instant & Tasty Breakfast Options! Homefills Chana Sattu in natural, dry-fruits and banana variants.",
    "foodstuff",
    "Shop breakfast staples",
  ),
];

/** Full-width strips between catalogue rows. `afterRow` counts complete product rows. */
export const catalogueBanners: { afterRow: number; promo: Promo }[] = [
  {
    afterRow: 2,
    promo: promo(
      "ground-spices",
      groundSpicesAd,
      "Give your dish a flavourful twist with our Best Quality Ground Spices! Homefills Dhania, Haldi and Lal Mirch powder pouches.",
      "ground-spices",
      "Shop ground spices",
    ),
  },
  {
    afterRow: 4,
    promo: promo(
      "food-products",
      foodProductsAd,
      "Make your Boring Food Interesting! with Homefills Food Products: Raagi Powder, Poha and Golden Keshri Sooji packs.",
      "foodstuff",
      "Shop foodstuff",
    ),
  },
];

/** Square creative shown beside a product collection on desktop, stacked above it on mobile. */
export const collectionFeature = {
  title: "Masalas for everyday cooking",
  description: "Blends for curries, gravies and weekend specials.",
  category: "blended-spices" as CategorySlug,
  promo: promo(
    "trusted-by-mothers",
    trustedByMothersAd,
    "Trusted by Mothers! Perfected by Homefills! A mother and daughter cooking beside Chicken, Garam and Meat Masala boxes.",
    "blended-spices",
    "Shop blended spices",
  ),
};
