'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { getDefaultWishlist, addToWishlist, removeFromWishlist } from '@/lib/api'

interface WishlistButtonProps {
  productId: number
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showText?: boolean
  className?: string
}

export function WishlistButton({ 
  productId, 
  variant = 'default',
  size = 'default',
  showText = true,
  className 
}: WishlistButtonProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [loading, setLoading] = useState(false)
  const [wishlistId, setWishlistId] = useState<number | null>(null)

  const checkWishlistStatus = useCallback(async () => {
    try {
      const wishlist = await getDefaultWishlist()
      setWishlistId(Number(wishlist.id))
      const items = wishlist.items || []
      setIsInWishlist(items.some((item) => Number(item.product.id) === productId))
    } catch (error) {
      console.error('Erreur lors de la vérification de la wishlist:', error)
    }
  }, [productId])

  useEffect(() => {
    let isMounted = true

    if (isAuthenticated && isMounted) {
      checkWishlistStatus()
    }

    return () => {
      isMounted = false
    }
  }, [isAuthenticated, checkWishlistStatus])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    setLoading(true)
    
    try {
      // Si on n'a pas encore le wishlistId, le récupérer
      let currentWishlistId = wishlistId
      if (!currentWishlistId) {
        const wishlist = await getDefaultWishlist()
        currentWishlistId = Number(wishlist.id)
        setWishlistId(currentWishlistId)
      }
      
      if (isInWishlist) {
        // Trouver l'item ID et le retirer
        const wishlist = await getDefaultWishlist()
        const items = wishlist.items || []
        const item = items.find((i) => i.product.id === productId)
        
        if (item && currentWishlistId) {
          await removeFromWishlist(currentWishlistId, item.id)
          setIsInWishlist(false)
        }
      } else {
        // Ajouter à la wishlist
        if (currentWishlistId) {
          await addToWishlist(currentWishlistId, productId)
          setIsInWishlist(true)
        }
      }
    } catch (error: any) {
      console.error('Erreur wishlist:', error.response?.data || error)
      // Si l'utilisateur n'est plus authentifié, le rediriger
      if (error.response?.status === 401) {
        router.push('/auth/login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={loading}
      className={cn(className)}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-all",
          showText && "mr-2",
          isInWishlist && "fill-red-500 text-red-500",
          loading && "animate-pulse"
        )} 
      />
      {showText && (isInWishlist ? 'Dans la wishlist' : 'Ajouter à la wishlist')}
    </Button>
  )
}
