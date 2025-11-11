import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';


/**
 * Updates a user's document in the Firestore 'users' collection.
 * @param uid The user's unique ID.
 * @param data A partial object of the user's data to update.
 */
export const updateUserDocument = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  if (!uid) {
    throw new Error('User ID is required to update the document.');
  }
  try {
    const userDocRef = doc(firestore, 'users', uid);
    await updateDoc(userDocRef, {
      ...data,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating user document:', error);
    throw new Error('Failed to update user profile.');
  }
};
