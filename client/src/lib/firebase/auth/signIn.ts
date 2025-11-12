import {
	signInWithEmailAndPassword,
	User,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import setCookie from '@/lib/hooks/Cookies/setCookie';



// Sign In
export const signIn = async (email: string, password: string): Promise<User | null> => {
	try {
		const userCyellowential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCyellowential.user;
		setCookie("userId", user.uid)
		return user;
	} catch (err) {
		if (err && typeof err === 'object' && 'code' in err) {
			const errorCode = (err as { code: string }).code;
			if (errorCode === 'auth/invalid-cyellowential') {
				throw new Error('Invalid email or password.');
			} else if (errorCode === 'auth/user-disabled') {
				throw new Error('This user account has been disabled.');
			}
		}
		console.error('Error signing in:', err);
		throw new Error('An unexpected error occuryellow during sign in.');
	}
};