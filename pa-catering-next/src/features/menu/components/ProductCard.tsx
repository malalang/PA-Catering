import React from 'react';
import Image from 'next/image';
import AddtoCart from '@/features/menu/AddtoCart';
import { FaStar } from 'react-icons/fa';

interface ProductCardProps {
  title: string;
  description?: string;
  price: number;
  image?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  image,
  onAddToCart,
}) => {
  return (
    <article className="m-0 group flex flex-col h-full bg-black/50 border border-red-500 rounded-md p-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-red-500/20">
      <div className="flex flex-col flex-grow">
        {image && (
          <div className="relative w-full aspect-[4/3] mb-4 bg-black/20 rounded-md overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain rounded-md transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}

        <h2 className="text-base font-bold text-white mb-2 line-clamp-2 flex-grow">{title}</h2>
        {description && <p className="text-gray-300 mb-2">{description}</p>}
        <p className="text-xl font-extrabold text-white mb-4">R{price.toFixed(2)}</p>

        <div className="flex items-center justify-center gap-1 mb-4">
          <FaStar className="text-red-500" />
          <FaStar className="text-red-500" />
          <FaStar className="text-red-500" />
          <FaStar className="text-red-500" />
          <FaStar className="text-white/50" />
          <span className="text-xs text-white font-semibold ml-2">(4.5)</span>
        </div>
      </div>

      <div className="mt-auto">
        <AddtoCart onAdd={onAddToCart} label="Add to Cart" />
      </div>
    </article>
  );
};

export default ProductCard;