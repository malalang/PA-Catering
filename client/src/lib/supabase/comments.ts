import { createClient } from './client';

const supabaseBrowser = createClient();

export const getCommentsForProduct = async (productId: string) => {
  const { data, error } = await supabaseBrowser
    .from('comments')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addComment = async (productId: string, userId: string | null, userName: string | null, body: string) => {
  const { data, error } = await supabaseBrowser
    .from('comments')
    // @ts-ignore - Supabase type inference issue with Database types
    .insert([{ product_id: productId, user_id: userId, user_name: userName, body }])
    .select()
    .single();
  if (error) throw error;
  return data;
};
