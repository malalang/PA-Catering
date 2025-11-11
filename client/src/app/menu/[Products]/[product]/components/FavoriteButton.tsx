'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebaseConfig';

import Button from '@/components/ui/Button';

interface FavoriteButtonProps {
	product: ProductType;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const userId = auth.currentUser?.uid;

	useEffect(() => {
		if (!userId) return;

		const checkFavoriteStatus = async () => {
			try {
				const userFavoritesRef = doc(firestore, 'userFavorites', userId);
				const userFavoritesDoc = await getDoc(userFavoritesRef);

				if (userFavoritesDoc.exists()) {
					const favorites = userFavoritesDoc.data().favorites || [];
					setIsFavorite(favorites.includes(product.Name));
				}
			} catch (error) {
				console.error('Error checking favorite status:', error);
			}
		};

		checkFavoriteStatus();
	}, [userId, product.Name]);

	const toggleFavorite = async () => {
		if (!userId) {
			// Handle case where user is not logged in
			alert('Please log in to save favorites');
			return;
		}

		setIsLoading(true);
		try {
			const userFavoritesRef = doc(firestore, 'userFavorites', userId);
			const userFavoritesDoc = await getDoc(userFavoritesRef);

			if (userFavoritesDoc.exists()) {
				const favorites = userFavoritesDoc.data().favorites || [];

				if (isFavorite) {
					// Remove from favorites
					const updatedFavorites = favorites.filter((name: string) => name !== product.Name);
					await setDoc(userFavoritesRef, { favorites: updatedFavorites });
					setIsFavorite(false);
				} else {
					// Add to favorites
					const updatedFavorites = [...favorites, product.Name];
					await setDoc(userFavoritesRef, { favorites: updatedFavorites });
					setIsFavorite(true);
				}
			} else {
				// Create new favorites document
				await setDoc(userFavoritesRef, { favorites: [product.Name] });
				setIsFavorite(true);
			}
		} catch (error) {
			console.error('Error toggling favorite:', error);
			alert('Failed to update favorites');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			onClick={toggleFavorite}
			disabled={isLoading || !userId}
			className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-transparent font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-white ${
				isLoading || !userId ? 'bg-red-900/50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
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
