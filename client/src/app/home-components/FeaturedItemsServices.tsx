import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Section from '@/components/ui/layout/Section';
import ActionFooter from '@/components/ui/ActionFooter';
import { createClient } from '@/lib/supabase/client';

interface FeaturedItem {
	id: string;
	name: string;
	description: string;
	image_url: string | null;
	likes: string[] | null;
	comments: any[] | null;
}

const FeaturedItemsServices: React.FC = () => {
	const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);

	useEffect(() => {
		const fetchItems = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from('featured_items')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) {
				console.error('Error fetching featured items:', error);
			} else {
				setFeaturedItems(data || []);
			}
		};
		fetchItems();
	}, []);



	return (
		<Section tittle='Featured Items & Services'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				{featuredItems.map((item) => (
					<article
						key={item.id}
						className='group overflow-hidden flex flex-col rounded-3xl border border-white/5 bg-neutral-900/50 backdrop-blur-md hover:border-amber-500/30 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)] transition-all duration-500 relative'>
						{
							item.image_url && (
								<div className="relative aspect-video overflow-hidden">
									<Image
										src={item.image_url}
										alt={item.name}
										width={500}
										height={500}
										className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700'
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
								</div>
							)
						}
						<div className='p-8 flex-grow'>
							<h3 className='text-2xl font-bold text-white mb-2 font-small-caps tracking-wide'>{item.name}</h3>
							<p className='text-white/60 font-light leading-relaxed line-clamp-2'>{item.description}</p>
						</div>
						<ActionFooter itemId={item.id} table="featured_items" commentsCount={(item.comments as any[])?.length || 0} />
					</article>
				))
				}
			</div>
		</Section>
	);
};

export default FeaturedItemsServices;
