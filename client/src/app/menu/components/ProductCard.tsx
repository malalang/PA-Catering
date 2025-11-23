import React from 'react';
import Image from 'next/image';
import AppLink from '@/components/ui/Link';
import LikesButton from '@/app/menu/[Products]/components/LikesButton';
import { HiStar } from 'react-icons/hi2';
import AddtoCart from '@/app/menu/[Products]/[product]/components/AddtoCart';

interface ProductCardProps {
	product: ProductType;
	categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => (
	<article className='m-0 group flex flex-col h-full bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border border-white/10 rounded-xl p-4 transition-all duration-300 hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/20'>
		<span className='flex items-center justify-between gap-2 mb-3'>
			{product.badge && (
				<span className='px-3 py-1.5 rounded-full text-xs font-bold z-10 shadow-lg bg-gradient-to-r from-amber-600 to-yellow-600 text-white uppercase tracking-wider'>
					{product.badge}
				</span>
			)}
			<LikesButton product={product} />
		</span>

		<div className='flex flex-col flex-grow'>
			<AppLink
				href={`/menu/${categoryName}/${product.Name.toLowerCase().replace(/\s+/g, '-')}`}
				className='flex flex-col items-center text-center flex-grow rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-amber-500 transition-all duration-200'>
				{product.Image && (
					<div className='relative w-full aspect-[4/3] mb-4 bg-black/30 rounded-lg overflow-hidden border border-white/5'>
						<Image
							src={product.Image}
							alt={product.Name}
							fill
							className='object-contain rounded-lg transition-transform duration-300 group-hover:scale-110'
						/>
					</div>
				)}
				<h2 className='text-base font-bold text-white mb-2 line-clamp-2 flex-grow'>
					{product.Name}
				</h2>
				<p className='text-2xl font-extrabold text-transparent bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text mb-3'>
					R{product.Price.toFixed(2)}
				</p>
				<div className='flex items-center justify-center gap-1 mb-4'>
					<HiStar className='text-amber-500' size={18} />
					<HiStar className='text-amber-500' size={18} />
					<HiStar className='text-amber-500' size={18} />
					<HiStar className='text-amber-500' size={18} />
					<HiStar className='text-white/30' size={18} />
					<span className='text-xs text-slate-400 font-semibold ml-2'>(4.5)</span>
				</div>
			</AppLink>
		</div>

		<div className='mt-auto'>
			<AddtoCart product={product}>Add to Cart</AddtoCart>
		</div>
	</article>
);

export default ProductCard;
