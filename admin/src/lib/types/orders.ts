import type { PaymentMethod } from "./base";
import type { Product } from "./products";

export interface OrderItem {
  name: string;
  quantity: number;
}

export type CartItem = Product & {
  quantity: number;
};

export interface OrderDetails {
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: string;
  paymentMethod: PaymentMethod;
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "deleted";
export type OrderType = "Takeaway" | "Photo boot" | "Laundry";

export interface Order {
  orderId: string;
  userId?: string;
  orderDate: Date;
  products: CartItem[];
  quantity: number;
  totalAmount: number;
  status: OrderStatus;
  type: OrderType;
  location?: string;
  paymentMethod?: PaymentMethod;
  deliveryAddress?: string;
  shippingAddress?: string;
}

export interface SupabaseOrderRecord {
  id: string;
  user_id: string | null;
  items: CartItem[];
  total_price: number;
  total_quantity: number;
  status: OrderStatus;
  created_at: string;
  updated_at?: string;
}
