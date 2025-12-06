'use client';

import React, { useState, useEffect } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { toggleLike } from '@/lib/supabase/likes';
import { createClient } from '@/lib/supabase/client';

interface LikesButtonProps {
	table?: string;
	itemId: string;
	className?: string;
}

const LikesButton: React.FC<LikesButtonProps> = ({ table = 'products', itemId, className }) => {
	const [likesCount, setLikesCount] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	const userId = (user as any)?.id;

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			try {
				const supabase = createClient();
				const { data, error } = await supabase
					.from(table)
					.select('likes')
					.eq('id', itemId)
					.single();

				if (error) {
					console.error('Error fetching likes:', error);
				}

				if (mounted && data) {
					const likesArray = (data as any).likes || [];
					setLikesCount(likesArray.length);
					if (userId) {
						setIsLiked(likesArray.includes(userId));
					}
				}
			} catch (err) {
				console.error(err);
			} finally {
				if (mounted) setLoading(false);
			}
		};
		load();
		return () => { mounted = false; };
	}, [table, itemId, userId]);

	const handleLike = async () => {
		if (!userId) return;

		// Optimistic update
		const newIsLiked = !isLiked;
		const newCount = newIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);

		setIsLiked(newIsLiked);
		setLikesCount(newCount);

		try {
			await toggleLike(table, itemId, userId);
		} catch (error) {
			console.error('Error toggling like:', error);
			// Revert
			setIsLiked(!newIsLiked);
			setLikesCount(likesCount);
		}
	};

	return (
		<Button
			disabled={loading || !userId}
			loading={loading}
			variant='icon'
			onClick={handleLike}
			className={`${isLiked ? 'bg-amber-500/20 border border-amber-400/30' : 'bg-white/5 border border-white/10'} ${className || ''}`}
			aria-label={isLiked ? 'Unlike' : 'Like'}>
			<BiSolidLike
				size={20}
				className={isLiked ? 'text-amber-400' : 'text-white/70'}
			/>
			<span className='text-xs text-center font-thin truncate font-sans'>
				{likesCount} <span className='hidden md:inline-flex'>Likes</span>
			</span>
		</Button>
	);
};

export default LikesButton;
