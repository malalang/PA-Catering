'use client';

import React, { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from './UserContext';
import Loading from '@/components/ui/Loading';

// --- Route Protection Logic --- //
export const publicPaths = ['/', '/contact', '/about', '/gallery', '/carwash', '/terms', '/blog'];
export const AuthenticationPaths = ['/Authentication/login', '/Authentication/register'];
export const protectedPaths = ['/profile', '/orders', '/carwash/booking', '/menu'];
export const adminPaths = [
	'/Admin/menu',
	'/Admin/order',
	'/Admin/carwash',
	'/Admin/inventory',
	'/Admin/dashboard',
	'/Admin/seed',
];

export const roleBasedPaths: Record<UserRole, string[]> = {
	coFounder: ['*'],
	Ceo: ['*'],
	Manager: ['*'],
	Cashier: [...publicPaths, ...protectedPaths, '/Admin/menu'],
	carWashStaff: [...publicPaths, ...protectedPaths, '/Admin/carwash'],
	kitchenStaff: [...publicPaths, ...protectedPaths, '/Admin/inventory', '/Admin/order'],
	Customer: [...publicPaths, ...protectedPaths],
	admin: ['*'],
};

export function normalizePath(path: string) {
	// Always start with '/'; remove trailing slash except root
	if (!path.startsWith('/')) path = '/' + path;
	if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
	return path;
}

export const RouteGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { user, loading } = useUser();
	const router = useRouter();
	const pathname = normalizePath(usePathname());

	useEffect(() => {
		if (loading) return; // Wait until user data is loaded

		const isPublic = publicPaths.some(
			(path) => pathname === normalizePath(path) || pathname.startsWith(normalizePath(path) + '/')
		);
		const isProtected = protectedPaths.some(
			(path) => pathname === normalizePath(path) || pathname.startsWith(normalizePath(path) + '/')
		);
		const isAuthentication = AuthenticationPaths.some(
			(path) => pathname === normalizePath(path) || pathname.startsWith(normalizePath(path) + '/')
		);

		if (!user && isProtected) {
			router.push('/Authentication/login');
			return;
		}

		if (user) {
			if (isAuthentication) {
				router.push('/profile');
				return;
			}

			const allowedPaths = roleBasedPaths[user.role];
			if (allowedPaths && !allowedPaths.includes('*')) {
				const isPathAllowed = allowedPaths.some(
					(path) =>
						pathname === normalizePath(path) || pathname.startsWith(normalizePath(path) + '/')
				);
				if (!isPathAllowed) {
					router.push('/profile'); // Redirect to a default safe page
				}
			}
		}
	}, [user, loading, pathname, router]);

	if (loading) {
		return <Loading message='Checking credentials...' />;
	}

	return <>{children}</>;
};
