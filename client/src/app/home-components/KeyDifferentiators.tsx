import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import React from 'react';
import { GiFoodTruck } from 'react-icons/gi';
import { HiHomeModern } from 'react-icons/hi2';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

const KeyDifferentiators: React.FC = () => {
	return (
		<Section tittle='What Makes PA Luxe Creation Special?'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
				{/* Unique Combination */}
				<article>
					<Icon
						icon={GiFoodTruck}
						heading='Food & Car Care in One'
					/>
					<p className='mt-2'>
						Revolutionizing convenience with delicious, affordable meals and premium Photo boot
						services under one roof.
					</p>
				</article>

				{/* Competitive Pricing */}
				<article>
					<Icon
						icon={RiMoneyDollarCircleLine}
						heading='Unbeatable Value'
					/>
					<p className='mt-2'>
						Enjoy competitively priced Photo boot (20-30% cheaper!) and high-quality,
						budget-friendly meals.
					</p>
				</article>

				{/* Modern Technology */}
				<article>
					<Icon
						icon={HiHomeModern}
						heading='Modern Convenience'
					/>
					<p className='mt-2'>
						Benefit from an advanced booking system for Photo boot and a modern POS system for a
						smooth experience.
					</p>
				</article>
			</div>
		</Section>
	);
};

export default KeyDifferentiators;
