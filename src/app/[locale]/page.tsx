import { Hero } from "@/components/home/Hero"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { ProductsByCategory } from "@/components/home/ProductsByCategory"
import { CallToAction } from "@/components/home/CallToAction"
import { Partners } from "@/components/home/Partners"
import { Testimonials } from "@/components/home/Testimonials"
import { Newsletter } from "@/components/home/Newsletter"

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsByCategory />
      <FeaturedProducts />
      <CallToAction />
      <CategoryGrid />
      <Partners />
      <Testimonials />
      <Newsletter />
    </>
  )
}
