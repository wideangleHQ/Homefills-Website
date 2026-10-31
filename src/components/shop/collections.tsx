import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProductSlider } from "@/components/store/product-slider";
import { categoryHref, getCategory, productsIn, type CategorySlug, type Product } from "@/data/catalog";
import { collectionFeature } from "@/data/promotions";

function ViewAll({ slug }: { slug: CategorySlug }) {
  return (
    <Link
      href={categoryHref(slug)}
      className="group mt-1 inline-flex min-h-11 items-center gap-1.5 font-heading text-sm font-semibold text-purple underline decoration-purple/40 underline-offset-4 hover:text-purple-hover hover:decoration-purple"
    >
      View all {getCategory(slug).name}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

function Heading({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h2 id={id} className="text-[clamp(1.375rem,1rem+1.4vw,2rem)] leading-tight font-semibold">
        {title}
      </h2>
      <p className="font-serif text-sm text-ink sm:text-base">{description}</p>
    </div>
  );
}

/** A horizontal product row for one collection. */
export function CollectionRow({
  id,
  title,
  description,
  slug,
  items = productsIn(slug),
}: {
  id: string;
  title: string;
  description: string;
  slug: CategorySlug;
  items?: Product[];
}) {
  return (
    <section aria-labelledby={id} className="container-page py-8 md:py-12">
      <ProductSlider
        products={items}
        label={title}
        header={<Heading id={id} title={title} description={description} />}
        footer={<ViewAll slug={slug} />}
      />
    </section>
  );
}

/**
 * The square "Trusted by Mothers" creative beside its collection on desktop; stacked above it on
 * phones and tablets, where a narrow side column would make the artwork unreadable.
 */
export function FeaturedCollection() {
  const { title, description, category, promo } = collectionFeature;
  return (
    <section aria-labelledby="collection-feature" className="bg-soft py-8 md:py-12">
      <div className="container-page grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-center lg:gap-10">
        <Link
          href={promo.href}
          aria-label={`${promo.cta}: ${promo.alt}`}
          className="group relative mx-auto block aspect-square w-full max-w-md overflow-hidden rounded-xl lg:max-w-none"
        >
          <Image
            src={promo.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 352px, (min-width: 480px) 448px, 100vw"
            className="object-cover transition-transform duration-500 ease-(--ease-soft) group-hover:scale-[1.02]"
          />
        </Link>
        <div className="min-w-0">
          <ProductSlider
            products={productsIn(category)}
            label={title}
            header={<Heading id="collection-feature" title={title} description={description} />}
            footer={<ViewAll slug={category} />}
          />
        </div>
      </div>
    </section>
  );
}
