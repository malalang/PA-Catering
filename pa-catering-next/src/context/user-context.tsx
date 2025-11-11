'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, UserProfile } from '@/lib/firebase/auth';
import Loading from '@/components/ui/Loading';

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading message="Loading user data..." />;
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}