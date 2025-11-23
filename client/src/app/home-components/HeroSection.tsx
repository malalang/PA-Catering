import Image from 'next/image';
import Link from '@/components/ui/Link';
import { FaShoppingCart } from 'react-icons/fa';
import Section from '@/components/ui/layout/Section';
import { BiCamera } from 'react-icons/bi';
const HeroSection: React.FC = () => {
	return (
		<Section
			tittle='Ever bite is a delight, ever wash is a luxury'
			className='flex flex-col items-center text-center'>
			<Image
				src='/PA_Logo.png'
				alt='PA Luxe Creation Logo'
				width={200}
				height={200}
				priority
			/>
			<p className='mt-4 text-lg text-shadow-sm text-shadow-black/50 font-bold max-w-2xl'>
				Experience the unique convenience of delicious food and a state-of-the-art Photo boot, all in
				one place in Evander.
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
					href='/photo'
					className='flex items-center gap-2'>
					<BiCamera />
					<span>Book 360 phot boot</span>
				</Link>
			</div>
		</Section>
	);
};

export default HeroSection;
