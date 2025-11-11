'use client';
import React, { useState, useEffect } from 'react';
import { FaGift, FaCar, FaHamburger } from 'react-icons/fa';

const promotions = [
	{
		icon: <FaGift className='text-4xl text-white drop-shadow-lg' />,
		title: 'Weekend Special!',
		message: "Free pork plate with every car wash (Sat/Sun). Don't miss out!",
	},
	{
		icon: <FaCar className='text-4xl text-white drop-shadow-lg' />,
		title: 'Taxi Fleet Discount',
		message: 'Bulk taxi washes: Buy 10, get 1 free! Perfect for operators.',
	},
	{
		icon: <FaHamburger className='text-4xl text-white drop-shadow-lg' />,
		title: 'Meal Loyalty',
		message: 'Buy 10 meals, get a free car wash. Ask for your digital loyalty card!',
	},
];

const PromotionsBanner: React.FC = () => {
	const [index, setIndex] = useState(0);
	const [fade, setFade] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setFade(false);
			setTimeout(() => {
				setIndex((prev) => (prev + 1) % promotions.length);
				setFade(true);
			}, 500); // Corresponds to transition duration
		}, 6000);
		return () => clearTimeout(timer);
	}, [index]);

	const promo = promotions[index];

	const handleNavClick = (i: number) => {
		if (i === index) return;
		setFade(false);
		setTimeout(() => {
			setIndex(i);
			setFade(true);
		}, 500);
	};

	return (
		<div className='bg-black/50 blur-[0.1px] backdrop-blur-md p-4 sticky bottom-0 left-0 w-full z-10 border-t border-white/20'>
			<div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
				<div
					className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
					key={index}>
					<div className='flex flex-col sm:flex-row items-center text-center sm:text-left gap-4'>
						<div className='flex-shrink-0'>{promo.icon}</div>
						<div>
							<h3
								className='text-xl font-bold text-white'
								style={{ filter: 'drop-shadow(0 0 3px #ff0000)' }}>
								{promo.title}
							</h3>
							<p className='text-white mt-1 text-sm sm:text-base'>{promo.message}</p>
						</div>
					</div>
				</div>
				<div className='flex justify-center w-full mt-3'>
					<div className='flex gap-2.5'>
						{promotions.map((_, i) => (
							<button
								key={i}
								className={`w-2.5 h-2.5 rounded-full border border-white/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-red-500 ${
									i === index ? 'bg-white scale-110' : 'bg-transparent hover:bg-white/30'
								}`}
								aria-label={`Show promotion ${i + 1}`}
								onClick={() => handleNavClick(i)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PromotionsBanner;
