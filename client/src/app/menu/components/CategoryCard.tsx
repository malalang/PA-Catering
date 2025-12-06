import React from 'react';
import Image from 'next/image';
import AppLink from '@/components/ui/Link';



interface CategoryCardProps {
	group: {
		Name: string;
		Products: ProductType[];
		Image?: string;
		Description?: string;
	};
}

const CategoryCard: React.FC<CategoryCardProps> = ({ group }) => (
	<AppLink
		href={`/menu/${group.Name.toLowerCase().replace(/\s+/g, '-')}`}
		aria-label={`View ${group.Name} menu`}
		className='group relative flex flex-col h-full bg-neutral-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/30 hover:bg-neutral-900/60 hover:border-amber-500/20 focus:outline-none focus-visible:ring-2 ring-amber-500/50'>

		{group.Image && (
			<div className='relative w-full aspect-[4/3] mb-6 bg-black/20 rounded-xl overflow-hidden'>
				<Image
					src={group.Image}
					alt={group.Name}
					fill
					className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
			</div>
		)}

		<div className='flex-grow flex flex-col items-center text-center'>
			<h3 className='text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-400 transition-colors font-small-caps'>
				{group.Name}
			</h3>
			{group.Description && (
				<p className='text-white/60 text-sm leading-relaxed line-clamp-2 mb-4 max-w-xs'>
					{group.Description}
				</p>
			)}
		</div>

		<div className='mt-auto pt-6 border-t border-white/5 w-full flex justify-center'>
			<span className='px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300'>
				{group.Products.length} Items
			</span>
		</div>
	</AppLink>
);

export default CategoryCard;
