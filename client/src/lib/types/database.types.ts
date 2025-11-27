export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          display_name: string | null
          phone: string | null
          metadata: Json | null
          created_at: string
          role: string | null
          uid: string | null
          email_verified: boolean | null
          photo_url: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          country: string | null
          theme: string | null
          tier_status: string | null
          referral_code: string | null
          preferences: Json | null
          saved_payment_methods: Json | null
          updated_at: string | null
          last_login: string | null
        }
        Insert: {
          id?: string
          email?: string | null
          display_name?: string | null
          phone?: string | null
          metadata?: Json | null
          created_at?: string
          role?: string | null
          uid?: string | null
          email_verified?: boolean | null
          photo_url?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          theme?: string | null
          tier_status?: string | null
          referral_code?: string | null
          preferences?: Json | null
          saved_payment_methods?: Json | null
          updated_at?: string | null
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string | null
          display_name?: string | null
          phone?: string | null
          metadata?: Json | null
          created_at?: string
          role?: string | null
          uid?: string | null
          email_verified?: boolean | null
          photo_url?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          theme?: string | null
          tier_status?: string | null
          referral_code?: string | null
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
          category_name: string | null
          image_url: string | null
          stock: number | null
          likes: string[] | null
          badge: string | null
          created_at: string
          is_hidden: boolean | null
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          description?: string | null
          price?: number | null
          category_name?: string | null
          image_url?: string | null
          stock?: number | null
          likes?: string[] | null
          badge?: string | null
          created_at?: string
          is_hidden?: boolean | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          description?: string | null
          price?: number | null
          category_name?: string | null
          image_url?: string | null
          stock?: number | null
          likes?: string[] | null
          badge?: string | null
          created_at?: string
          is_hidden?: boolean | null
        }
      }
      products_category: {
        Row: {
          id: string
          category_name: string
          image: string | null
          description: string | null
          created_at: string
          is_hidden: boolean | null
        }
        Insert: {
          id?: string
          category_name: string
          image?: string | null
          description?: string | null
          created_at?: string
          is_hidden?: boolean | null
        }
        Update: {
          id?: string
          category_name?: string
          image?: string | null
          description?: string | null
          created_at?: string
          is_hidden?: boolean | null
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
      testimonials: {
        Row: {
          id: string
          text: string
          author: string
          rating: number
          likes: string[] | null
          comments: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          text: string
          author: string
          rating?: number
          likes?: string[] | null
          comments?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          text?: string
          author?: string
          rating?: number
          likes?: string[] | null
          comments?: Json | null
          created_at?: string
        }
      }
      featured_items: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string | null
          likes: string[] | null
          comments: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image_url?: string | null
          likes?: string[] | null
          comments?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image_url?: string | null
          likes?: string[] | null
          comments?: Json | null
          created_at?: string
        }
      }
      contact: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          created_at?: string
        }
      }
      photo_boot_bookings: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          date: string
          time: string
          package: string
          people: number
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          date: string
          time: string
          package: string
          people: number
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          date?: string
          time?: string
          package?: string
          people?: number
          message?: string | null
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
