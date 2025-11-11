'use client';
import AppLink from '@/components/ui/Link';
import Image from 'next/image';
import {
	FaUserCircle,
	FaShoppingCart,
	FaClipboardList,
	FaSignOutAlt,
	FaHome,
	FaInfoCircle,
	FaCar,
	FaEnvelope,
	FaUtensils,
	FaImages,
} from 'react-icons/fa';
import { logout } from '@/firebase/auth/logout';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { publicPaths, AuthenticationPaths, protectedPaths } from '@/context/RouteGuardContext';
import { useUser } from '@/context/UserContext';
import { FaBlog } from 'react-icons/fa6';

const DesktopNavbar: React.FC = () => {
	const { user } = useUser();
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
		<nav className='md:flex gap-2 hidden justify-between items-center p-0 m-0 w-full'>
			<Image
				src='/Central_Eatery_Logo.png'
				alt='Logo'
				width={64}
				height={64}
				className='h-16'
				priority
			/>
			<ul className='flex space-x-4 items-center'>
				{publicPaths.map((path) => (
					<li key={path}>
						<AppLink
							href={path}
							variant='secondary'>
							<span className='flex items-center gap-2'>
								{path === '/' && (
									<span className='flex items-center gap-2'>
										<FaHome /> Home
									</span>
								)}
								{path === '/about' && <FaInfoCircle />}
								{path === '/gallery' && <FaImages />}
								{path === '/carwash' && <FaCar />}
								{path === '/contact' && <FaEnvelope />}
								{path === '/blog' && <FaBlog />}
								{path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
							</span>
						</AppLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default DesktopNavbar;
