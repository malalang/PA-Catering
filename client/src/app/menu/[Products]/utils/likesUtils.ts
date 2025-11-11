import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/firebaseConfig';

export interface ProductLikes {
  [productName: string]: {
    likes: number;
    likedBy: string[];
  };
}

export const fetchAllProductLikes = async (productNames: string[]): Promise<ProductLikes> => {
  const likesData: ProductLikes = {};
  
  try {
    // Fetch likes data for each product
    const promises = productNames.map(async (productName) => {
      const docRef = doc(firestore, 'products', productName);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as { likes: number; likedBy: string[] };
        likesData[productName] = data;
      } else {
        // Initialize with default values if document doesn't exist
        likesData[productName] = { likes: 0, likedBy: [] };
      }
    });
    
    await Promise.all(promises);
    return likesData;
  } catch (error) {
    console.error('Error fetching product likes:', error);
    // Return default values if there's an error
    productNames.forEach(productName => {
      likesData[productName] = { likes: 0, likedBy: [] };
    });
    return likesData;
  }
}; 