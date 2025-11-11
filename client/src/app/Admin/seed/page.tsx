'use client';

import { useState } from 'react';
import { seedProductsToFirestore } from '@/firebase/products/seedProducts';
import { seedStockToFirestore } from '@/firebase/stock/seedStock';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

export default function SeedDataPage() {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ variant: 'success' | 'danger'; message: string } | null>(null);

    const handleSeedProducts = async () => {
        setLoading(true);
        setNotification(null);
        try {
            const message = await seedProductsToFirestore();
            setNotification({ variant: 'success', message });
        } catch (error) {
            setNotification({ variant: 'danger', message: 'Failed to seed products.' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedStock = async () => {
        setLoading(true);
        setNotification(null);
        try {
            const message = await seedStockToFirestore();
            setNotification({ variant: 'success', message });
        } catch (error) {
            setNotification({ variant: 'danger', message: 'Failed to seed stock.' });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-6 text-white'>Seed Data to Firestore</h1>

            {notification && (
                <Alert
                    variant={notification.variant}
                    onClose={() => setNotification(null)}
                    className='mb-4'
                >
                    {notification.message}
                </Alert>
            )}

            <div className='space-y-4'>
                <p className='text-white'>
                    Use these buttons to perform a one-time seed of your local product and stock data into your Firestore database. 
                    This will not run if the collections already contain data.
                </p>
                <div className='flex space-x-4'>
                    <Button onClick={handleSeedProducts} disabled={loading}>
                        {loading ? 'Seeding...' : 'Seed Products'}
                    </Button>
                    <Button onClick={handleSeedStock} disabled={loading}>
                        {loading ? 'Seeding...' : 'Seed Stock'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
