import React from 'react';
import Image from 'next/image';
import AppLink from '@/components/ui/Link';
import LikesButton from '@/features/menu/Categories/components/LikesButton';
import { FaStar } from 'react-icons/fa';

import AddtoCart from '@/features/menu/AddtoCart';

interface ProductCardProps {
	product: ProductType;
	categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => (
	<article className='m-0 group flex flex-col h-full bg-black/50 border border-red-500 rounded-md p-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-red-500/20'>
		<span className='flex items-center justify-between gap-2'>
			{product.badge && (
				<span className='px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg bg-red-700 text-white'>
					{product.badge}
				</span>
			)}
			<LikesButton product={product} />
		</span>

		<div className='flex flex-col flex-grow'>
			<AppLink
				href={`/menu/${categoryName}/${product.Name.toLowerCase().replace(/\s+/g, '-')}`}
				className='flex flex-col items-center text-center flex-grow rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-red-500'>
				{product.Image && (
					<div className='relative w-full aspect-[4/3] mb-4 bg-black/20 rounded-md overflow-hidden'>
						<Image
							src={product.Image}
							alt={product.Name}
							fill
							className='object-contain rounded-md transition-transform duration-300 group-hover:scale-110'
						/>
					</div>
				)}
				<h2 className='text-base font-bold text-white mb-2 line-clamp-2 flex-grow'>
					{product.Name}
				</h2>
				<p className='text-xl font-extrabold text-white mb-2'>R{product.Price.toFixed(2)}</p>
				<div className='flex items-center justify-center gap-1 mb-4'>
					<FaStar className='text-red-500' />
					<FaStar className='text-red-500' />
					<FaStar className='text-red-500' />
					<FaStar className='text-red-500' />
					<FaStar className='text-white/50' />
					<span className='text-xs text-white font-semibold ml-2'>(4.5)</span>
				</div>
			</AppLink>
		</div>

		<div className='mt-auto'>
			<AddtoCart product={product}>Add to Cart</AddtoCart>
		</div>
	</article>
);

export default ProductCard;
