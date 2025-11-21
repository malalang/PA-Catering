import { createClient } from './client';

const supabaseBrowser = createClient();

export const addOrder = async (userId: string | null, items: any[], totalPrice: number, totalQuantity: number) => {
  const payload = {
    user_id: userId,
    items,
    total_price: totalPrice,
    total_quantity: totalQuantity,
  };
  const { data, error } = await supabaseBrowser
    .from('orders')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getOrdersByUser = async (userId: string) => {
  const { data, error } = await supabaseBrowser
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};
