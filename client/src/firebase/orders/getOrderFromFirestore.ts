import { collection, query, where, getDocs, DocumentSnapshot, DocumentData, Timestamp, doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebaseConfig";

const mapDocToOrder = (doc: DocumentSnapshot<DocumentData>): Order => {
  const data = doc.data() as Order;
  return data
};

const getOrdersForUserFromFirestore = async (userId: string): Promise<Order[]> => {
  if (!userId) {
    console.log("No user ID provided, returning empty array.");
    return [];
  }

  try {
    const ordersCollection = collection(firestore, "orders");
    const q = query(ordersCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(mapDocToOrder) as Order[];
  } catch (error) {
    console.error("Error fetching orders from Firestore:", error);
    throw new Error("Failed to fetch orders.");
  }
};

export const updateOrderStatusInFirestore = async (orderId: string, status: 'pending' | 'processing' | 'completed' | 'cancelled') => {
  const orderRef = doc(firestore, 'orders', orderId);
  await updateDoc(orderRef, { status });
};

const getAllOrdersFromFirestore = async (): Promise<Order[]> => {
  try {
    const ordersCollection = collection(firestore, "orders");
    const querySnapshot = await getDocs(ordersCollection);
    return querySnapshot.docs.map(mapDocToOrder) as Order[];
  } catch (error) {
    console.error("Error fetching all orders from Firestore:", error);
    throw new Error("Failed to fetch all orders.");
  }
};

export { getOrdersForUserFromFirestore, getAllOrdersFromFirestore };