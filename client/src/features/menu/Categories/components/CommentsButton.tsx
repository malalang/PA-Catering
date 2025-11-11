'use client';

import React, { useState, useEffect } from 'react';
import { BiSolidComment } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebaseConfig';

import CommentModal from './CommentModal';

interface CommentsButtonsProps {
	product: ProductType;
}

const CommentsButton: React.FC<CommentsButtonsProps> = ({ product }) => {
	const [commentCount, setCommentCount] = useState(0);
	const [showCommentModal, setShowCommentModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const userId = auth.currentUser?.uid;

	const commentsRef = collection(firestore, 'products', product.Name, 'Comments');
	const docRef = doc(firestore, 'products', product.Name);

	const handleCommentClick = () => {
		if (!userId) {
			alert('Please login to comment');
			return;
		}
		setShowCommentModal(true);
	};

	const handleCloseCommentModal = () => {
		setShowCommentModal(false);
	};
	useEffect(() => {
		const unsubscribe = onSnapshot(commentsRef, (docSnap) => {
			if (!docSnap.empty) {
				setCommentCount(docSnap.size);
				setLoading(false);
			} else {
				setLoading(false);
			}
		});
		return () => unsubscribe(); // Unsubscribe when the component unmounts
	}, [product.ProductID, docRef, userId]);

	if (showCommentModal) {
		return (
			<CommentModal
				handleCloseCommentModal={handleCloseCommentModal}
				product={product}
			/>
		);
	}

	return (
		<Button
			disabled={loading}
			loading={loading}
			variant='icon'
			onClick={handleCommentClick}
			className='text-white'>
			<BiSolidComment size={20} />
			<span className='text-xs text-center truncate'>
				{commentCount} Comment{commentCount !== 1 ? 's' : ''}
			</span>
		</Button>
	);
};

export default CommentsButton;
