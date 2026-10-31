import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { CategoryNav, CategoryNavFallback } from "@/components/shop/category-nav";
import { CollectionRow, FeaturedCollection } from "@/components/shop/collections";
import { PromoSlider } from "@/components/shop/promo-slider";
import { ShopCatalogue } from "@/components/shop/shop-catalogue";
import { ProductSlider } from "@/components/store/product-slider";
import { featuredProducts } from "@/data/catalog";
import { heroSlides } from "@/data/promotions";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop Homefills whole spices, ground spices, masala blends, superfoods and kitchen staples.",
};

/*
 * Static shell (intro, promos, featured row, collections) prerenders; the parts
 * that read ?category=… / filters stream in under Suspense.
 */
export default function ShopPage() {
  return (
    <>
      <div className="container-page flex flex-col gap-1.5 pt-5 pb-4 md:pt-8 md:pb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1 text-meta text-subtle">
            <li>
              <Link href="/" className="hover:text-purple hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-ink">
              Shop
            </li>
          </ol>
        </nav>
        <h1 className="text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] leading-tight font-semibold">Shop Homefills</h1>
      </div>

      <div className="flex flex-col gap-5 md:gap-7">
        <PromoSlider slides={heroSlides} />
        <Suspense fallback={<CategoryNavFallback />}>
          <CategoryNav />
        </Suspense>
      </div>

      <section aria-labelledby="shop-featured" className="container-page py-8 md:py-12">
        <ProductSlider
          products={featuredProducts}
          label="Featured products"
          header={
            <div className="flex flex-col gap-1">
              <h2 id="shop-featured" className="text-[clamp(1.375rem,1rem+1.4vw,2rem)] leading-tight font-semibold">
                Picked for your pantry
              </h2>
              <p className="font-serif text-sm text-ink sm:text-base">A few favourites to start with.</p>
            </div>
          }
        />
      </section>

      <Suspense fallback={<div className="min-h-[60vh]" aria-hidden />}>
        <ShopCatalogue />
      </Suspense>

      <FeaturedCollection />
      <CollectionRow
        id="collection-superfoods"
        title="Seeds and superfoods"
        description="Chia, flax and basil seeds, and the everyday wellness kit."
        slug="superfoods"
      />
    </>
  );
}
