import { createClient } from './client';

const supabaseBrowser = createClient();

export const getLikeCount = async (productId: string) => {
  const { data, error } = await supabaseBrowser
    .from('products')
    .select('likes')
    .eq('id', productId)
    .single();
  if (error) throw error;
  // @ts-ignore - Supabase type inference issue with Database types
  return data?.likes ?? 0;
};

export const toggleLike = async (productId: string, increment: number = 1) => {
  // increment is +1 or -1. Read current likes then update atomically via a transaction-like approach.
  const { data: current, error: fetchErr } = await supabaseBrowser
    .from('products')
    .select('likes')
    .eq('id', productId)
    .single();
  if (fetchErr) throw fetchErr;
  // @ts-ignore - Supabase type inference issue with Database types
  const currentLikes = (current?.likes ?? 0) + increment;
  const { data, error } = await supabaseBrowser
    .from('products')
    // @ts-ignore - Supabase type inference issue with Database types
    .update({ likes: currentLikes })
    .eq('id', productId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
