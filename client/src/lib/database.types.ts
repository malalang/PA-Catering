export type Json = any

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          display_name: string | null
          full_name: string | null
          phone: string | null
          role: string | null
          metadata: Json | null
          created_at: string
          uid: string | null
          email_verified: boolean | null
          photo_url: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          country: string | null
          theme: string | null
          order_history: Json | null
          loyalty_points_balance: number | null
          tier_status: string | null
          rewards_available: Json | null
          yellowemption_history: Json | null
          personalized_promotions: Json | null
          referral_code: string | null
          car_wash_count: number | null
          preferences: Json | null
          saved_payment_methods: Json | null
          updated_at: string | null
          last_login: string | null
        }
        Insert: {
          id?: string
          email?: string | null
          display_name?: string | null
          full_name?: string | null
          phone?: string | null
          role?: string | null
          metadata?: Json | null
          created_at?: string
          uid?: string | null
          email_verified?: boolean | null
          photo_url?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          theme?: string | null
          order_history?: Json | null
          loyalty_points_balance?: number | null
          tier_status?: string | null
          rewards_available?: Json | null
          yellowemption_history?: Json | null
          personalized_promotions?: Json | null
          referral_code?: string | null
          car_wash_count?: number | null
          preferences?: Json | null
          saved_payment_methods?: Json | null
          updated_at?: string | null
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          display_name?: string | null
          full_name?: string | null
          phone?: string | null
          role?: string | null
          metadata?: Json | null
          created_at?: string
          uid?: string | null
          email_verified?: boolean | null
          photo_url?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          theme?: string | null
          order_history?: Json | null
          loyalty_points_balance?: number | null
          tier_status?: string | null
          rewards_available?: Json | null
          yellowemption_history?: Json | null
          personalized_promotions?: Json | null
          referral_code?: string | null
          car_wash_count?: number | null
          preferences?: Json | null
          saved_payment_methods?: Json | null
          updated_at?: string | null
          last_login?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string | null
          description: string | null
          price: number | null
          category: string | null
          image_url: string | null
          stock: number | null
          likes: number | null
          liked_by: Json | null
          badge: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          description?: string | null
          price?: number | null
          category?: string | null
          image_url?: string | null
          stock?: number | null
          likes?: number | null
          liked_by?: Json | null
          badge?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          description?: string | null
          price?: number | null
          category?: string | null
          image_url?: string | null
          stock?: number | null
          likes?: number | null
          liked_by?: Json | null
          badge?: string | null
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          product_id: string | null
          user_id: string | null
          user_name: string | null
          body: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          user_id?: string | null
          user_name?: string | null
          body: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          user_id?: string | null
          user_name?: string | null
          body?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          items: Json
          total_price: number
          total_quantity: number
          status: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          items: Json
          total_price: number
          total_quantity: number
          status?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          items?: Json
          total_price?: number
          total_quantity?: number
          status?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      user_favorites: {
        Row: {
          user_id: string
          product_id: string
          created_at: string | null
        }
        Insert: {
          user_id: string
          product_id: string
          created_at?: string | null
        }
        Update: {
          user_id?: string
          product_id?: string
          created_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
