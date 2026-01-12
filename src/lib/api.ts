import axios from 'axios'
import * as SupabaseAPI from './supabase-api'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

// Détection automatique du backend à utiliser
const USE_SUPABASE = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

console.log('🔧 Backend:', USE_SUPABASE ? 'Supabase' : 'Django')

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Types
export interface Category {
  id: number | string
  name: string
  slug: string
  description: string
  image: string | null
  product_count?: number
}

export interface Product {
  id: number | string
  name: string
  slug: string
  category_name?: string
  category?: Category
  description: string
  price: string | number
  compare_price?: string | number | null
  image: string
  image_2?: string | null
  image_3?: string | null
  is_featured: boolean
  in_stock: boolean
  stock_quantity?: number
  brand?: string
  sku?: string
  average_rating?: number
  review_count?: number
  discount_percentage?: number
  is_low_stock?: boolean
  views_count?: number
  sales_count?: number
  wishlist_count?: number
  is_in_wishlist?: boolean
  all_images?: string[]
  whatsapp_message?: string
  created_at: string
  updated_at?: string
}

// ==================== CATEGORIES ====================

export const getCategories = async (): Promise<Category[]> => {
  if (USE_SUPABASE) {
    const data = await SupabaseAPI.getCategories()
    return data.map((cat: any) => ({
      ...cat,
      id: cat.id,
      product_count: 0
    }))
  }
  const response = await api.get('/products/categories/')
  return response.data
}

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  if (USE_SUPABASE) {
    return SupabaseAPI.getCategoryBySlug(slug)
  }
  const response = await api.get(`/products/categories/${slug}/`)
  return response.data
}

// ==================== PRODUCTS ====================

export const getProducts = async (params?: {
  category?: number | string
  is_featured?: boolean
  search?: string
  limit?: number
  offset?: number
}): Promise<Product[]> => {
  if (USE_SUPABASE) {
    const data = await SupabaseAPI.getProducts(params)
    return data.map((product: any) => ({
      ...product,
      price: product.price.toString(),
      compare_price: product.compare_price?.toString(),
    }))
  }
  const response = await api.get('/products/products/', { params })
  return response.data.results || response.data
}

export const getProduct = async (slug: string): Promise<Product> => {
  if (USE_SUPABASE) {
    const data = await SupabaseAPI.getProductBySlug(slug)
    return {
      ...data,
      price: data.price.toString(),
      compare_price: data.compare_price?.toString(),
    }
  }
  const response = await api.get(`/products/products/${slug}/`)
  return response.data
}

export const getFeaturedProducts = async (limit?: number): Promise<Product[]> => {
  if (USE_SUPABASE) {
    const data = await SupabaseAPI.getFeaturedProducts(limit)
    return data.map((product: any) => ({
      ...product,
      price: product.price.toString(),
      compare_price: product.compare_price?.toString(),
    }))
  }
  const response = await api.get('/products/products/featured/')
  return response.data
}

export const getProductsByCategory = async (): Promise<{
  category: Category
  products: Product[]
}[]> => {
  if (USE_SUPABASE) {
    // Pour Supabase, on récupère les catégories et les produits séparément
    const categories = await getCategories()
    const allProducts = await getProducts()
    
    return categories.map(category => ({
      category,
      products: allProducts.filter(p => p.category_name === category.name).slice(0, 4)
    })).filter(item => item.products.length > 0)
  }
  const response = await api.get('/products/products/by_category/')
  return response.data
}

// ==================== AUTH ====================

export interface AuthResponse {
  user: User
  access: string
  refresh: string
  message?: string
}

export interface User {
  id: number | string
  username: string
  email: string
  first_name?: string
  last_name?: string
  profile?: {
    phone?: string
    avatar?: string
    total_orders?: number
    total_spent?: string
  }
}

export const register = async (username: string, email: string, password: string, password2: string): Promise<AuthResponse> => {
  if (USE_SUPABASE) {
    // Supabase gère l'auth différemment - voir SupabaseAuthContext
    throw new Error('Use SupabaseAuthContext for authentication')
  }
  const response = await api.post('/users/register/', {
    username,
    email,
    password,
    password2
  })
  return response.data
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  if (USE_SUPABASE) {
    // Supabase gère l'auth différemment - voir SupabaseAuthContext
    throw new Error('Use SupabaseAuthContext for authentication')
  }
  const response = await api.post('/users/login/', {
    username,
    password
  })
  return response.data
}

export const logout = async (refreshToken: string): Promise<void> => {
  if (USE_SUPABASE) {
    return SupabaseAPI.signOut()
  }
  await api.post('/users/logout/', { refresh: refreshToken })
}

export const getCurrentUser = async (): Promise<User> => {
  if (USE_SUPABASE) {
    return SupabaseAPI.getCurrentUser()
  }
  const response = await api.get('/users/profile/me/')
  return response.data
}

// ==================== WISHLIST ====================

export interface WishlistItem {
  id: number | string
  product: Product
  variant?: any
  notes?: string
  added_at?: string
  created_at?: string
}

export interface Wishlist {
  id: number | string
  name: string
  is_public?: boolean
  is_default?: boolean
  items: WishlistItem[]
  items_count?: number
  created_at: string
  updated_at?: string
}

export const getDefaultWishlist = async (): Promise<Wishlist> => {
  if (USE_SUPABASE) {
    const data = await SupabaseAPI.getDefaultWishlist()
    return {
      ...data,
      is_public: false,
      items_count: data.items?.length || 0
    }
  }
  const response = await api.get('/products/wishlists/default/')
  return response.data
}

export const addToWishlist = async (wishlistId: number | string, productId: number | string, variantId?: number): Promise<WishlistItem> => {
  if (USE_SUPABASE) {
    return SupabaseAPI.addToWishlist(productId.toString())
  }
  const response = await api.post(`/products/wishlists/${wishlistId}/add_item/`, {
    product_id: productId,
    variant_id: variantId
  })
  return response.data
}

export const removeFromWishlist = async (wishlistId: number | string, itemId: number | string): Promise<void> => {
  if (USE_SUPABASE) {
    return SupabaseAPI.removeFromWishlist(itemId.toString())
  }
  await api.delete(`/products/wishlists/${wishlistId}/remove_item/`, {
    data: { item_id: itemId }
  })
}

// ==================== CART ====================

export interface CartItem {
  id: number | string
  product: Product
  variant?: any
  quantity: number
  unit_price: string
  total_price: string
}

export interface Cart {
  id: number | string
  items: CartItem[]
  total_items: number
  subtotal: string
}

export const getCurrentCart = async (): Promise<Cart> => {
  if (USE_SUPABASE) {
    // TODO: Implémenter cart avec Supabase
    return {
      id: '1',
      items: [],
      total_items: 0,
      subtotal: '0'
    }
  }
  const response = await api.get('/products/cart/current/')
  return response.data
}

export const addToCart = async (productId: number | string, quantity: number = 1, variantId?: number): Promise<Cart> => {
  if (USE_SUPABASE) {
    // TODO: Implémenter cart avec Supabase
    throw new Error('Cart not yet implemented for Supabase')
  }
  const response = await api.post('/products/cart/add_item/', {
    product_id: productId,
    quantity,
    variant_id: variantId
  })
  return response.data
}

export const updateCartItem = async (itemId: number | string, quantity: number): Promise<Cart> => {
  if (USE_SUPABASE) {
    // TODO: Implémenter cart avec Supabase
    throw new Error('Cart not yet implemented for Supabase')
  }
  const response = await api.patch('/products/cart/update_item/', {
    item_id: itemId,
    quantity
  })
  return response.data
}

export const removeFromCart = async (itemId: number | string): Promise<Cart> => {
  if (USE_SUPABASE) {
    // TODO: Implémenter cart avec Supabase
    throw new Error('Cart not yet implemented for Supabase')
  }
  const response = await api.delete('/products/cart/remove_item/', {
    data: { item_id: itemId }
  })
  return response.data
}

export const clearCart = async (): Promise<void> => {
  if (USE_SUPABASE) {
    // TODO: Implémenter cart avec Supabase
    return
  }
  await api.post('/products/cart/clear/')
}
