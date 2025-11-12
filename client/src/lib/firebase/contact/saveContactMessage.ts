import { firestore } from '../firebaseConfig';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface ContactMessage {
  id: string;
  name: string;
  whatsapp: string;
  message: string;
  userId: string | null;
  status: 'new' | 'read' | 'replied';
}

export const saveContactMessage = async (messageData: Omit<ContactMessage, 'id' | 'status'>) => {
  try {
    const newDocRef = doc(collection(firestore, 'contact-messages'));
    
    const fullMessage = {
      ...messageData,
      id: newDocRef.id,
      createdAt: serverTimestamp(),
      status: 'new' as const,
    };

    await setDoc(newDocRef, fullMessage);
    
    return { success: true, docId: newDocRef.id };
  } catch (error) {
    console.error('Error writing document: ', error);
    return { success: false, error };
  }
};
