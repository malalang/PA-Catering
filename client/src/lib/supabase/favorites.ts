import { createClient } from './client';

export const getUserFavorites = async (userId: string) => {
  const supabaseBrowser = createClient();
  const { data, error } = await supabaseBrowser
    .from('user_favorites')
    .select('product_id')
    .eq('user_id', userId);
  if (error) throw error;
  return data?.map((r: any) => r.product_id) ?? [];
};

export const toggleFavorite = async (userId: string, productId: string) => {
  const supabaseBrowser = createClient();
  // Try insert; if conflict, delete
  const { error: insertErr } = await supabaseBrowser
    .from('user_favorites')
    .insert([{ user_id: userId, product_id: productId }] as any);
  if (!insertErr) return { added: true };
  // If insert failed because exists, remove
  const { data, error } = await supabaseBrowser
    .from('user_favorites')
    .delete()
    .match({ user_id: userId, product_id: productId });
  if (error) throw error;
  return { added: false };
};
