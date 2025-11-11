'use client';

import { CartProvider } from '@/context/CartContext';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { GiMeal } from 'react-icons/gi';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<CartProvider>
			<nav className='sticky bg-black/75 z-10 p-2 grid grid-cols-3 gap-2 top-9 '>
				<Link href='/menu'>Main menu</Link>

				<Link
					className=' text-sm flex items-center justify-center gap-1 truncate text-center bg-[red] py-0.5 px-5 rounded-md border-none cursor-pointer text-white font-bold'
					href={'orders/pending'}>
					<GiMeal />
					pending
				</Link>
				<Link
					className=' text-sm flex items-center justify-center gap-1 truncate text-center bg-[red] py-0.5 px-5 rounded-md border-none cursor-pointer text-white font-bold'
					href={'orders/processing'}>
					<GiMeal />
					processing
				</Link>
				<Link
					className=' text-sm flex items-center justify-center gap-1 truncate text-center bg-[red] py-0.5 px-5 rounded-md border-none cursor-pointer text-white font-bold'
					href={'orders/completed'}>
					<GiMeal />
					completed
				</Link>
			</nav>
			{children}
		</CartProvider>
	);
};

export default Layout;
