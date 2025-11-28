'use client';
import React, { useState, useEffect } from 'react';
import { BiSolidComment, BiSolidShare } from 'react-icons/bi';
import { FaQuoteLeft } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { useRouter } from 'next/navigation';
import LikesButton from '@/app/menu/[Products]/components/LikesButton';
import { createClient } from '@/lib/supabase/client';

interface Testimonial {
	id: string;
	text: string;
	author: string;
	rating: number;
	likes: string[] | null;
	comments: any[] | null;
}

const Testimonials: React.FC = () => {
	const { user } = useAuth();
	const router = useRouter();
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

	useEffect(() => {
		const fetchTestimonials = async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from('testimonials')
				.select('*')
				.order('created_at', { ascending: false });

			if (error) {
				console.error('Error fetching testimonials:', error);
			} else {
				setTestimonials(data || []);
			}
		};
		fetchTestimonials();
	}, []);

	const handleComment = (testimonialId: string) => {
		if (!user) {
			router.push('/login');
			return;
		}
		alert('Comment functionality - would open a modal or navigate to comments');
	};

	const handleShare = (testimonialId: string) => {
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
						className=' rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md hover:border-yellow-400/50 transition-all duration-300 shadow-lg p-6 flex flex-col'>
						<div className='flex-grow'>
							<FaQuoteLeft className='text-2xl text-amber-400/50 mb-4' />
							<p className='italic text-yellow-300 mb-4'>{testimonial.text}</p>
						</div>
						<div className='mt-auto'>
							<div className='flex items-center mb-4'>
								<span className='flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg shadow-md'>
									{testimonial.author.charAt(0).toUpperCase()}
								</span>
								<p className='font-semibold text-white ml-3'>{testimonial.author}</p>
							</div>
							<div className='flex justify-around items-center border-t border-white/20 pt-4 bg-white/5 -mx-6 px-6 -mb-6 pb-6 rounded-b-xl'>
								<div className="flex flex-col items-center gap-1">
									<LikesButton itemId={testimonial.id} table="testimonials" />
								</div>
								<Button
									variant='icon'
									onClick={() => handleComment(testimonial.id)}
									className='flex flex-col items-center gap-1'
									aria-label={`Comment on testimonial by ${testimonial.author}`}>
									<BiSolidComment
										size={20}
										className='text-white hover:text-yellow-500 transition-colors'
									/>
									<span className='text-xs text-yellow-400'>{(testimonial.comments as any[])?.length || 0}</span>
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
									<span className='text-xs text-yellow-400'>Share</span>
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
