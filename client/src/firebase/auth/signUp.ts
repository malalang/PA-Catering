import {
	createUserWithEmailAndPassword,
	User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // removed getFirestore
import { auth, firestore } from '../firebaseConfig';


export const signUp = async (email: string, password: string, displayName: string, phoneNumber?: string): Promise<User | null> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		if (user) {

			// Store additional user data in Firestore
			const userProfile: UserProfile = {
				uid: user.uid,
				email: user.email,
				emailVerified: user.emailVerified,
				displayName: displayName,
				photoURL: user.photoURL,
				phoneNumber: phoneNumber || null, // Use provided phone number or null
				role: 'Customer', // Default role
				address: '',
				city: '',
				state: '',
				zipCode: '',
				country: '',
				theme: 'system', // Default theme
				orderHistory: [], // Initialize with empty array
				loyaltyPointsBalance: 0, // Initialize with 0
				tierStatus: 'Bronze', // Default tier status
				rewardsAvailable: [], // Initialize with empty array
				redemptionHistory: [], // Initialize with empty array
				personalizedPromotions: [], // Initialize with empty array
				referralCode: '', // Initialize with empty string
				preferences: {
					dietaryRestrictions: [],
					favoriteItems: [],
					communicationPreferences: {
						email: false,
						sms: false,
						promotions: false
					},
					preferredPaymentMethod: 'instore',
					preferredCarWashServices: []
				}, // Initialize with 
				savedPaymentMethods: [],
				createdAt: new Date(),
				carWashCount: 0, // Initialize with 0
				updatedAt: new Date()
			};
			await setDoc(doc(firestore, 'users', user.uid), userProfile);
		}
		return user;
	} catch (error: unknown) {
		console.error('Error signing up:', error);
		if (typeof error === 'object' && error && 'code' in error) {
			const firebaseError = error as { code: string };
			if (firebaseError.code === 'auth/email-already-in-use') {
				throw new Error('The email address is already in use.');
			} else if (firebaseError.code === 'auth/invalid-email') {
				throw new Error('The email address is not valid.');
			} else if (firebaseError.code === 'auth/operation-not-allowed') {
				throw new Error('Operation not allowed. Please contact support.');
			} else if (firebaseError.code === 'auth/weak-password') {
				throw new Error('The password is too weak.');
			}
		}
		throw error;
	}
};