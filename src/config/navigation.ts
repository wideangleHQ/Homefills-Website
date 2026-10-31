import { categories, categoryHref } from "@/data/catalog";

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/#categories" },
  { label: "Why Homefills", href: "/#why-homefills" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      ...categories.map((c) => ({ label: c.name, href: categoryHref(c.slug) })),
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Why Homefills", href: "/#why-homefills" },
      { label: "Featured products", href: "/#featured" },
      { label: "Categories", href: "/#categories" },
    ],
  },
];
