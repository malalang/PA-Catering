import { createClient } from './client';

export const getLikeCount = async (productId: string) => {
  const supabaseBrowser = createClient();
  const { data, error } = await supabaseBrowser
    .from('products')
    .select('likes')
    .eq('id', productId)
    .single();
  if (error) throw error;
  return (data as any)?.likes ?? 0;
};

export const toggleLike = async (productId: string, increment: number = 1) => {
  const supabaseBrowser = createClient();
  // increment is +1 or -1. Read current likes then update atomically via a transaction-like approach.
  const { data: current, error: fetchErr } = await supabaseBrowser
    .from('products')
    .select('likes')
    .eq('id', productId)
    .single();
  if (fetchErr) throw fetchErr;

  const currentLikes = ((current as any)?.likes ?? 0) + increment;
  const { data, error } = await supabaseBrowser
    .from('products')
    .update({ likes: currentLikes } as never)
    .eq('id', productId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
