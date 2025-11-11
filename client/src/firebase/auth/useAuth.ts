import { useState, useEffect, use } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig';
import setCookie from '@/hooks/Cookies/setCookie';
import deleteCookie from '@/hooks/Cookies/setdelete';
import { doc, getDoc } from 'firebase/firestore';


/**
 * A custom hook to get the current authenticated user.
 * Listens to Firebase auth state changes and provides the user object.
 * @returns An object containing the user and a loading state.
 */
export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const setAuthCookie = (user: UserProfile) => {
    setCookie('userId', user.uid);
    setCookie('userRole', user.role);
  }

  const clearAuthCookie = () => {
    deleteCookie("userId")
    deleteCookie("userRole")
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // User is authenticated with Firebase Auth, now get their data from Firestore.
        try {
          const userDocRef = doc(firestore, 'users', authUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // User document found, set user state and cookies.
            const userData = userDocSnap.data() as UserProfile;
            setUser(userData);
            setAuthCookie(userData);
          } else {
            // This is an inconsistent state (auth user without a DB record).
            // Clear state and cookies to force a clean login.
            console.warn('User authenticated but no data found in Firestore.');
            setUser(null);
            clearAuthCookie();
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          clearAuthCookie();
        }
      } else {
        // No user is authenticated.
        setUser(null);
        clearAuthCookie();
      }
      // Finished initial check, set loading to false.
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading };
};
