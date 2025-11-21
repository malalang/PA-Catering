declare global {

  interface OrderDetails {
    userId: string;
    items: CartItem[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: paymentMethod;
  }
 
  interface OrderItem {
    name: string;
    quantity: number;
  }

  type CartItem = ProductType & {
    quantity: number;
  };

  interface Order {
    orderId: string;
    userId?: string;
    orderDate: Date;
    products: CartItem[];
    quantity: number;
    totalAmount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    type: 'Takeaway' | 'Photo boot' | 'Laundry';
    location?: string;
    paymentMethod?: paymentMethod;
    deliveryAddress?: string;
    shippingAddress?: string;
  }
}
export { };