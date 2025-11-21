import { createClient } from '@/lib/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  created_at: string;
}

export const getProducts = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return (data as Product[]) || [];
};

export const getProductsByCategory = async (category: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return (data as Product[]) || [];
};

export const getProductById = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return (data as Product) || null;
};
