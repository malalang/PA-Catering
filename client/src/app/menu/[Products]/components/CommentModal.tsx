import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useParams, useRouter } from 'next/navigation';
interface CommentModalProps {
	product: ProductType;
	handleCloseCommentModal: () => void;
}
const CommentModal: React.FC<CommentModalProps> = ({ product, handleCloseCommentModal }) => {
	const [commentText, setCommentText] = useState('');
	const { user } = useAuth();
	const route = useRouter();
	const params = useParams() as { Products: string };
	const handleSubmitComment = async () => {
		if (!product?.Name || !commentText.trim() || !user?.id) {
			handleCloseCommentModal();
			return;
		}
		try {
			const supabase = createClient();
			await supabase.from('comments').insert({
				product_id: product.ProductID || product.Name,
				user_id: user?.id || null,
				user_name: (user as any)?.user_metadata?.full_name || (user as any)?.email || 'Anonymous',
				body: commentText.trim(),
				created_at: new Date().toISOString(),
			});
			setCommentText('');
			handleCloseCommentModal();
			route.push(`/menu/${params.Products}/${product.Name.toLowerCase().replace(/\s+/g, '-')}`);
		} catch (error) {
			console.error('Error adding comment:', error);
			alert('Failed to add comment. Please try again.');
		}
	};
	return (
		<main className='fixed inset-0 bg-black flex items-center justify-center z-50 p-4'>
			<div className='bg-black/50 p-6 rounded-md shadow-lg w-full max-w-md text-white'>
				<h2>Add a Comment</h2>
				<textarea
					className='w-full p-3 bg-transparent border border-white rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-white/70'
					rows={4}
					placeholder='Enter your comment...'
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}></textarea>
				<div className='flex justify-end gap-2'>
					<button
						className='px-4 py-2 bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-white'
						onClick={handleCloseCommentModal}>
						Cancel
					</button>
					<button
						className='px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-white'
						onClick={handleSubmitComment}>
						Submit Comment
					</button>
				</div>
			</div>
		</main>
	);
};

export default CommentModal;
