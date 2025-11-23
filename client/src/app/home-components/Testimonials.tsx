'use client';
import React, { useState } from 'react';
import { BiSolidLike, BiSolidComment, BiSolidShare } from 'react-icons/bi';
import { FaQuoteLeft } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useRouter } from 'next/navigation';

const Testimonials: React.FC = () => {
	const { user } = useAuth();
	const router = useRouter();

	const [testimonials, setTestimonials] = useState([
		{
			id: 1,
			text: "PA Luxe Creation offers the best Kota's in town and their Photo booth service is super convenient!",
			author: 'Happy Customer A',
			likes: 56,
			comments: 12,
			shares: 5,
		},
		{
			id: 2,
			text: 'I love being able to get my Photo booth while grabbing a quick, delicious meal. Great concept!',
			author: 'Satisfied Client B',
			likes: 48,
			comments: 9,
			shares: 7,
		},
		{
			id: 3,
			text: 'The team at PA Luxe Creation is always friendly and the service is top-notch. Highly recommended!',
			author: 'Regular Visitor C',
			likes: 73,
			comments: 18,
			shares: 11,
		},
	]);

	const handleLike = (testimonialId: number) => {
		if (!user) {
			router.push('/login');
			return;
		}
		setTestimonials(prev => prev.map(t =>
			t.id === testimonialId ? { ...t, likes: t.likes + 1 } : t
		));
	};

	const handleComment = (testimonialId: number) => {
		if (!user) {
			router.push('/login');
			return;
		}
		alert('Comment functionality - would open a modal or navigate to comments');
	};

	const handleShare = (testimonialId: number) => {
		if (!user) {
			router.push('/login');
			return;
		}
		if (navigator.share) {
			navigator.share({
				title: 'PA Luxe Creation Testimonial',
				text: 'Check out this customer review!',
				url: window.location.href,
			});
		} else {
			alert('Share functionality - URL copied to clipboard');
		}
	};

	return (
		<Section
			Icon={FaQuoteLeft}
			tittle='What Our Customers Say'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				{testimonials.map((testimonial) => (
					<article
						key={testimonial.id}
						className='rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md hover:border-yellow-400/50 transition-all duration-300 shadow-lg p-6 flex flex-col'>
						<div className='flex-grow'>
							<FaQuoteLeft className='text-2xl text-amber-400/50 mb-4' />
							<p className='italic text-slate-300 mb-4'>{testimonial.text}</p>
						</div>
						<div className='mt-auto'>
							<div className='flex items-center mb-4'>
								<span className='flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-md'>
									{testimonial.author.charAt(0).toUpperCase()}
								</span>
								<p className='font-semibold text-white ml-3'>{testimonial.author}</p>
							</div>
							<div className='flex justify-around items-center border-t border-white/20 pt-4 bg-white/5 -mx-6 px-6 -mb-6 pb-6 rounded-b-xl'>
								<Button
									variant='icon'
									onClick={() => handleLike(testimonial.id)}
									className='flex flex-col items-center gap-1'
									aria-label={`Like testimonial by ${testimonial.author}`}>
									<BiSolidLike
										size={20}
										className='text-white hover:text-yellow-500 transition-colors'
									/>
									<span className='text-xs text-slate-400'>{testimonial.likes}</span>
								</Button>
								<Button
									variant='icon'
									onClick={() => handleComment(testimonial.id)}
									className='flex flex-col items-center gap-1'
									aria-label={`Comment on testimonial by ${testimonial.author}`}>
									<BiSolidComment
										size={20}
										className='text-white hover:text-yellow-500 transition-colors'
									/>
									<span className='text-xs text-slate-400'>{testimonial.comments}</span>
								</Button>
								<Button
									variant='icon'
									onClick={() => handleShare(testimonial.id)}
									className='flex flex-col items-center gap-1'
									aria-label={`Share testimonial by ${testimonial.author}`}>
									<BiSolidShare
										size={20}
										className='text-white hover:text-yellow-500 transition-colors'
									/>
									<span className='text-xs text-slate-400'>{testimonial.shares}</span>
								</Button>
							</div>
						</div>
					</article>
				))}
			</div>
		</Section>
	);
};

export default Testimonials;
