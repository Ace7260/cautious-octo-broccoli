import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          compare_price: number | null
          category_id: string | null
          image: string | null
          stock_quantity: number
          in_stock: boolean
          is_featured: boolean
          is_active: boolean
          average_rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image: string
          order_index: number
          is_primary: boolean
          created_at: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar: string | null
          created_at: string
          updated_at: string
        }
      }
      wishlists: {
        Row: {
          id: string
          user_id: string
          name: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
      }
      wishlist_items: {
        Row: {
          id: string
          wishlist_id: string
          product_id: string
          created_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          title: string | null
          comment: string | null
          is_verified_purchase: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
