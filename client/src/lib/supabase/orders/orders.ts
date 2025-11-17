import { createClient } from '@/lib/supabase/client';

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total_price: number;
  total_quantity: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export const addOrder = async (
  userId: string,
  items: CartItem[],
  totalPrice: number,
  totalQuantity: number
) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      items,
      total_price: totalPrice,
      total_quantity: totalQuantity,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw new Error(error.message);
  }

  return data as Order;
};

export const getOrdersByUser = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return (data as Order[]) || [];
};

export const getOrdersByStatus = async (userId: string, status: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return (data as Order[]) || [];
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error);
    throw new Error(error.message);
  }

  return data as Order;
};
