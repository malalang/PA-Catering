'use client';

import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/CartContext';
// import { RouteGuard } from '@/context/RouteGuardContext';
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
