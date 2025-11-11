import React from 'react';
import Image from 'next/image';
import { BiSolidHeart, BiSolidComment, BiSolidShare } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { FaStar } from 'react-icons/fa';
import Section from '@/components/ui/layout/Section';

const FeaturedItemsServices: React.FC = () => {
	const featuredItems = [
		{
			name: 'Premium Car Wash',
			description: 'Get a luxurious clean with our premium car wash package.',
			image: '/Carwash.png',
		},
		{
			name: 'Signature Kota',
			description: 'Our famous, delicious Kota filled with tasty ingredients.',
			image: '/Menus/KotaMeal.png',
		},
		{
			name: 'Burger Meal',
			description:
				'A satisfying meal with a perfectly cooked burger, a 500ml drink, and extra chips.',
			image: '/Menus/BurgerMeal.png',
		},
	];

	return (
		<Section tittle='Featured Items & Services'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
				{featuredItems.map((item, index) => (
					<article
						key={index}
						className='overflow-hidden flex flex-col'>
						{item.image && (
							<Image
								src={item.image}
								alt={item.name}
								width={500}
								height={500}
							/>
						)}
						<div className='p-6 flex-grow text-left'>
							<h3 className='text-xl font-bold'>{item.name}</h3>
							<p className='mt-2 text-white'>{item.description}</p>
						</div>
						<div className='flex justify-around items-center p-4 border-t border-white/20 mt-auto'>
							<Button
								variant='icon'
								aria-label='Like item'>
								<BiSolidHeart
									size={24}
									className='text-white hover:text-red-500 transition-colors'
								/>
							</Button>
							<Button
								variant='icon'
								aria-label='Comment on item'>
								<BiSolidComment
									size={24}
									className='text-white hover:text-red-500 transition-colors'
								/>
							</Button>
							<Button
								variant='icon'
								aria-label='Share item'>
								<BiSolidShare
									size={24}
									className='text-white hover:text-red-500 transition-colors'
								/>
							</Button>
						</div>
					</article>
				))}
			</div>
		</Section>
	);
};

export default FeaturedItemsServices;
