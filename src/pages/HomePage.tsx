import { Hero } from "../components/home/Hero";
import { BrandStrip } from "../components/home/BrandStrip";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { ServicesSection } from "../components/home/ServicesSection";
import { PromoBanner } from "../components/home/PromoBanner";
import { Testimonials } from "../components/home/Testimonials";

export function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <ServicesSection limit={3} />
      <PromoBanner />
      <Testimonials />
    </>
  );
}
