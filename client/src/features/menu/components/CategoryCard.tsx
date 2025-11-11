import React from 'react';
import Image from 'next/image';
import AppLink from '@/components/ui/Link';

import Section from '@/components/ui/layout/Section';

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
		className='block p-0 m-0 group rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-red-500'>
		<Section>
			{group.Image && (
				<div className='relative w-full aspect-[4/3] mb-4 bg-black/20 rounded-md overflow-hidden'>
					<Image
						src={group.Image}
						alt={group.Name}
						fill
						className='object-contain rounded-md transition-transform duration-300 group-hover:scale-110'
					/>
				</div>
			)}
			<div className='flex-grow flex flex-col'>
				<h3 className='text-xl font-bold text-white mb-2'>{group.Name}</h3>
				{group.Description && <p>{group.Description}</p>}
			</div>
			<span className='bg-red-700 text-xs font-bold px-3 py-1 rounded-full text-white self-center mt-auto'>
				{group.Products.length} items
			</span>
		</Section>
	</AppLink>
);

export default CategoryCard;
