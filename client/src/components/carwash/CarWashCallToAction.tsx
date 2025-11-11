import React from 'react';
import AppLink from '@/components/ui/Link';
import Button from '@/components/ui/Button';

import Icon from '@/components/ui/Icon';
import { FaCar } from 'react-icons/fa';
import { GiPriceTag } from 'react-icons/gi';
import Link from 'next/link';
import Section from '../ui/layout/Section';

const CarWashCallToAction: React.FC = () => {
	return (
		<Link href='/carwash/booking'>
			<Section
				Icon={FaCar}
				tittle='Ready for a Sparkling Clean Car?'>
				<p className='mt-4 text-lg text-white max-w-2xl mx-auto'>
					Experience the luxury and convenience of Central Eatery&apos;s car wash services. Book
					your wash today!
				</p>
				<div className='mt-8 flex justify-center items-center gap-4'>
					<AppLink
						className='bg-red-900 hover:bg-red-900'
						variant='button'
						href='/carwash/booking'>
						<FaCar /> Book Your Car Wash
					</AppLink>
					<AppLink
						variant='button'
						href='/carwash#pricing'>
						<GiPriceTag /> View Pricing
					</AppLink>
				</div>
			</Section>
		</Link>
	);
};

export default CarWashCallToAction;
