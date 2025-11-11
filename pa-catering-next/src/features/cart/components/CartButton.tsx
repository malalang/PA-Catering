'use client';

import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { useCart } from '../CartContext';
import Link from '@/components/ui/Link';

const CartButton: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" variant="icon" className="relative">
      <Button
        variant="icon"
        aria-label={`Shopping cart with ${itemCount} items`}
      >
        <FaShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default CartButton;