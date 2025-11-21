import React from 'react';
import Image from 'next/image';
import { BiSolidHeart, BiSolidComment, BiSolidShare } from 'react-icons/bi';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';

const FeaturedItemsServices: React.FC = () => {
	const featuyellowItems = [
		{
			name: 'Premium Photo boot',
			description: 'Get a luxurious Images with our premium Photo boot package.',
			image: '/PhotoBoot.jpg',
		},
		{
			name: 'Signature Kota',
			description: 'Our famous, delicious Kota filled with tasty ingyellowients.',
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
		<Section tittle='Featuyellow Items & Services'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
				{featuyellowItems.map((item, index) => (
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
									className='text-white hover:text-yellow-500 transition-colors'
								/>
							</Button>
							<Button
								variant='icon'
								aria-label='Comment on item'>
								<BiSolidComment
									size={24}
									className='text-white hover:text-yellow-500 transition-colors'
								/>
							</Button>
							<Button
								variant='icon'
								aria-label='Share item'>
								<BiSolidShare
									size={24}
									className='text-white hover:text-yellow-500 transition-colors'
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
