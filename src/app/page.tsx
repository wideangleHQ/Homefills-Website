import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { WhyHomefills } from "@/components/home/why-homefills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyHomefills />
      <Testimonials />
      <FinalCta />
    </>
  );
}
