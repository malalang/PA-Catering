'use client';
import AppLink from '@/components/ui/Link';
import Image from 'next/image';
import {
	HiHome,
	HiInformationCircle,
	HiEnvelope,
	HiPhoto,
	HiCamera,
	HiDocumentText,
	HiShoppingBag,
} from 'react-icons/hi2';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { usePathname } from 'next/navigation';

const publicPaths = [
	{ path: '/', icon: HiHome, label: 'Home' },
	{ path: '/about', icon: HiInformationCircle, label: 'About' },
	{ path: '/gallery', icon: HiPhoto, label: 'Gallery' },
	{ path: '/contact', icon: HiEnvelope, label: 'Contact' },
	{ path: '/photo', icon: HiCamera, label: '360 Booth' },
	{ path: '/menu', icon: HiShoppingBag, label: 'Menu' },
];

const DesktopNavbar: React.FC = () => {
	const { user } = useAuth();
	const pathname = usePathname();
	const [profileOpen, setProfileOpen] = useState(false);
	const profileRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
				setProfileOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<nav className='hidden md:flex gap-4 justify-between items-center p-0 m-0 w-full'>
			<AppLink href='/' className='shrink-0'>
				<Image
					src='/PA_Logo.png'
					alt='PA Catering Logo'
					width={64}
					height={64}
					className='h-16 w-auto'
					priority
				/>
			</AppLink>

			<ul className='flex space-x-2 items-center'>
				{publicPaths.map(({ path, icon: Icon, label }) => {
					const isActive = pathname === path;
					return (
						<li key={path}>
							<AppLink
								href={path}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive
									? 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-400/30 text-amber-400 shadow-md shadow-amber-500/10'
									: 'text-yellow-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
									}`}>
								<Icon className={`text-lg ${isActive ? 'text-amber-400' : ''}`} />
								<span>{label}</span>
							</AppLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default DesktopNavbar;
