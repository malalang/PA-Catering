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
						className='overflow-hidden flex flex-col rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md hover:border-yellow-400/50  transition-all duration-300 shadow-lg'>
						{item.image_url && (
							<Image
								src={item.image_url}
								alt={item.name}
								width={500}
								height={500}
								className='w-full h-auto'
							/>
						)}
						<div className='p-6 flex-grow text-center'>
							<h3 className='text-xl font-bold text-white'>{item.name}</h3>
							<p className='mt-2 text-slate-300'>{item.description}</p>
						</div>
						<div className='flex justify-around items-center border-t border-white/20 pt-4 bg-white/5 -mx-6 px-6 pb-6 -mb-6 mt-auto rounded-b-xl'>
							<div className="flex flex-col items-center gap-1">
								<LikesButton itemId={item.id} table="featured_items" />
							</div>
							<Button
								variant='icon'
								onClick={() => handleComment(item.id)}
								className='flex flex-col items-center gap-1'
								aria-label='Comment on item'>
								<BiSolidComment
									size={24}
									className='text-white hover:text-yellow-500 transition-colors'
								/>
								<span className='text-xs text-slate-400'>{(item.comments as any[])?.length || 0}</span>
							</Button>
							<Button
								variant='icon'
								onClick={() => handleShare(item.id)}
								className='flex flex-col items-center gap-1'
								aria-label='Share item'>
								<BiSolidShare
									size={24}
									className='text-white hover:text-yellow-500 transition-colors'
								/>
								<span className='text-xs text-slate-400'>Share</span>
							</Button>
						</div>
					</article>
				))}
			</div>
		</Section>
	);
};

export default FeaturedItemsServices;
