'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCategories, Category } from '@/lib/api'
import { SafeImage } from '@/components/ui/safe-image'
import { Card } from '@/components/ui/card'

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories()
        // Vérifier que data est un tableau
        if (Array.isArray(data)) {
          setCategories(data)
        } else if (data && typeof data === 'object' && Array.isArray(data.results)) {
          // Si l'API retourne {results: [...]}
          setCategories(data.results)
        } else {
          console.warn('Format de données inattendu:', data)
          setCategories([])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  if (loading) {
    return null
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Parcourir par catégorie
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                <div className="relative aspect-square bg-gray-100">
                  <SafeImage
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.product_count || 0} produits
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
