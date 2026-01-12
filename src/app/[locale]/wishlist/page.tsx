'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/navigation'
import { Link } from '@/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from 'next-intl'
import { SafeImage } from '@/components/ui/safe-image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { getDefaultWishlist, removeFromWishlist } from '@/lib/api'

interface WishlistItem {
  id: number
  product: {
    id: number
    name: string
    slug: string
    price: string
    image: string
    in_stock: boolean
  }
  added_at: string
}

export default function WishlistPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const t = useTranslations('wishlist')
  const tProducts = useTranslations('products')
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistId, setWishlistId] = useState<number | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/wishlist')
    }
  }, [authLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist()
    }
  }, [isAuthenticated])

  const loadWishlist = async () => {
    try {
      const wishlist = await getDefaultWishlist()
      setWishlistId(Number(wishlist.id))
      const items = (wishlist.items || []).map((item: any) => ({
        ...item,
        id: Number(item.id),
        product: {
          ...item.product,
          id: Number(item.product.id)
        }
      }))
      setWishlistItems(items)
    } catch (error) {
      console.error('Erreur lors du chargement de la wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (itemId: number) => {
    if (!wishlistId) return
    
    try {
      await removeFromWishlist(wishlistId, itemId)
      setWishlistItems(items => items.filter(item => item.id !== itemId))
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const itemCount = wishlistItems.length

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="h-8 w-8 text-primary fill-primary" />
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t(itemCount === 1 ? 'itemCount' : 'itemCount_plural', { count: itemCount })}
        </p>
      </div>

      {itemCount === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{t('empty')}</h2>
          <p className="text-muted-foreground mb-6">
            {t('emptyDescription')}
          </p>
          <Button asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {t('discoverProducts')}
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group overflow-hidden">
              <Link href={`/products/${item.product.slug}`}>
                <div className="relative aspect-square bg-gray-100">
                  <SafeImage
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {!item.product.in_stock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold">
                        {tProducts('outOfStock')}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              
              <CardContent className="p-4">
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold mb-4">
                  {formatPrice(parseFloat(item.product.price))}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t('remove')}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    asChild
                    disabled={!item.product.in_stock}
                  >
                    <Link href={`/products/${item.product.slug}`}>
                      {tProducts('viewProduct')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
