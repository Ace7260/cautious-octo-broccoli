import { ProductDetail } from '@/components/products/ProductDetail'

interface ProductPageProps {
  params: {
    slug: string
    locale: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail slug={params.slug} />
    </div>
  )
}
