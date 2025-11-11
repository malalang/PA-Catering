import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import itemGroups from '@/context/Stock';

export const seedStockToFirestore = async () => {
    const stockCollection = collection(firestore, 'stock');
    const snapshot = await getDocs(stockCollection);

    if (!snapshot.empty) {
        console.log('Stock collection already exists. Seeding skipped.');
        return 'Stock collection already exists. Seeding skipped.';
    }

    const batch = writeBatch(firestore);

    itemGroups.forEach((group) => {
        group.items.forEach((item) => {
            const docRef = doc(firestore, 'stock', item.id);
            batch.set(docRef, item);
        });
    });

    await batch.commit();
    console.log('Stock has been seeded to Firestore.');
    return 'Stock has been seeded successfully.';
};
