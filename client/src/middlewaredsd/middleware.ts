import type { CookieName } from '@/hooks/Cookies/setCookie';
import deleteCookie from '@/hooks/Cookies/setdelete';
import GetUser from '@/firebase/users/server/GetServerUser';
import setCookie from '@/hooks/Cookies/setCookie';
import { NextRequest, NextResponse } from 'next/server';
import getCookie from '@/hooks/Cookies/getdelete';
import { AuthenticationPaths, protectedPaths, publicPaths } from '@/context/RouteGuardContext';



interface UserProfile {
	email: string;
	role: UserRole;
}

// Cookie names
const USER_ID_COOKIE: CookieName = 'userId';
const USER_ROLE_COOKIE: CookieName = 'userRole';

// Cookie options
const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'strict' as const,
	path: '/',
	maxAge: 60 * 60 * 24 * 7, // 1 week
};

// Helper function to set authentication cookies
// Now accepts 'res' to set cookies on the response
const setAuthCookies = (userId: string, userRole: UserRole) => {
	setCookie(USER_ID_COOKIE, userId);
	setCookie(USER_ROLE_COOKIE, userRole);
};

// Helper function to clear authentication cookies
// Now accepts 'res' to delete cookies from the response
const clearAuthCookies = (res: NextResponse) => {
	deleteCookie(USER_ID_COOKIE);
	deleteCookie(USER_ROLE_COOKIE);
};

// Middleware for route protection (Next.js example)
const authMiddleware = async (req: NextRequest) => {
	const res = NextResponse.next();
	const url = req.nextUrl.clone();
	const pathname = url.pathname;

	// Define role-based access control
	const roleBasedPaths: Record<UserRole, string[]> = {
		coFounder: ['*'], // '*' means access to all paths
		Ceo: ['*'],
		Manager: ['*'],
		Cashier: [...publicPaths, ...protectedPaths, '/Admin/menu'],
		carWashStaff: [...publicPaths, ...protectedPaths, '/Admin/bookings'],
		kitchenStaff: [...publicPaths, ...protectedPaths, '/Admin/inventory'],
		Customer: [...publicPaths, ...protectedPaths],
		admin: ['*'],
	};

	// Check for authentication cookies using next/headers (for reading)
	const userId = await getCookie(USER_ID_COOKIE);
	const userRole = await getCookie(USER_ROLE_COOKIE) as UserRole | undefined

	let isAuthenticated = !!userId;
	let currentUserRole = userRole;

	if (!userId || !userRole) {
		try {
			const userData = await GetUser();
			if (userData) {
				currentUserRole = userData.role
				setAuthCookies(userData.uid, userData.role)
				isAuthenticated = true;
			} else {
				// User ID in cookie but not in Firestore - clear cookies
				isAuthenticated = false;
				clearAuthCookies(res);
			}
		} catch (error) {
			console.error('Error verifying user session:', error);
			isAuthenticated = false;
			clearAuthCookies(res);
		}
	}


	// Handle redirects for authenticated users trying to access auth pages
	if (isAuthenticated && AuthenticationPaths.includes(pathname)) {
		url.pathname = '/profile';
		return NextResponse.redirect(url);
	}

	// Handle redirects for unauthenticated users trying to access protected pages
	if (!isAuthenticated && protectedPaths.includes(pathname)) {
		url.pathname = '/Authentication/login';
		return NextResponse.redirect(url);
	}

	// Handle role-based access control for authenticated users
	if (isAuthenticated && currentUserRole) {
		const allowedPaths = roleBasedPaths[currentUserRole];

		if (allowedPaths && !allowedPaths.includes('*')) {
			const isPathAllowed = allowedPaths.some((allowedPath) =>
				pathname.startsWith(allowedPath)
			);

			if (!isPathAllowed) {
				console.warn(
					`User with role "${currentUserRole}" attempted to access "${pathname}"`
				);
				// Redirect to a forbidden page or dashboard
				url.pathname = '/'; // Redirect to home for now
				return NextResponse.redirect(url);
			}
		}
	}

	return res;
};

// export default authMiddleware;

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};