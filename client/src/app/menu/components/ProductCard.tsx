import React from 'react';
import Image from 'next/image';
import AppLink from '@/components/ui/Link';
import ActionFooter from '@/components/ui/ActionFooter';
import { HiStar } from 'react-icons/hi2';
import AddtoCart from '@/app/menu/[Products]/[product]/components/AddtoCart';

interface ProductCardProps {
	product: ProductType;
	categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => (
	<article className='group relative flex flex-col h-full bg-neutral-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/40 hover:bg-neutral-900/60 hover:border-amber-500/20'>
		<div className='flex items-center justify-between gap-4 mb-6'>
			{product.badge ? (
				<span className='px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20'>
					{product.badge}
				</span>
			) : <span></span>}
		</div>

		<div className='flex flex-col flex-grow'>
			<AppLink
				href={`/menu/${categoryName}/${product.Name.toLowerCase().replace(/\s+/g, '-')}`}
				className='flex flex-col items-center text-center flex-grow focus:outline-none group-focus-visible:ring-2 ring-amber-500/50 rounded-lg'>
				{product.Image && (
					<div className='relative w-full aspect-square mb-6 bg-black/20 rounded-xl overflow-hidden'>
						<Image
							src={product.Image}
							alt={product.Name}
							fill
							className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
						/>
					</div>
				)}
				<h2 className='text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight tracking-tight group-hover:text-amber-400 transition-colors'>
					{product.Name}
				</h2>
				<p className='text-3xl font-light text-amber-500/90 mb-4 tracking-tight'>
					R{product.Price.toFixed(2)}
				</p>
				<div className='flex items-center justify-center gap-1 mb-2 opacity-60 group-hover:opacity-100 transition-opacity'>
					<HiStar className='text-amber-500' size={16} />
					<HiStar className='text-amber-500' size={16} />
					<HiStar className='text-amber-500' size={16} />
					<HiStar className='text-amber-500' size={16} />
					<HiStar className='text-white/20' size={16} />
					<span className='text-xs text-white/50 font-medium ml-2 tracking-wide'>(4.5)</span>
				</div>
				{product.Description && (
					<p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3 font-light">
						{product.Description}
					</p>
				)}
			</AppLink>
		</div>

		<div className='mt-auto pt-6 border-t border-white/5 space-y-4'>
			<ActionFooter itemId={product.ProductID} table="products" className="border-t-0 pt-0" />
			<AddtoCart product={product} className="w-full py-4 text-sm font-bold tracking-widest uppercase hover:bg-amber-500 hover:text-black transition-colors duration-300">Add to Cart</AddtoCart>
		</div>
	</article>
);

export default ProductCard;
