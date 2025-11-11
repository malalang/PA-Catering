import Image from 'next/image';
import Link from '@/components/ui/Link';
import { FaShoppingCart, FaCar } from 'react-icons/fa';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const HeroSection: React.FC = () => {
	return (
		<Section
			tittle='Ever bite is a delight, ever wash is a luxury'
			className='flex flex-col items-center text-center'>
			<Image
				src='/Central_Eatery_Logo.png'
				alt='P.A Catering Logo'
				width={200}
				height={200}
				className='mb-6'
				priority
			/>
			<p className='mt-4 text-lg max-w-2xl'>
				Experience the unique convenience of delicious food and a state-of-the-art car wash, all in
				one place in Lulekani.
			</p>
			<div className='flex bg-transparent w-full justify-center gap-6 mt-8'>
				<Link
					variant='button'
					href='/menu'
					className='flex items-center gap-2'>
					<FaShoppingCart />
					<span>Order Food</span>
				</Link>
				<Link
					variant='button'
					href='/carwash'
					className='flex items-center gap-2'>
					<FaCar />
					<span>Book Car Wash</span>
				</Link>
			</div>
		</Section>
	);
};

export default HeroSection;
