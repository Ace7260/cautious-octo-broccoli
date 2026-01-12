'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from './ProductCard'
import { getProducts, getCategories, Product, Category } from '@/lib/api'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ])
        
        // Vérifier et extraire les produits
        if (Array.isArray(productsData)) {
          setProducts(productsData)
        } else if (productsData && typeof productsData === 'object' && 'results' in productsData && Array.isArray((productsData as any).results)) {
          setProducts((productsData as any).results)
        } else {
          console.warn('Format de produits inattendu:', productsData)
          setProducts([])
        }
        
        // Vérifier et extraire les catégories
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData)
        } else if (categoriesData && typeof categoriesData === 'object' && 'results' in categoriesData && Array.isArray((categoriesData as any).results)) {
          setCategories((categoriesData as any).results)
        } else {
          console.warn('Format de catégories inattendu:', categoriesData)
          setCategories([])
        }
      } catch (error) {
  
        setProducts([])
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const params: any = {}
        if (selectedCategory) params.category = selectedCategory
        if (searchQuery) params.search = searchQuery
        
        const data = await getProducts(params)
        
        // Vérifier et extraire les produits
        if (Array.isArray(data)) {
          setProducts(data)
        } else if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
          setProducts((data as any).results)
        } else {
          console.warn('Format de données inattendu:', data)
          setProducts([])
        }
      } catch (error) {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(loadProducts, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, selectedCategory])

  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="all" onValueChange={(value) => {
          setSelectedCategory(value === 'all' ? null : parseInt(value))
        }}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            {Array.isArray(categories) && categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id.toString()}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">Aucun produit trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
