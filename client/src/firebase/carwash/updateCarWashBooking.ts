import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';


const updateCarWashBooking = async (bookingId: string, updatedData: Partial<CarWashBooking>): Promise<void> => {
  try {
    const bookingRef = doc(firestore, 'carwashBookings', bookingId);
    await updateDoc(bookingRef, updatedData);
  } catch (error) {
    console.error('Error updating car wash booking:', error);
    throw new Error('Failed to update car wash booking');
  }
};

export { updateCarWashBooking };
