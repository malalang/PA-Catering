import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiHeart, HiChevronRight } from 'react-icons/hi2';
import { createClient } from '@/lib/supabase/server';
import Section from '@/components/ui/layout/Section';

interface FavoritesSummaryProps {
    userId: string;
}

const FavoritesSummary: React.FC<FavoritesSummaryProps> = async ({ userId }) => {
    const supabase = await createClient();
    const { data: favorites } = await supabase
        .from('user_favorites')
        .select('product_id, products(*)')
        .eq('user_id', userId)
        .limit(4);

    if (!favorites || favorites.length === 0) {
        return null;
    }

    return (
        <Section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <HiHeart className="text-rose-400" />
                    Favorites
                </h2>
                <Link href="/menu" className="text-sm text-yellow-400 hover:text-white transition-colors flex items-center gap-1">
                    Browse Menu <HiChevronRight />
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {favorites.map((fav: any) => {
                    const product = fav.products;
                    if (!product) return null;

                    return (
                        <Link
                            href={`/menu/${product.category_name}/${product.slug || product.id}`}
                            key={product.id}
                            className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors group"
                        >
                            <div className="aspect-square relative mb-2 rounded-lg overflow-hidden bg-black/20">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-yellow-500/20">
                                        <HiHeart className="text-3xl" />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-white font-medium truncate">{product.name}</p>
                            <p className="text-xs text-yellow-400">R{product.price?.toFixed(2)}</p>
                        </Link>
                    );
                })}
            </div>
        </Section>
    );
};

export default FavoritesSummary;
