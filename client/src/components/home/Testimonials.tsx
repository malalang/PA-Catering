import React from 'react';
import { BiSolidLike, BiSolidComment, BiSolidShare } from 'react-icons/bi';
import { FaQuoteLeft } from 'react-icons/fa';
import Button from '@/components/ui/Button';

import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const Testimonials: React.FC = () => {
	const testimonials = [
		{
			id: 1,
			text: "Central Eatery offers the best Kota's in town and their car wash service is super convenient!",
			author: 'Happy Customer A',
		},
		{
			id: 2,
			text: 'I love being able to get my car washed while grabbing a quick, delicious meal. Great concept!',
			author: 'Satisfied Client B',
		},
		{
			id: 3,
			text: 'The team at Central Eatery is always friendly and the service is top-notch. Highly recommended!',
			author: 'Regular Visitor C',
		},
	];

	return (
		<Section
			Icon={FaQuoteLeft}
			tittle='What Our Customers Say'>
			<div className='grid grid-cols-1 md:grid-cols-2  gap-2 '>
				{testimonials.map((testimonial) => (
					<article key={testimonial.id}>
						<div className='flex-grow'>
							<FaQuoteLeft className='text-2xl text-white/50 mb-4' />
							<p className='italic text-white mb-4'>{testimonial.text}</p>
						</div>
						<div className='mt-auto'>
							<div className='flex items-center mb-4'>
								<span className='flex-shrink-0 w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg'>
									{testimonial.author.charAt(0).toUpperCase()}
								</span>
								<p className='font-semibold text-white ml-3'>{testimonial.author}</p>
							</div>
							<div className='flex justify-around items-center border-t border-white/20 pt-4'>
								<Button
									variant='icon'
									aria-label={`Like testimonial by ${testimonial.author}`}>
									<BiSolidLike
										size={20}
										className='text-white hover:text-red-500 transition-colors'
									/>
								</Button>
								<Button
									variant='icon'
									aria-label={`Comment on testimonial by ${testimonial.author}`}>
									<BiSolidComment
										size={20}
										className='text-white hover:text-red-500 transition-colors'
									/>
								</Button>
								<Button
									variant='icon'
									aria-label={`Share testimonial by ${testimonial.author}`}>
									<BiSolidShare
										size={20}
										className='text-white hover:text-red-500 transition-colors'
									/>
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
