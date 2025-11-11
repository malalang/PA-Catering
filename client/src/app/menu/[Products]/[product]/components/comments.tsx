import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

import GetUser from '@/firebase/users/server/GetServerUser';
import { firestore } from '@/firebase/firebaseConfig';
import Button from '@/components/ui/Button';
import { BiCommentAdd } from 'react-icons/bi';
import Section from '@/components/ui/layout/Section';

interface CommentsProps {
	product: ProductType;
}

/**
 * Displays comments for a given product and allows the user to add a new comment.
 * Fetches comments for the current user and product from Firestore.
 * @param product The product for which to display comments.
 */
const Comments: React.FC<CommentsProps> = async ({ product }) => {
	const user = await GetUser();
	// In a real app, you'd fetch comments for the specific product.Name
	const commentsRef = collection(firestore, 'products', product.Name, 'Comments');
	const q = query(commentsRef, where('userId', '==', user?.uid));
	const querySnapshot = await getDocs(q);

	const comments = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as {
			userId: string;
			userName: string;
			comment: string;
			timestamp: Timestamp;
		}),
	}));

	return (
		<Section tittle='Reviews & Comments'>
			{/* New Comment Form */}
			{user && (
				<article className='sticky top-0 z-10'>
					<div className='flex items-start gap-4'>
						<div className='flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
							{user.displayName?.charAt(0).toUpperCase()}
						</div>
						<div className='flex-1'>
							<textarea
								className='w-full p-3 border border-white/50 rounded-md bg-black/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200'
								placeholder={`Commenting as ${user.displayName}...`}
								rows={3}></textarea>
							<Button className='mt-3 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-700 focus:ring-white'>
								<BiCommentAdd size={25} /> Post Comment
							</Button>
						</div>
					</div>
				</article>
			)}

			{/* Existing Comments */}
			<ul className='space-y-6'>
				{comments.length > 0 ? (
					comments.map((comment) => (
						<li
							key={comment.id}
							className='bg-black/20 border border-white/50 rounded-md p-4'>
							<div className='flex items-start gap-4'>
								<div className='flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg'>
									{comment.userName.charAt(0).toUpperCase()}
								</div>
								<div className='flex-1'>
									<div className='flex justify-between items-center mb-1'>
										<span className='font-bold text-white'>{comment.userName}</span>
										<span className='text-xs text-white/70'>
											{comment.timestamp.toDate().toLocaleDateString()}
										</span>
									</div>
									<p className='text-white'>{comment.comment}</p>
									<button className='mt-3 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-600/100 transition-colors duration-200'>
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
