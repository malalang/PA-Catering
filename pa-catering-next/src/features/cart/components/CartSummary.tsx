'use client';

import React from 'react';
import Link from '@/components/ui/Link';
import Image from 'next/image';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../CartContext';
import Button from '@/components/ui/Button';

const CartSummary: React.FC = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const { items, total } = state;

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <FaShoppingCart className="mx-auto text-6xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-300 mb-6">Add some delicious items from our menu!</p>
        <Link href="/menu" variant="button">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <article key={item.id} className="flex items-center gap-4 p-4 bg-secondary-dark rounded-lg">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-gray-300 text-sm">{item.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <span className="min-w-[2rem] text-center">{item.quantity}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0">
            <p className="font-semibold">R{(item.price * item.quantity).toFixed(2)}</p>
            <p className="text-sm text-gray-400">R{item.price.toFixed(2)} each</p>
          </div>
        </article>
      ))}

      <div className="border-t border-gray-700 pt-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Total</span>
          <span className="text-2xl font-bold">R{total.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <Link href="/menu" variant="secondary" className="flex-1">
            Add More Items
          </Link>
          <Link href="/checkout" variant="primary" className="flex-1">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;