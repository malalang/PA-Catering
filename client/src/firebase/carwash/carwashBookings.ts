import { collection, addDoc, query, where, getDocs, Timestamp, updateDoc, doc, deleteDoc, orderBy, DocumentSnapshot, DocumentData, getDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';


/**
 * Adds a new car wash booking to Firestore.
 * @param bookingData The data for the new booking.
 * @returns A promise that resolves with the ID of the newly created document.
 */
/**
 * A helper function to safely map a Firestore document to a CarWashBooking object.
 * @param doc The Firestore document snapshot.
 * @returns A well-formed CarWashBooking object.
 */
const mapDocToBooking = (doc: DocumentSnapshot<DocumentData>): CarWashBooking => {
  const data = doc.data() || {};
  return {
    id: doc.id,
    userId: data.userId || '',
    service: data.service || 'Unknown Service',
    date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
    time: data.time || 'N/A',
    worker: data.worker || 'N/A',
    vehicleDetails: data.vehicleDetails || 'N/A',
    status: data.status || 'pending',
    isFree: data.isFree === true, // Default to false if undefined
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
    addOns: data.addOns || [],
  };
};

export const addCarWashBooking = async (bookingData: Omit<CarWashBooking, 'id' | 'createdAt'>): Promise<void> => {
  try {
    const bookingRef = await addDoc(collection(firestore, 'carWashBookings'), bookingData);
    await updateDoc(bookingRef, {
      id: bookingRef.id,
    });
  } catch (e) {
    console.error('Error adding car wash booking: ', e);
    throw new Error('Failed to add car wash booking.');
  }
};

/**
 * Fetches existing car wash bookings for a given date and service.
 * @param date The date to fetch bookings for.
 * @param service The car wash service to filter by.
 * @returns A promise that resolves with an array of existing bookings.
 */
export const getCarWashBookingsForDateAndService = async (date: Date, service: string): Promise<CarWashBooking[]> => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      collection(firestore, 'carWashBookings'),
      where('date', '>=', startOfDay),
      where('date', '<=', endOfDay),
      where('service', '==', service),
      orderBy('time', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToBooking);
  } catch (e) {
    console.error('Error fetching car wash bookings: ', e);
    throw new Error('Failed to fetch car wash bookings.');
  }
};

/**
 * Fetches car wash bookings for a specific user from Firestore.
 * @param userId The ID of the user to fetch bookings for.
 * @returns A promise that resolves with an array of the user's bookings.
 */
export const getCarWashBookingsForUser = async (userId: string): Promise<CarWashBooking[] | null> => {
  try {
    const q = query(
      collection(firestore, 'carWashBookings'),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    return querySnapshot.docs.map(mapDocToBooking);
  } catch (e) {
    console.error('Error fetching car wash bookings for user: ', e);
    throw new Error('Failed to fetch car wash bookings for user.');
  }
};

/**
 * Updates the status of a specific car wash booking.
 * @param bookingId The ID of the booking to update.
 * @param newStatus The new status to set for the booking.
 * @returns A promise that resolves when the update is complete.
 */
export const updateCarWashBookingStatus = async (bookingId: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'deleted'): Promise<void> => {
  try {
    const bookingRef = doc(firestore, 'carWashBookings', bookingId);
    await updateDoc(bookingRef, {
      status: newStatus,
    });
  } catch (e) {
    console.error(`Error updating car wash booking status for ID ${bookingId}: `, e);
    throw new Error('Failed to update car wash booking status.');
  }
};

/**
 * Deletes a specific car wash booking.
 * @param bookingId The ID of the booking to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const getCarWashBooking = async (bookingId: string): Promise<CarWashBooking | null> => {
  try {
    const bookingRef = doc(firestore, 'carWashBookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);

    if (bookingSnap.exists()) {
      return mapDocToBooking(bookingSnap);
    } else {
      return null;
    }
  } catch (e) {
    console.error(`Error fetching car wash booking with ID ${bookingId}: `, e);
    throw new Error('Failed to fetch car wash booking.');
  }
};

export const deleteCarWashBooking = async (bookingId: string): Promise<void> => {
  try {
    const bookingRef = doc(firestore, 'carWashBookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'deleted',
    });
  } catch (e) {
    console.error(`Error updating car wash booking status to deleted for ID ${bookingId}: `, e);
    throw new Error('Failed to update car wash booking status.');
  }
};

/**
 * Fetches a list of available workers.
 * In a real application, this would check schedules and existing bookings.
 * @returns A promise that resolves with an array of worker names.
 */
export const getAvailableWorkers = async (): Promise<string[]> => {
  // This is a placeholder. In a real app, you'd query a 'workers' collection
  // and check their availability based on schedules and existing bookings.

  return ['Lincon', 'Addy', 'shone', "shane"];
};

/**
 * Fetches all car wash bookings from Firestore, ordered by creation date.
 * @returns A promise that resolves with an array of all car wash bookings.
 */
export const getAllBookings = async (): Promise<CarWashBooking[]> => {
  const bookingsCollection = collection(firestore, 'carWashBookings');
  const q = query(bookingsCollection, orderBy('date', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(mapDocToBooking);
};
