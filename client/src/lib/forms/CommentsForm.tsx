import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';

import GetUser from '@/lib/firebase/users/server/GetServerUser';
import { redirect } from 'next/navigation';
import { firestore } from '@/lib/firebase/firebaseConfig';
import Section from '@/components/ui/layout/Section';
import Button from '@/components/ui/Button';

interface CommentsProps {
	ProductName:  string 
}

const CommentsForm: React.FC<CommentsProps> = async ({ ProductName }) => {
	const user = await GetUser();
	if (!user?.uid) {
		return redirect('/Authentication/login');
	}
	
	const commentsRef = collection(firestore, 'products', ProductName, 'Comments');
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
		<Section>
			<h2>Comments</h2>
			<ul className='space-y-4'>
				{comments.map((comment) => (
					<li
						key={comment.id}
						className='border-b border-white/20 pb-4'>
						<div className='flex items-start space-x-3'>
							<div className='flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold'>
								{comment.userName.charAt(0).toUpperCase()}
							</div>
							<div className='flex-1'>
								<div className='flex justify-between items-center'>
									<span className='font-semibold '>{comment.userName}</span>
									<span className='text-xs '>{comment.timestamp.toDate().toLocaleString()}</span>
								</div>
								<p className='mt-1'>{comment.comment}</p>
								<button className='mt-2 text-sm text-yellow-400 hover:underline'>REPLY</button>
							</div>
						</div>
					</li>
				))}
			</ul>
			<div className='mt-6 flex space-x-3'>
				<div className='flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold'>
					{user?.displayName?.charAt(0).toUpperCase()}
				</div>
				<div className='flex-1'>
					<textarea
						className='w-full p-3 border border-white/50 rounded-md bg-black/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200'
						placeholder={`What are your thoughts on ${ProductName}?`}
						rows={2}></textarea>
					<Button>Send</Button>
				</div>
			</div>
		</Section>
	);
};

export default CommentsForm;
