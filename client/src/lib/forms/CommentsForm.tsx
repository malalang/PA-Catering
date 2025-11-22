import { getCommentsForProduct } from '@/lib/supabase/comments';
import { redirect } from 'next/navigation';
import Section from '@/components/ui/layout/Section';
import Button from '@/components/ui/Button';

interface CommentsProps {
	ProductName: string;
}

const CommentsForm: React.FC<CommentsProps> = async ({ ProductName }) => {
       // NOTE: GetUser should be called server-side via Supabase session; placeholder for now
       // You should pass user as a prop or fetch from Supabase session
	const user: any = null; // TODO: Get authenticated user from Supabase session

       if (!user) {
	       return redirect('/Authentication/login');
       }

       let comments: Array<{ id: string; user_name: string | null; created_at: string; body: string }> = [];
       try {
	       comments = (await getCommentsForProduct(ProductName)) || [];
       } catch (err) {
	       console.error('Failed to load comments', err);
       }

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
							       {(comment.user_name || 'U').charAt(0).toUpperCase()}
						       </div>
						       <div className='flex-1'>
							       <div className='flex justify-between items-center'>
								       <span className='font-semibold '>{comment.user_name || 'Anonymous'}</span>
								       <span className='text-xs '>{new Date(comment.created_at).toLocaleString()}</span>
							       </div>
							       <p className='mt-1'>{comment.body}</p>
							       <button className='mt-2 text-sm text-yellow-400 hover:underline'>REPLY</button>
						       </div>
					       </div>
				       </li>
			       ))}
		       </ul>
		       <div className='mt-6 flex space-x-3'>
			       <div className='flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold'>
				       {(user?.user_metadata?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
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
