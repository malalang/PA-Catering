'use client';

import { CartProvider } from '@/lib/context/CartContext';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { HiShoppingBag, HiClock, HiCog, HiCheckCircle, HiArrowLeft } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const pathname = usePathname();

	const navItems = [
		{ href: '/orders/pending', label: 'Pending', icon: HiClock },
		{ href: '/orders/processing', label: 'Processing', icon: HiCog },
		{ href: '/orders/completed', label: 'Completed', icon: HiCheckCircle },
	];

	return (
		<CartProvider>
			{/* Enhanced Navigation */}
			<nav className='sticky top-[73px] bg-gradient-to-r from-slate-900/98 to-slate-800/98 backdrop-blur-xl border-b border-amber-400/10 shadow-lg z-40 px-4 py-3'>
				<div className='max-w-7xl mx-auto flex items-center gap-4'>
					{/* Back to Menu Button */}
					<Link
						href='/menu'
						className='flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200 font-medium'>
						<HiArrowLeft className='text-lg' />
						<span className='hidden sm:inline'>Menu</span>
					</Link>

					{/* Divider */}
					<div className='h-8 w-px bg-white/10'></div>

					{/* Status Filter Tabs */}
					<div className='flex gap-2 flex-1 overflow-x-auto'>
						{navItems.map(({ href, label, icon: Icon }) => {
							const isActive = pathname === href;
							return (
								<Link
									key={href}
									href={href}
									className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${isActive
											? 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-400/30 text-amber-400 shadow-md shadow-amber-500/10'
											: 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
										}`}>
									<Icon className={`text-lg ${isActive ? 'text-amber-400' : ''}`} />
									<span className='text-sm sm:text-base'>{label}</span>
								</Link>
							);
						})}
					</div>

					{/* Orders Icon (decorative) */}
					<div className='hidden md:flex items-center gap-2 text-slate-400'>
						<HiShoppingBag className='text-xl text-amber-400' />
						<span className='text-sm'>Orders</span>
					</div>
				</div>
			</nav>

			{children}
		</CartProvider>
	);
};

export default Layout;
