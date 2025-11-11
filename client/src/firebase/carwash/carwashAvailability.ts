import { collection, query, where, getDocs, doc, setDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

// Define interface for car wash availability data
interface CarWashAvailability {
  date: string; // YYYY-MM-DD format
  availableSlots: string[]; // Array of time slots (e.g., ["09:00", "09:30", "10:00"])
  // Add other relevant availability data, e.g., number of bays available, staff on duty
}
/**
 * Fetches car wash availability data for a given date.
 * @param dateString The date in YYYY-MM-DD format.
 * @returns A promise that resolves with the availability data or null if not found.
 */
export const getCarWashAvailabilityForDate = async (dateString: string): Promise<CarWashAvailability | null> => {

  try {
    const q = query(
      collection(firestore, 'carWashAvailability'),
      where('date', '==', dateString)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // No availability data found for this date
    }

    // Assuming only one document per date

    const docData = querySnapshot.docs[0].data();
    return docData as CarWashAvailability;


  } catch (e) {
    console.error('Error fetching car wash availability: ', e);
    throw new Error('Failed to fetch car wash availability.');
  }
};

/**
 * Sets or updates car wash availability data for a given date.
 * This is likely for admin use.
 * @param availabilityData The availability data to set.
 * @returns A promise that resolves when the data is set.
 */
export const setCarWashAvailabilityForDate = async (availabilityData: CarWashAvailability): Promise<void> => {
  try {
    const docRef = doc(firestore, 'carWashAvailability', availabilityData.date); // Use date as document ID
    await setDoc(docRef, availabilityData, { merge: true }); // Use merge to update existing document
  } catch (e) {
    console.error('Error setting car wash availability: ', e);
    throw new Error('Failed to set car wash availability.');
  }
};

/**
 * Updates car wash availability data for a specific time slot on a given date by removing the booked slot.
 * @param dateString The date in YYYY-MM-DD format.
 * @param date The Date object for the booking date.
 * @param timeSlot The time slot to remove (e.g., "09:00").
 * @returns A promise that resolves when the data is updated.
 */
export const updateCarWashAvailability = async (date: Date, timeSlot: string): Promise<void> => {
  try {
    const docRef = doc(firestore, 'carWashAvailability', date.toISOString().split('T')[0]); // Use YYYY-MM-DD format as document ID
    await updateDoc(docRef, {
      availableSlots: arrayRemove(timeSlot),
    });
  } catch (e) {
    console.error('Error updating car wash availability: ', e);
    throw new Error('Failed to update car wash availability.');
  }
};

