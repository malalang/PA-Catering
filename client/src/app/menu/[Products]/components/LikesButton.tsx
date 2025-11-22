'use client';

import React, { useState, useEffect } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/supabase/auth/useAuth';

interface SocialButtonsProps {
	product: ProductType;
}

const LikesButton: React.FC<SocialButtonsProps> = ({ product }) => {
	const [likes, setLikes] = useState<{ likes: number; likedBy: string[] }>({
		likes: 0,
		likedBy: [],
	});
	const [isLiked, setIsLiked] = useState(false);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const userId = (user as any)?.id;
	useEffect(() => {
		let mounted = true;
		const load = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from('products')
				.select('likes, liked_by')
				.eq('id', product.ProductID || product.Name)
				.single();
			if (error) {
				// If product row doesn't exist, initialize it
				// @ts-ignore - Supabase type inference issue with Database types
				await supabase.from('products').upsert({
					id: product.ProductID || product.Name,
					name: product.Name,
					price: product.Price,
					image_url: product.Image || null,
					likes: 0,
					liked_by: [],
				});
				if (mounted) {
					setLikes({ likes: 0, likedBy: [] });
					setIsLiked(false);
					setLoading(false);
				}
				return;
			}
			if (mounted) {
				// @ts-ignore - Supabase type inference issue with Database types
				setLikes({ likes: data.likes || 0, likedBy: (data.liked_by as string[]) || [] });
				// @ts-ignore - Supabase type inference issue with Database types
				setIsLiked(((data.liked_by as string[]) || []).includes(userId || ''));
				setLoading(false);
			}
		};
		load();
		return () => {
			mounted = false;
		};
	}, [product.ProductID, userId]);

	const handleLike = async () => {
		const supabase = createClient();
		const liked = likes.likedBy.includes(userId || '') || false;
		const newLikes = liked ? Math.max(0, likes.likes - 1) : likes.likes + 1;
		const newLikedBy = liked
			? likes.likedBy.filter((id) => id !== userId)
			: [...likes.likedBy, userId];

		// Optimistic UI
		setLikes({ likes: newLikes, likedBy: newLikedBy });
		setIsLiked(!liked);

		// Persist
		await supabase
			.from('products')
			// @ts-ignore - Supabase type inference issue with Database types
			.update({ likes: newLikes, liked_by: newLikedBy })
			.eq('id', product.ProductID || product.Name);
	};

	return (
		<Button
			disabled={loading}
			loading={loading}
			variant='icon'
			onClick={handleLike}
			className={likes.likedBy.includes(userId || '') ? 'text-yellow-700' : 'text-white'}
			aria-label={isLiked ? 'Unlike product' : 'Like product'}>
			<BiSolidLike
				size={20}
				className={isLiked ? 'text-yellow-200' : 'text-white'}
			/>
			<span className='text-xs text-center font-thin truncate font-sans'>
				{likes.likes} <span className='hidden md:inline-flex'>Likes</span>
			</span>
		</Button>
	);
};

export default LikesButton;
