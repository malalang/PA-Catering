// components/KeyHighlights.tsx
import React from 'react';
import { IoBusiness, IoPricetag, IoCalendar } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const KeyHighlights = () => {
	return (
		<Section tittle='Key Highlights of Central Eatery'>
			<div className='grid grid-cols-1 md:grid-cols-2  gap-2 '>
				{/* Highlight 1: Unique Combination of Services */}
				<article>
					<Icon icon={IoBusiness} />
					<h3>Unique Service Combination</h3>
					<p className=' text-center'>
						Central Eatery stands out by offering a convenient combination of a car wash and an
						eatery, catering to multiple needs in one stop.
					</p>
				</article>

				{/* Highlight 2: Competitive Car Wash Pricing */}
				<article>
					<Icon icon={IoPricetag} />
					<h3>Competitive Car Wash Pricing</h3>
					<p className=' text-center'>
						We offer attractive and competitive pricing for our car wash services, providing
						excellent value for our customers.
					</p>
				</article>

				{/* Highlight 3: Advanced Booking and Modern POS */}
				<article>
					<Icon icon={IoCalendar} />
					<h3>Advanced Systems</h3>
					<p className=' text-center'>
						Utilizing an advanced booking system and modern POS integration for a seamless and
						efficient customer experience.
					</p>
				</article>
			</div>
		</Section>
	);
};

export default KeyHighlights;
