'use client';

import { CartProvider } from '@/lib/context/CartContext';
import { ToastProvider } from '@/lib/context/CartContext';

import React, { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<ToastProvider>
			<CartProvider>{children}</CartProvider>
		</ToastProvider>
	);
};

export default Layout;
