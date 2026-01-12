import { supabase } from './supabase'

// ============================================
// CATEGORIES
// ============================================

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return data
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) throw error
  return data
}

// ============================================
// PRODUCTS
// ============================================

export async function getProducts(params?: {
  category?: string
  search?: string
  featured?: boolean
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug)
    `)
    .eq('is_active', true)

  if (params?.category) {
    query = query.eq('category_id', params.category)
  }

  if (params?.search) {
    query = query.ilike('name', `%${params.search}%`)
  }

  if (params?.featured) {
    query = query.eq('is_featured', true)
  }

  if (params?.limit) {
    query = query.limit(params.limit)
  }

  if (params?.offset) {
    query = query.range(params.offset, params.offset + (params.limit || 10) - 1)
  }

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) throw error

  // Transform data to match Product interface
  return data.map((item: any) => ({
    ...item,
    category_name: item.category?.name,
    discount_percentage: item.compare_price 
      ? Math.round(((item.compare_price - item.price) / item.compare_price) * 100)
      : 0,
    is_low_stock: item.stock_quantity > 0 && item.stock_quantity <= 10,
  }))
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, slug),
      product_images(id, image, order_index, is_primary),
      reviews(id, rating, title, comment, created_at, user_id, profiles(username))
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) throw error

  return {
    ...data,
    category_name: data.category?.name,
    images: data.product_images || [],
    discount_percentage: data.compare_price 
      ? Math.round(((data.compare_price - data.price) / data.compare_price) * 100)
      : 0,
    is_low_stock: data.stock_quantity > 0 && data.stock_quantity <= 10,
  }
}

export async function getFeaturedProducts(limit = 8) {
  return getProducts({ featured: true, limit })
}

// ============================================
// AUTHENTICATION
// ============================================

export async function signUp(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error

  if (!user) return null

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    ...user,
    ...profile,
  }
}

export async function updateProfile(updates: {
  username?: string
  first_name?: string
  last_name?: string
  phone?: string
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

// ============================================
// WISHLIST
// ============================================

export async function getDefaultWishlist() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      *,
      wishlist_items(
        id,
        created_at,
        product:products(*)
      )
    `)
    .eq('user_id', user.id)
    .eq('is_default', true)
    .single()

  if (error) {
    // Create default wishlist if it doesn't exist
    const { data: newWishlist, error: createError } = await supabase
      .from('wishlists')
      .insert({ user_id: user.id, name: 'Ma wishlist', is_default: true })
      .select(`
        *,
        wishlist_items(
          id,
          created_at,
          product:products(*)
        )
      `)
      .single()

    if (createError) throw createError
    return { ...newWishlist, items: [] }
  }

  return {
    ...data,
    items: data.wishlist_items || [],
  }
}

export async function addToWishlist(productId: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Get default wishlist
  const wishlist = await getDefaultWishlist()

  const { data, error } = await supabase
    .from('wishlist_items')
    .insert({
      wishlist_id: wishlist.id,
      product_id: productId,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeFromWishlist(wishlistItemId: string) {
  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', wishlistItemId)

  if (error) throw error
}

export async function isInWishlist(productId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  try {
    const wishlist = await getDefaultWishlist()
    return wishlist.items.some((item: any) => item.product.id === productId)
  } catch {
    return false
  }
}

// ============================================
// REVIEWS
// ============================================

export async function getProductReviews(productId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profile:profiles(username, avatar)
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createReview(review: {
  product_id: string
  rating: number
  title?: string
  comment?: string
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      ...review,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ============================================
// STORAGE
// ============================================

export function getImageUrl(path: string | null, bucket: string = 'product-images'): string {
  if (!path) return '/placeholder.png'
  
  if (path.startsWith('http')) return path
  
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

export async function uploadImage(file: File, path: string, bucket: string = 'product-images') {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error
  return data
}
