'use client';
import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import Button from '@/components/ui/Button';

const MobileNavbar: React.FC<{
	setMenubar: (path: 'mobile' | 'profile') => void;
	mobileOpen: boolean;
}> = ({ mobileOpen, setMenubar }) => {
	return (
		<nav className='md:hidden w-full m-0 z-50 p-0'>
			<div className='flex flex-row items-center justify-between w-full '>
				<Button
					variant='icon'
					onClick={() => {
						setMenubar('mobile');
					}}
					title={mobileOpen ? 'Close menu' : 'Open menu'}
					aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
					<svg
						className='h-6 w-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						{mobileOpen ? (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						) : (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16m-7 6h7'
							/>
						)}
					</svg>
				</Button>
			</div>
		</nav>
	);
};

export default MobileNavbar;
