'use client';

import React, { createContext, useContext, ReactNode } from 'react';

import Loading from '@/components/ui/Loading';
import { useAuth } from '@/firebase/auth/useAuth';

/**
 * Defines the shape of the new, simplified user context.
 */
interface UserContextType {
	user: UserProfile | null;
	loading: boolean;
}

// Create the UserContext with an initial undefined value.
// Create the UserContext with a default value
const UserContext = createContext<UserContextType>({
	user: null,
	loading: false
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	try {
		const { user, loading } = useAuth();

		// Provide the user data and loading status to the rest of the application
		return (
			<UserContext.Provider value={{ user, loading }}>
				{children}
			</UserContext.Provider>
		);
	} catch (error) {
		// If there's an error (like during static generation), return default context
		return (
			<UserContext.Provider value={{ user: null, loading: false }}>
				{children}
			</UserContext.Provider>
		);
	}
};

/**
 * Custom hook to easily access the user context from anywhere in the app.
 * Throws an error if used outside of a UserProvider.
 */

export const useUser = (): UserContextType => {
    return useContext(UserContext);
};
