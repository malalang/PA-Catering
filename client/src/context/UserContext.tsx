'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import Loading from '@/components/ui/Loading';
import { RouteGuard } from './RouteGuardContext';
import { useAuth } from '@/firebase/auth/useAuth';

/**
 * Defines the shape of the new, simplified user context.
 */
interface UserContextType {
	user: UserProfile | null;
	loading: boolean;
}

// Create the UserContext with an initial undefined value.
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { user, loading } = useAuth();

	// Display a loading indicator while the user data is being fetched.
	if (loading) {
		return <Loading message='Loading user data...' />;
	}

	// Provide the user data, loading status, and error to the rest of the application.
	return (
		<UserContext.Provider value={{ user, loading }}>
			<RouteGuard>{children}</RouteGuard>
		</UserContext.Provider>
	);
};

/**
 * Custom hook to easily access the user context from anywhere in the app.
 * Throws an error if used outside of a UserProvider.
 */

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
