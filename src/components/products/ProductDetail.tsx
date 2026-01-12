'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SafeImage } from '@/components/ui/safe-image'
import { getProduct, Product } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatPrice } from '@/lib/utils'
import { getWhatsAppLink, WHATSAPP_NUMBER } from '@/lib/whatsapp'
import { getAllProductImages } from '@/lib/image-utils'
import { MessageCircle, ArrowLeft, Package, Shield, Truck, RotateCcw } from 'lucide-react'
import { ProductRating } from './ProductRating'
import { WishlistButton } from '@/components/wishlist/WishlistButton'
import { ProductVariantSelector } from './ProductVariantSelector'
import { ReviewSection } from './ReviewSection'
import { ProductBadge } from './ProductBadge'
import { ImageZoom } from './ImageZoom'

interface ProductDetailProps {
  slug: string
}

export function ProductDetail({ slug }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProduct(slug)
        setProduct(data)
      } catch (error) {
        console.error('Erreur lors du chargement du produit:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
        <Button asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux produits
          </Link>
        </Button>
      </div>
    )
  }

  const normalizedImages = getAllProductImages(product)

  const handleWhatsAppClick = () => {
    const message = product.whatsapp_message || 
      `Bonjour, je suis intéressé par le produit: ${product.name} - Prix: ${formatPrice(product.price)}`
    const link = getWhatsAppLink(WHATSAPP_NUMBER, message)
    window.open(link, '_blank')
  }

  const averageRating = product.average_rating || 0
  const reviewCount = product.review_count || 0
  const discountPercentage = product.discount_percentage || 0
  const currentPrice = selectedVariant ? selectedVariant.final_price : parseFloat(product.price)
  const hasVariants = product.variants && product.variants.length > 0

  return (
    <div>
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux produits
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Images avec zoom */}
        <ImageZoom 
          images={normalizedImages}
          productName={product.name}
          initialIndex={0}
        />

        {/* Informations */}
        <div className="space-y-6">
          {/* En-tête */}
          <div>
            {product.category && (
              <Link 
                href={`/products?category=${product.category.id}`}
                className="text-sm text-primary hover:underline"
              >
                {product.category.name}
              </Link>
            )}
            {product.brand && (
              <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          
          {/* Rating */}
          {reviewCount > 0 && (
            <div className="flex items-center gap-4">
              <ProductRating rating={averageRating} reviewCount={reviewCount} size="lg" />
              <span className="text-sm text-muted-foreground">
                ({product.sales_count || 0} ventes)
              </span>
            </div>
          )}
          
          {/* Prix et Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold">{formatPrice(currentPrice)}</p>
              {product.compare_price && product.compare_price > product.price && (
                <p className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compare_price)}
                </p>
              )}
            </div>
            
            <div className="flex gap-2">
              {discountPercentage > 0 && <ProductBadge type="discount" value={discountPercentage} />}
              {product.is_featured && <ProductBadge type="featured" />}
            </div>
          </div>

          {/* Variantes */}
          {hasVariants && (
            <ProductVariantSelector
              variants={product.variants}
              basePrice={parseFloat(product.price)}
              onVariantSelect={setSelectedVariant}
            />
          )}

          {/* Description courte */}
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantité */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Quantité:</label>
            <div className="flex items-center border rounded-md">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-muted transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x min-w-[60px] text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-muted transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            {product.in_stock ? (
              <>
                <Button 
                  size="lg" 
                  className="w-full h-12 text-lg"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Commander via WhatsApp
                </Button>
                <WishlistButton 
                  productId={product.id}
                  size="lg"
                  variant="outline"
                  className="w-full"
                />
              </>
            ) : (
              <Button size="lg" className="w-full" disabled>
                Produit indisponible
              </Button>
            )}
          </div>

          {/* Informations complémentaires */}
          <Card className="p-6 bg-muted/50">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Livraison rapide</p>
                  <p className="text-xs text-muted-foreground">2-5 jours ouvrés</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Retours gratuits</p>
                  <p className="text-xs text-muted-foreground">Sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">Paiement sécurisé</p>
                  <p className="text-xs text-muted-foreground">100% sécurisé</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">
                    {product.in_stock ? 'En stock' : 'Rupture de stock'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {product.stock_quantity > 0 ? `${product.stock_quantity} disponibles` : 'Réappro. en cours'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* SKU et autres infos */}
          {(product.sku || product.weight) && (
            <div className="text-xs text-muted-foreground space-y-1">
              {product.sku && <p>SKU: {product.sku}</p>}
              {product.weight && <p>Poids: {product.weight} kg</p>}
            </div>
          )}
        </div>
      </div>

      {/* Onglets détails et avis */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Avis ({reviewCount})</TabsTrigger>
          <TabsTrigger value="shipping">Livraison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <div className="p-6 prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <ReviewSection 
            reviews={product.reviews || []}
            averageRating={averageRating}
            reviewCount={reviewCount}
          />
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-6">
          <Card>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Délais de livraison</h3>
                <p className="text-sm text-muted-foreground">
                  Livraison standard : 2-5 jours ouvrés<br />
                  Livraison express : 24-48h
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Frais de port</h3>
                <p className="text-sm text-muted-foreground">
                  Gratuit dès 50€ d'achat<br />
                  Sinon 4,90€ en France métropolitaine
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Retours</h3>
                <p className="text-sm text-muted-foreground">
                  Retours gratuits sous 30 jours<br />
                  Produit dans son emballage d'origine
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
