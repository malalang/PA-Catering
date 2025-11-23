'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { BiSolidHeart, BiSolidComment, BiSolidShare } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useRouter } from 'next/navigation';

const FeaturedItemsServices: React.FC = () => {
	const { user } = useAuth();
	const router = useRouter();

	// Mock data with counters (in real app, this would come from database)
	const [featuredItems, setFeaturedItems] = useState([
		{
			id: 1,
			name: 'Premium Photo booth',
			description: 'Get luxurious images with our premium Photo booth package.',
			image: '/PhotoBoot.jpg',
			likes: 42,
			comments: 15,
			shares: 8,
		},
		{
			id: 2,
			name: 'Signature Kota',
			description: 'Our famous, delicious Kota filled with tasty ingredients.',
			image: '/Menus/KotaMeal.png',
			likes: 128,
			comments: 34,
			shares: 22,
		},
		{
			id: 3,
			name: 'Burger Meal',
			description: 'A satisfying meal with a perfectly cooked burger, a 500ml drink, and extra chips.',
			image: '/Menus/BurgerMeal.png',
			likes: 95,
			comments: 27,
			shares: 18,
		},
	]);

	const handleLike = (itemId: number) => {
		if (!user) {
			router.push('/login');
			return;
		}
		// Update like count (in real app, this would call an API)
		setFeaturedItems(prev => prev.map(item =>
			item.id === itemId ? { ...item, likes: item.likes + 1 } : item
		));
	};

	const handleComment = (itemId: number) => {
		if (!user) {
			router.push('/login');
			return;
		}
		// Open comment modal or navigate to comment section
		alert('Comment functionality - would open a modal or navigate to comments');
	};

	const handleShare = (itemId: number) => {
		if (!user) {
			router.push('/login');
			return;
		}
		// Share functionality
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
						{item.image && (
							<Image
								src={item.image}
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
							<Button
								variant='icon'
								onClick={() => handleLike(item.id)}
								className='flex flex-col items-center gap-1'
								aria-label='Like item'>
								<BiSolidHeart
									size={24}
									className='text-white hover:text-yellow-500 transition-colors'
								/>
								<span className='text-xs text-slate-400'>{item.likes}</span>
							</Button>
							<Button
								variant='icon'
								onClick={() => handleComment(item.id)}
								className='flex flex-col items-center gap-1'
								aria-label='Comment on item'>
								<BiSolidComment
									size={24}
									className='text-white hover:text-yellow-500 transition-colors'
								/>
								<span className='text-xs text-slate-400'>{item.comments}</span>
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
								<span className='text-xs text-slate-400'>{item.shares}</span>
							</Button>
						</div>
					</article>
				))}
			</div>
		</Section>
	);
};

export default FeaturedItemsServices;
