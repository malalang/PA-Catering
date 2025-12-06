'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiSolidComment, BiSolidShare } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useRouter } from 'next/navigation';
import LikesButton from '@/app/menu/[Products]/components/LikesButton';
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
	const { user } = useAuth();
	const router = useRouter();
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

	const handleComment = (itemId: string) => {
		if (!user) {
			router.push('/login');
			return;
		}
		alert('Comment functionality - would open a modal or navigate to comments');
	};

	const handleShare = (itemId: string) => {
		if (navigator.share) {
			navigator.share({
				title: 'PA Luxe Creation',
				text: 'Check out this amazing item!',
				url: window.location.href,
			});
		} else {
			alert('Share functionality - URL copied to clipboard');
		}
	};

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
						< div className='p-8 flex-grow' >
							<h3 className='text-2xl font-bold text-white mb-2 font-small-caps tracking-wide'>{item.name}</h3>
							<p className='text-white/60 font-light leading-relaxed line-clamp-2'>{item.description}</p>
						</div>
						<div className='flex justify-between items-center border-t border-white/5 p-6 bg-white/5 mt-auto'>
							<div className="flex flex-col items-center gap-1 scale-90 origin-left">
								<LikesButton itemId={item.id} table="featured_items" />
							</div>
							<div className="flex gap-2">
								<Button
									variant='icon'
									onClick={() => handleComment(item.id)}
									className='p-2 hover:bg-white/10 rounded-full transition-colors group/btn'
									aria-label='Comment on item'>
									<BiSolidComment
										size={20}
										className='text-white/40 group-hover/btn:text-amber-400 transition-colors'
									/>
								</Button>
								<Button
									variant='icon'
									onClick={() => handleShare(item.id)}
									className='p-2 hover:bg-white/10 rounded-full transition-colors group/btn'
									aria-label='Share item'>
									<BiSolidShare
										size={20}
										className='text-white/40 group-hover/btn:text-amber-400 transition-colors'
									/>
								</Button>
							</div>
						</div>
					</article>
				))
				}
			</div >
		</Section >
	);
};

export default FeaturedItemsServices;
