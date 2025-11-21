import { getCommentsForProduct } from '@/lib/supabase/comments';
import Button from '@/components/ui/Button';
import { BiCommentAdd } from 'react-icons/bi';
import Section from '@/components/ui/layout/Section';

interface CommentsProps {
	product: ProductType;
}

/**
 * Displays comments for a given product.
 * Fetches comments for the specific product from Supabase.
 * Note: Comment submission is handled via client-side components.
 * @param product The product for which to display comments.
 */
const Comments: React.FC<CommentsProps> = async ({ product }) => {
	// Determine product id/key used in this app (fallbacks for different shapes)
	const productKey = (product as any).ProductID || (product as any).id || (product as any).Name || (product as any).slug || (product as any).Slug;
	
	let comments: any[] = [];
	try {
		if (productKey) {
			comments = (await getCommentsForProduct(productKey)) || [];
		}
	} catch (err) {
		console.error('Failed to load comments', err);
	}

	return (
		<Section tittle='Reviews & Comments'>
			{/* Existing Comments */}
			<ul className='space-y-6'>
				{comments.length > 0 ? (
					comments.map((comment) => (
						<li
							key={comment.id}
							className='bg-black/20 border border-white/50 rounded-md p-4'>
							<div className='flex items-start gap-4'>
								<div className='flex-shrink-0 w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
									{(comment.user_name || 'U').charAt(0).toUpperCase()}
								</div>
								<div className='flex-1'>
									<div className='flex justify-between items-center mb-1'>
										<span className='font-bold text-white'>{comment.user_name || 'Anonymous'}</span>
										<span className='text-xs text-white/70'>
											{new Date(comment.created_at).toLocaleDateString()}
										</span>
									</div>
									<p className='text-white'>{comment.body}</p>
									<button className='mt-3 px-3 py-1 bg-yellow-600 text-white text-xs font-semibold rounded-md hover:bg-yellow-600/100 transition-colors duration-200'>
										Reply
									</button>
								</div>
							</div>
						</li>
					))
				) : (
					<li className='text-center text-white/70 py-4'>
						No comments yet. Be the first to review!
					</li>
				)}
			</ul>
		</Section>
	);
};

export default Comments;
