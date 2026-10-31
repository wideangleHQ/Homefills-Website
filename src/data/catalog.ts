import type { StaticImageData } from "next/image";

import blendedSpicesImg from "@/assets/Images/Categories/Blended Spices.webp";
import foodAdditivesImg from "@/assets/Images/Categories/Food Adictive.webp";
import foodstuffImg from "@/assets/Images/Categories/Food Stuff.webp";
import groundSpicesImg from "@/assets/Images/Categories/Grounded Spices.webp";
import superfoodsImg from "@/assets/Images/Categories/Superfoods.webp";
import wholeSpicesImg from "@/assets/Images/Categories/Whole Spices.webp";

import chanaSattuBananaImg from "@/assets/Images/Featured Products/Chana-Sattu-_Banana.webp";
import chanaSattuDryFruitsImg from "@/assets/Images/Featured Products/Chana-Sattu-_Dry-fruits.webp";
import chiaSeedsImg from "@/assets/Images/Featured Products/Chia-Seeds.webp";
import chickenMasalaImg from "@/assets/Images/Featured Products/Chicken-Masala.webp";
import wellnessKitImg from "@/assets/Images/Featured Products/EverydayWellnessKit.webp";
import kashmiriMirchImg from "@/assets/Images/Featured Products/Kashmiri-Mirch.webp";
import kitchenKingImg from "@/assets/Images/Featured Products/Kitchen-King-Masala.webp";
import corianderPowderImg from "@/assets/Images/Products/Coriander-Powder_1.webp";
import cuminPowderImg from "@/assets/Images/Products/Cumin-Powder_1.webp";
import curryPowderImg from "@/assets/Images/Products/Curry-Powder_1.webp";
import garamMasalaImg from "@/assets/Images/Products/Garam-Masala-_1.webp";
import jeeraImg from "@/assets/Images/Products/Jeera_1.webp";
import meatMasalaImg from "@/assets/Images/Products/Meat-Masala-_1.webp";
import panchphoranImg from "@/assets/Images/Products/PANCHPHUTAN.webp";
import turmericPowderImg from "@/assets/Images/Products/TurmericPowder1.webp";
// Cut from the supplied category artwork, where these real packs sit unobstructed.
import basilSeedImg from "@/assets/Images/Products/Cropped/Basil-Seed.webp";
import flaxSeedImg from "@/assets/Images/Products/Cropped/Flax-Seed.webp";
import kalaNamakImg from "@/assets/Images/Products/Cropped/Kala-Namak.webp";
import lalMirchWholeImg from "@/assets/Images/Products/Cropped/Lal-Mirch-Whole.webp";
import raagiPowderImg from "@/assets/Images/Products/Cropped/Raagi-Powder.webp";

/*
 * Demo catalogue. Names, categories, pack type, form and pack notes come from the real
 * Homefills packaging and artwork. Prices and pack sizes are DEMO PLACEHOLDERS
 * (see DEMO_PRICING) and must be replaced with verified data, e.g. from Shopify, before launch.
 */

/** Every price and pack size below is a placeholder. The UI labels them as demo while this is true. */
export const DEMO_PRICING = true;

/** What is inside the pack, taken from the product name. */
export type ProductForm = "Whole" | "Ground" | "Blend" | "Seeds" | "Flour" | "Kit";
/** The packaging visible in the product photo. */
export type PackType = "Box" | "Pouch" | "Jar" | "Kit";

export type CategorySlug =
  | "blended-spices"
  | "ground-spices"
  | "whole-spices"
  | "superfoods"
  | "foodstuff"
  | "food-additives";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Products visible in the category artwork. */
  includes: string;
  image: StaticImageData;
};

export type Product = {
  id: string;
  name: string;
  /** DEMO PRICE in INR: a placeholder, not supplied by Homefills. Replace with verified prices before launch. */
  price: number;
  /** Short, factual line that only restates what the pack name and photo show. */
  description: string;
  /** Secondary name printed on the pack, e.g. the Hindi name. */
  alsoKnownAs?: string;
  category: CategorySlug;
  image: StaticImageData;
  /** Claims printed on this product's own pack. */
  packNotes?: string[];
  /** DEMO pack size (see DEMO_PRICING). */
  packSize: string;
  packType: PackType;
  form: ProductForm;
};

export const categories: Category[] = [
  {
    slug: "blended-spices",
    name: "Blended Spices",
    includes: "Rajma, Tandoori and Biryani Masala",
    image: blendedSpicesImg,
  },
  {
    slug: "ground-spices",
    name: "Ground Spices",
    includes: "Cumin, Turmeric and Coriander Powder",
    image: groundSpicesImg,
  },
  {
    slug: "whole-spices",
    name: "Whole Spices",
    includes: "Kali Mirch, Lal Mirch and Dhania",
    image: wholeSpicesImg,
  },
  {
    slug: "superfoods",
    name: "Superfoods",
    includes: "Flax, Chia and Basil Seeds",
    image: superfoodsImg,
  },
  {
    slug: "foodstuff",
    name: "Foodstuff",
    includes: "Sagoo, Raagi Powder and Sooji",
    image: foodstuffImg,
  },
  {
    slug: "food-additives",
    name: "Food Additives",
    includes: "Sendha Namak, Kala Namak and Edible Soda",
    image: foodAdditivesImg,
  },
];

export const products: Product[] = [
  { id: "garam-masala", packType: "Box", form: "Blend", packSize: "100 g", price: 95, description: "A ground masala blend to finish curries, gravies and dals.", name: "Garam Masala", category: "blended-spices", image: garamMasalaImg },
  { id: "kitchen-king-masala", packType: "Box", form: "Blend", packSize: "100 g", price: 90, description: "An all-purpose masala blend for everyday sabzis and gravies.", name: "Kitchen King Masala", category: "blended-spices", image: kitchenKingImg },
  { id: "chicken-masala", packType: "Box", form: "Blend", packSize: "100 g", price: 85, description: "A masala blend made for chicken curries.", name: "Chicken Masala", category: "blended-spices", image: chickenMasalaImg },
  { id: "meat-masala", packType: "Box", form: "Blend", packSize: "100 g", price: 85, description: "A masala blend made for meat curries.", name: "Meat Masala", category: "blended-spices", image: meatMasalaImg },
  {
    id: "curry-powder", packType: "Box", form: "Blend", packSize: "100 g", price: 80, description: "A curry powder blend with no onion and no garlic, as printed on the pack.",
    name: "Curry Powder",
    category: "blended-spices",
    image: curryPowderImg,
    packNotes: ["No onion, no garlic"],
  },
  { id: "kashmiri-mirch", packType: "Box", form: "Ground", packSize: "100 g", price: 110, description: "Ground Kashmiri red chilli, for colour and mild heat.", name: "Kashmiri Mirch", category: "ground-spices", image: kashmiriMirchImg },
  {
    id: "turmeric-powder", packType: "Pouch", form: "Ground", packSize: "200 g", price: 70, description: "Ground turmeric (haldi) for everyday cooking.",
    name: "Turmeric Powder",
    alsoKnownAs: "Haldi",
    category: "ground-spices",
    image: turmericPowderImg,
  },
  {
    id: "coriander-powder", packType: "Pouch", form: "Ground", packSize: "200 g", price: 65, description: "Ground coriander (dhania) for curries, dals and marinades.",
    name: "Coriander Powder",
    alsoKnownAs: "Dhania",
    category: "ground-spices",
    image: corianderPowderImg,
  },
  {
    id: "cumin-powder", packType: "Pouch", form: "Ground", packSize: "100 g", price: 75, description: "Ground cumin (jeera) for tempering and spice blends.",
    name: "Cumin Powder",
    alsoKnownAs: "Jeera",
    category: "ground-spices",
    image: cuminPowderImg,
  },
  {
    id: "jeera", packType: "Pouch", form: "Whole", packSize: "100 g", price: 90, description: "Whole cumin seeds (jeera) for tempering and cooking.",
    name: "Jeera",
    alsoKnownAs: "Cumin Seeds",
    category: "whole-spices",
    image: jeeraImg,
  },
  {
    id: "panchphoran", packType: "Pouch", form: "Whole", packSize: "100 g", price: 60, description: "A five-seed whole spice mix (panchphoran) for tempering.",
    name: "Panchuphutan",
    alsoKnownAs: "Panchphoran",
    category: "whole-spices",
    image: panchphoranImg,
    packNotes: ["All natural", "No added colour, flavour or preservatives"],
  },
  { id: "chia-seeds", packType: "Jar", form: "Seeds", packSize: "150 g", price: 199, description: "Whole chia seeds in a ready-to-use jar.", name: "Chia Seeds", category: "superfoods", image: chiaSeedsImg },
  { id: "everyday-wellness-kit", packType: "Kit", form: "Kit", packSize: "1 kit", price: 549, description: "A set of Homefills seed jars with a pouch of natural jaggery, as pictured.", name: "Everyday Wellness Kit", category: "superfoods", image: wellnessKitImg },
  {
    id: "chana-sattu-banana", packType: "Box", form: "Flour", packSize: "500 g", price: 120, description: "Roasted chickpea (chana) sattu in banana flavour.",
    name: "Chana Sattu — Banana",
    category: "foodstuff",
    image: chanaSattuBananaImg,
    packNotes: ["Fortified"],
  },
  {
    id: "chana-sattu-dry-fruits", packType: "Box", form: "Flour", packSize: "500 g", price: 130, description: "Roasted chickpea (chana) sattu in dry-fruits flavour.",
    name: "Chana Sattu — Dry Fruits",
    category: "foodstuff",
    image: chanaSattuDryFruitsImg,
    packNotes: ["Fortified"],
  },
  {
    id: "lal-mirch-whole", packType: "Pouch", form: "Whole", packSize: "100 g", price: 85,
    description: "Whole dried red chillies (lal mirch) for tempering and cooking.",
    name: "Lal Mirch (Whole)",
    alsoKnownAs: "Red Chilli",
    category: "whole-spices",
    image: lalMirchWholeImg,
  },
  {
    id: "kala-namak", packType: "Pouch", form: "Ground", packSize: "100 g", price: 45,
    description: "Ground black salt (kala namak) for everyday seasoning.",
    name: "Kala Namak",
    alsoKnownAs: "Grounded Black Salt",
    category: "food-additives",
    image: kalaNamakImg,
  },
  {
    id: "raagi-powder", packType: "Pouch", form: "Flour", packSize: "500 g", price: 70,
    description: "Finger millet (raagi) flour for rotis, porridge and baking.",
    name: "Raagi Powder",
    alsoKnownAs: "Finger Millet Flour",
    category: "foodstuff",
    image: raagiPowderImg,
  },
  {
    id: "flax-seeds", packType: "Jar", form: "Seeds", packSize: "150 g", price: 149,
    description: "Whole flax seeds in a ready-to-use jar.",
    name: "Flax Seeds",
    category: "superfoods",
    image: flaxSeedImg,
  },
  {
    id: "basil-seeds", packType: "Jar", form: "Seeds", packSize: "150 g", price: 169,
    description: "Whole basil (sabja) seeds in a ready-to-use jar.",
    name: "Basil Seeds",
    category: "superfoods",
    image: basilSeedImg,
  },
];

const byId = (id: string) => {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Unknown product: ${id}`);
  return product;
};

export const isCategorySlug = (value: string | null): value is CategorySlug =>
  categories.some((c) => c.slug === value);

export const getCategory = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)!;

export const categoryHref = (slug: CategorySlug) => `/shop?category=${slug}`;

/** Spread across every category that has product photography. */
export const featuredProducts = [
  "garam-masala",
  "turmeric-powder",
  "jeera",
  "chia-seeds",
  "chana-sattu-banana",
  "coriander-powder",
  "everyday-wellness-kit",
  "chana-sattu-dry-fruits",
  "kashmiri-mirch",
  "curry-powder",
].map(byId);

const rupees = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatPrice = (amount: number) => rupees.format(amount);

/** One verified attribute printed on the pack, for compact product cards. */
export const productSpec = (product: Product) => product.packNotes?.[0] ?? product.alsoKnownAs;

export const heroProducts = {
  front: byId("garam-masala"),
  left: byId("kashmiri-mirch"),
  right: byId("turmeric-powder"),
};

export const storyProduct = byId("panchphoran");

/** Products for a category, in catalogue order. */
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
