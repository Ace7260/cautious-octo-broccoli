'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'

interface AddToCartButtonProps {
  productId: number
  variantId?: number
  className?: string
}

export function AddToCartButton({ productId, variantId, className }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    
    // TODO: Intégrer avec l'API du panier
    await new Promise(resolve => setTimeout(resolve, 800))
    
    setIsAdding(false)
    setIsAdded(true)
    
    // Réinitialiser après 2 secondes
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding || isAdded}
      className={className}
    >
      {isAdding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Ajout...
        </>
      ) : isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Ajouté !
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </>
      )}
    </Button>
  )
}
