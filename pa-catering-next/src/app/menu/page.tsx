
'use client';

import { CartProvider } from '@/features/cart/CartContext';
import MenuSections from '@/features/menu/components/MenuSections';
import PromotionsBanner from '@/features/menu/components/PromotionsBanner';
import SearchBar from '@/features/menu/components/SearchBar';
import SpecialOffers from '@/features/menu/components/SpecialOffers';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';

export default function MenuPage() {
  return (
    <CartProvider>
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <PromotionsBanner />
        <Suspense fallback={<Loading message="Loading menu..." />}>
          <div className="mb-8">
            <SearchBar value="" onChange={() => {}} />
          </div>
          <section className="space-y-12">
            <SpecialOffers />
            <MenuSections />
          </section>
        </Suspense>
      </main>
    </CartProvider>
  );
}
