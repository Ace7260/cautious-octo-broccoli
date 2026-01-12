'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/navigation'
import { Link } from '@/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { SafeImage } from '@/components/ui/safe-image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login?redirect=/cart')
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Panier vide pour l'instant
  const isEmpty = cartItems.length === 0

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <ShoppingCart className="h-8 w-8" />
        Mon Panier
      </h1>

      {isEmpty ? (
        <Card className="p-12 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Votre panier est vide</h2>
          <p className="text-muted-foreground mb-6">
            Ajoutez des produits pour commencer vos achats
          </p>
          <Button asChild>
            <Link href="/products">
              Découvrir nos produits
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  {/* Contenu du panier */}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Résumé */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Résumé</h2>
                {/* Résumé commande */}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
