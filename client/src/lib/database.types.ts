export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
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
        }
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
  }
}
