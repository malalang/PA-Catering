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
			tittle='Client Stories'
			className="overflow-hidden">

			<div className="relative">
				{/* Horizontal Scroll Container */}
				<div className='flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide'>
					{testimonials.map((testimonial) => (
						<article
							key={testimonial.id}
							className='snap-center flex-shrink-0 w-[85vw] md:w-[400px] rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-8 flex flex-col relative group transition-all duration-500 hover:bg-white/10 hover:border-amber-500/30'>

							{/* Decorative Quote */}
							<div className="absolute top-6 right-8 text-6xl text-amber-500/10 font-serif leading-none group-hover:text-amber-500/20 transition-colors">"</div>

							{/* Author Header */}
							<div className='flex items-center gap-4 mb-6'>
								<span className='flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-xl shadow-lg shadow-amber-900/40'>
									{testimonial.author.charAt(0).toUpperCase()}
								</span>
								<div>
									<p className='font-bold text-white text-lg font-small-caps tracking-wide'>{testimonial.author}</p>
									<div className="flex text-amber-500 text-xs gap-0.5">
										{[...Array(5)].map((_, i) => (
											<span key={i}>★</span>
										))}
									</div>
								</div>
							</div>

							{/* Content */}
							<div className='flex-grow mb-8 relative z-10'>
								<p className='text-white/80 italic leading-relaxed text-lg font-light'>"{testimonial.text}"</p>
							</div>

							{/* Actions Footer */}
							<div className='mt-auto flex items-center justify-between border-t border-white/10 pt-6'>
								<div className="scale-90 origin-left">
									<LikesButton itemId={testimonial.id} table="testimonials" />
								</div>
								<div className="flex gap-2">
									<Button
										variant='icon'
										onClick={() => handleComment(testimonial.id)}
										className='p-2 hover:bg-white/10 rounded-full transition-colors group/btn'
										aria-label={`Comment`}>
										<BiSolidComment
											size={18}
											className='text-white/40 group-hover/btn:text-amber-400 transition-colors'
										/>
									</Button>
									<Button
										variant='icon'
										onClick={() => handleShare(testimonial.id)}
										className='p-2 hover:bg-white/10 rounded-full transition-colors group/btn'
										aria-label={`Share`}>
										<BiSolidShare
											size={18}
											className='text-white/40 group-hover/btn:text-amber-400 transition-colors'
										/>
									</Button>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</Section>
	);
};

export default Testimonials;
