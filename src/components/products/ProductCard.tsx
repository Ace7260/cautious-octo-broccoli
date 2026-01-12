'use client'

import { Link } from '@/navigation'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SafeImage } from '@/components/ui/safe-image'
import { Product } from '@/lib/api'
import { formatPrice } from '@/lib/utils'
import { getProductImageUrl } from '@/lib/image-utils'
import { ProductRating } from './ProductRating'
import { WishlistButton } from '@/components/wishlist/WishlistButton'
import { ProductBadge } from './ProductBadge'
import { useTranslations } from 'next-intl'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products')
  const imageUrl = getProductImageUrl(product.image)

  const averageRating = product.average_rating
  const reviewCount = product.review_count || 0
  const discountPercentage = product.discount_percentage || 0
  const isLowStock = product.is_low_stock || false

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg relative">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <SafeImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            {discountPercentage > 0 && (
              <ProductBadge type="discount" value={discountPercentage} />
            )}
            {product.is_featured && <ProductBadge type="featured" />}
            {isLowStock && <ProductBadge type="low-stock" />}
          </div>
          
          {/* Bouton Wishlist */}
          <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <WishlistButton 
              productId={Number(product.id)} 
              variant="ghost" 
              size="icon" 
              showText={false}
            />
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {product.category_name && (
          <p className="text-sm text-muted-foreground mb-2">
            {product.category_name}
          </p>
        )}
        
        {/* Rating */}
        {reviewCount > 0 && (
          <div className="mb-2">
            <ProductRating rating={averageRating || 0} reviewCount={reviewCount} size="sm" />
          </div>
        )}
        
        {/* Prix */}
        <div className="flex items-baseline gap-2">
          <p className="text-xl font-bold">
            {formatPrice(product.price)}
          </p>
          {product.compare_price && product.compare_price > product.price && (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compare_price)}
            </p>
          )}
        </div>
        
        {/* Stock */}
        {!product.in_stock && (
          <p className="text-sm text-red-600 font-medium mt-1">
            {t('outOfStock')}
          </p>
        )}
        {isLowStock && product.in_stock && (
          <p className="text-sm text-orange-600 font-medium mt-1">
            {t('lowStock', { count: product.stock_quantity || 0 })}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/products/${product.slug}`} className="flex-1">
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors">
            {t('viewProduct')}
          </button>
        </Link>
        <WishlistButton 
          productId={product.id ? Number(product.id) : 0} 
          variant="outline" 
          size="default"
          showText={false}
        />
      </CardFooter>
    </Card>
  )
}
