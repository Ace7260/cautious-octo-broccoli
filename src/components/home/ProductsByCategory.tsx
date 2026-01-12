'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/products/ProductCard'
import { getProductsByCategory, Product, Category } from '@/lib/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CategoryProducts {
  category: Category
  products: Product[]
}

export function ProductsByCategory() {
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProductsByCategory()
        // Vérifier que data est un tableau
        if (Array.isArray(data)) {
          setCategoryProducts(data)
        } else if (data && typeof data === 'object' && Array.isArray(data.results)) {
          setCategoryProducts(data.results)
        } else {
          console.warn('Format de données inattendu:', data)
          setCategoryProducts([])
        }
      } catch (error) {
        console.error('Erreur lors du chargement des produits par catégorie:', error)
        setCategoryProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return null
  }

  if (!Array.isArray(categoryProducts) || categoryProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Nos collections</h2>
        
        <Tabs defaultValue={categoryProducts[0]?.category.slug} className="w-full">
          <TabsList className="mb-8">
            {categoryProducts.map(({ category }) => (
              <TabsTrigger key={category.slug} value={category.slug}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categoryProducts.map(({ category, products }) => (
            <TabsContent key={category.slug} value={category.slug}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
