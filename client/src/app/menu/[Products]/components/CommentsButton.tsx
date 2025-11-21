'use client';

import React, { useState, useEffect } from 'react';
import { BiSolidComment } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { getCommentsForProduct } from '@/lib/supabase/comments';

import CommentModal from './CommentModal';

interface CommentsButtonsProps {
	product: ProductType;
}

const CommentsButton: React.FC<CommentsButtonsProps> = ({ product }) => {
	const [commentCount, setCommentCount] = useState(0);
	const [showCommentModal, setShowCommentModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	// Determine product id/key used in this app (fallbacks for different shapes)
	const productKey = (product as any).ProductID || (product as any).id || (product as any).Name || (product as any).slug || (product as any).Slug;

	const handleCommentClick = () => {
		const userId = (user as any)?.id || (user as any)?.uid || null;
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
		let mounted = true;
		const load = async () => {
			setLoading(true);
			try {
				if (!productKey) {
					setCommentCount(0);
					setLoading(false);
					return;
				}
				const comments = await getCommentsForProduct(productKey);
				if (!mounted) return;
				setCommentCount(Array.isArray(comments) ? comments.length : 0);
			} catch (err) {
				console.error('Failed to load comments', err);
			}
			setLoading(false);
		};
		load();
		return () => {
			mounted = false;
		};
	}, [productKey]);

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
