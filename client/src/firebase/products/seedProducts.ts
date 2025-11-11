import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import Products from '@/context/Products';

export const seedProductsToFirestore = async () => {
    const productsCollection = collection(firestore, 'products');
    const snapshot = await getDocs(productsCollection);

    if (!snapshot.empty) {
        console.log('Products collection already exists. Seeding skipped.');
        return 'Products collection already exists. Seeding skipped.';
    }

    const batch = writeBatch(firestore);

    Products.forEach((productCategory) => {
        productCategory.Products.forEach((product) => {
            const docRef = doc(firestore, 'products', product.ProductID);
            batch.set(docRef, product);
        });
    });

    await batch.commit();
    console.log('Products have been seeded to Firestore.');
    return 'Products have been seeded successfully.';
};
