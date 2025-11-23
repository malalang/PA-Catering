'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { getUserFavorites, toggleFavorite } from '@/lib/supabase/favorites';

import Button from '@/components/ui/Button';

interface FavoriteButtonProps {
	product: ProductType;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();
	const userId = (user as any)?.id || (user as any)?.uid || null;

	// Determine product id/key used in this app (fallbacks for different shapes)
	const productKey = (product as any).ProductID || (product as any).id || (product as any).Name || (product as any).slug || (product as any).Slug;

	useEffect(() => {
		if (!userId || !productKey) return;

		const checkFavoriteStatus = async () => {
			try {
				const favorites = await getUserFavorites(userId);
				setIsFavorite(favorites.includes(productKey));
			} catch (error) {
				console.error('Error checking favorite status:', error);
			}
		};

		checkFavoriteStatus();
	}, [userId, productKey]);

	const handleToggleFavorite = async () => {
		if (!userId) {
			alert('Please log in to save favorites');
			return;
		}

		setIsLoading(true);
		try {
			const result = await toggleFavorite(userId, productKey);
			setIsFavorite(result.added);
		} catch (error) {
			console.error('Error toggling favorite:', error);
			alert('Failed to update favorites');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			onClick={handleToggleFavorite}
			disabled={isLoading || !userId}
			className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-amber-500 shadow-md ${isLoading || !userId
					? 'bg-slate-700/50 border-white/10 cursor-not-allowed opacity-50'
					: 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border-0 hover:shadow-amber-500/50'
				}`}
			aria-live='polite'>
			{isLoading ? (
				<>
					<div className='w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin'></div>
					<span>Updating...</span>
				</>
			) : (
				<>
					{isFavorite ? <FaHeart /> : <FaRegHeart />}
					<span>{isFavorite ? 'Saved' : 'Save to Favorites'}</span>
				</>
			)}
		</Button>
	);
};

export default FavoriteButton;
