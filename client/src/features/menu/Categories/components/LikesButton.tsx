'use client';

import React, { useState, useEffect } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import { doc, updateDoc, setDoc, onSnapshot, arrayRemove, arrayUnion } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebaseConfig';

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
	const userId = auth.currentUser?.uid;

	const docRef = doc(firestore, 'products', product.Name);
	useEffect(() => {
		const unsubscribe = onSnapshot(docRef, (docSnap) => {
			if (docSnap.exists()) {
				const data = docSnap.data() as { likes: number; likedBy: string[] };
				setLikes(data);
				setIsLiked(data.likedBy.includes(userId || ''));
				setLoading(false);
			} else {
				setDoc(docRef, {
					likes: 0,
					likedBy: [],
				});
				setLoading(false);
			}
		});
		return () => unsubscribe(); // Unsubscribe when the component unmounts
	}, [product.ProductID, docRef, userId]);

	const handleLike = async () => {
		const isLiked = likes.likedBy.includes(userId || '') || false;

		await updateDoc(docRef, {
			likes: isLiked ? likes.likes - 1 : likes.likes + 1,
			likedBy: isLiked ? arrayRemove(userId) : arrayUnion(userId),
		});
	};

	return (
		<Button
			disabled={loading}
			loading={loading}
			variant='icon'
			onClick={handleLike}
			className={likes.likedBy.includes(userId || '') ? 'text-red-700' : 'text-white'}
			aria-label={isLiked ? 'Unlike product' : 'Like product'}>
			<BiSolidLike
				size={20}
				className={isLiked ? 'text-red-200' : 'text-white'}
			/>
			<span className='text-xs text-center font-thin truncate font-sans'>
				{likes.likes} <span className='hidden md:inline-flex'>Likes</span>
			</span>
		</Button>
	);
};

export default LikesButton;
