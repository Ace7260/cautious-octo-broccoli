'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface ProductVariant {
  id: number
  name: string
  color?: string
  size?: string
  material?: string
  price_adjustment: number
  final_price: number
  stock_quantity: number
  is_available: boolean
}

interface ProductVariantSelectorProps {
  variants: ProductVariant[]
  basePrice: number
  onVariantSelect?: (variant: ProductVariant | null) => void
}

export function ProductVariantSelector({ 
  variants, 
  basePrice, 
  onVariantSelect 
}: ProductVariantSelectorProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)

  // Grouper les variantes par type
  const colors = Array.from(new Set(variants.filter(v => v.color).map(v => v.color))).filter((color): color is string => color !== undefined)
  const sizes = Array.from(new Set(variants.filter(v => v.size).map(v => v.size))).filter((size): size is string => size !== undefined)
  const materials = Array.from(new Set(variants.filter(v => v.material).map(v => v.material))).filter((material): material is string => material !== undefined)

  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)

  // Trouver la variante correspondante
  const findMatchingVariant = (color?: string, size?: string, material?: string) => {
    return variants.find(v => 
      (color ? v.color === color : true) &&
      (size ? v.size === size : true) &&
      (material ? v.material === material : true)
    ) || null
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    const variant = findMatchingVariant(color, selectedSize || undefined, selectedMaterial || undefined)
    setSelectedVariant(variant)
    onVariantSelect?.(variant)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    const variant = findMatchingVariant(selectedColor || undefined, size, selectedMaterial || undefined)
    setSelectedVariant(variant)
    onVariantSelect?.(variant)
  }

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material)
    const variant = findMatchingVariant(selectedColor || undefined, selectedSize || undefined, material)
    setSelectedVariant(variant)
    onVariantSelect?.(variant)
  }

  const currentPrice = selectedVariant ? selectedVariant.final_price : basePrice

  return (
    <div className="space-y-6">
      {/* Sélection de couleur */}
      {colors.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">
              Couleur: {selectedColor && <span className="text-primary">{selectedColor}</span>}
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={selectedColor === color ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleColorSelect(color!)}
                className="relative"
              >
                {color}
                {selectedColor === color && (
                  <Check className="ml-2 h-4 w-4" />
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Sélection de taille */}
      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">
              Taille: {selectedSize && <span className="text-primary">{selectedSize}</span>}
            </label>
            <button className="text-xs text-primary hover:underline">
              Guide des tailles
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSizeSelect(size!)}
                className="min-w-[60px]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Sélection de matériau */}
      {materials.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium">
              Matériau: {selectedMaterial && <span className="text-primary">{selectedMaterial}</span>}
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <Button
                key={material}
                variant={selectedMaterial === material ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleMaterialSelect(material!)}
              >
                {material}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Informations sur la variante sélectionnée */}
      {selectedVariant && (
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">
                {selectedVariant.name}
              </div>
              {selectedVariant.stock_quantity > 0 ? (
                <div className="text-sm text-green-600 font-medium">
                  ✓ En stock ({selectedVariant.stock_quantity} disponibles)
                </div>
              ) : (
                <div className="text-sm text-red-600 font-medium">
                  Rupture de stock
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {currentPrice.toFixed(2)}€
              </div>
              {selectedVariant.price_adjustment !== 0 && (
                <div className="text-xs text-muted-foreground">
                  {selectedVariant.price_adjustment > 0 ? '+' : ''}
                  {selectedVariant.price_adjustment.toFixed(2)}€
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
