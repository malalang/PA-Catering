import { createClient } from './client';


export const getCommentsForProduct = async (productId: string) => {
  const supabaseBrowser = createClient();
  const { data, error } = await supabaseBrowser
    .from('comments')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addComment = async (productId: string, userId: string | null, userName: string | null, body: string) => {
  const supabaseBrowser = createClient();
  const { data, error } = await supabaseBrowser
    .from('comments')
    .insert({ product_id: productId, user_id: userId, user_name: userName, body } as any)
    .select()
    .single();
  if (error) throw error;
  return data;
};
