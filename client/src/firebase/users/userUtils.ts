import { doc, getDoc, setDoc, updateDoc, serverTimestamp, UpdateData, Timestamp } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';


/**
 * Fetches a user document from Firestore by UID.
 * @param uid The user's unique ID.
 * @returns A promise that resolves with the user's data or null if not found.
 */
export const getUser = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(firestore, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // We need to manually convert Timestamps to Dates
    const data = userSnap.data();
    return {
      ...data,
      createdAt: data.createdAt?.toDate(),
      lastLogin: data.lastLogin?.toDate(),
    } as UserProfile;
  }
  return null;
};

/**
 * Creates a new user document in Firestore, typically on sign-up.
 * @param uid The user's unique ID.
 * @param data The initial data for the user.
 */
export const createUserProfile = async (uid: string, data: Partial<Omit<UserProfile, 'uid'>>): Promise<void> => {
  const userRef = doc(firestore, 'users', uid);
  const now = serverTimestamp() as unknown as Date;

  const newUser: Partial<UserProfile> = {
    uid,
    role: 'Customer',
    loyaltyPointsBalance: 0,
    tierStatus: 'Bronze',
    rewardsAvailable: [],
    redemptionHistory: [],
    personalizedPromotions: [],
    referralCode: `REF-${uid.slice(0, 6).toUpperCase()}`,
    carWashCount: 0,
    preferences: {
      dietaryRestrictions: [],
      favoriteItems: [],
      preferredCarWashServices: [],
      preferredPaymentMethod: 'instore',
      communicationPreferences: {
        email: true,
        sms: false,
        promotions: true,
      },
    },
    ...data, // Allow overriding defaults with provided data
    createdAt: now, // Firestore will convert this to a Timestamp
    lastLogin: now, // Firestore will convert this to a Timestamp
  };

  await setDoc(userRef, newUser);
};

/**
 * Updates a user's document in Firestore.
 * @param uid The user's unique ID.
 * @param data The data to update.
 */
export const updateUser = async (uid: string, data: UpdateData<UserProfile>): Promise<void> => {
  const userRef = doc(firestore, 'users', uid);
  await updateDoc(userRef, data);
};
