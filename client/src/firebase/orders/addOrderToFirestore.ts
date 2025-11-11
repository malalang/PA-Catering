import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';
import GetUser from '@/firebase/users/server/GetServerUser';

const addOrderToFirestore = async (orderDetails: CartItem[], totalPrice: number, totalQuantity: number): Promise<void> => {
  const user = await GetUser();
  if (!user) {
    throw new Error("User not found.");
  }
  try {
    const ordersCollection = collection(firestore, 'orders');
    const newOrderRef = doc(ordersCollection); // Get a document reference with an auto-generated ID

    const newOrder: Order = {
      orderId: newOrderRef.id, // Set the orderId to the document's ID
      quantity: totalQuantity,
      products: orderDetails,
      totalAmount: totalPrice,
      shippingAddress: user?.address || '',
      orderDate: new Date(), // Use Date object
      status: "pending",
      userId: user.uid,
      type: 'Takeaway'
    };

    await setDoc(newOrderRef, newOrder); // Use setDoc with the pre-generated reference

  } catch (error) {
    console.error('Error adding order to Firestore:', error);
    throw new Error(`Failed to add order to Firestore ${error}`);
  }
};

export { addOrderToFirestore };
