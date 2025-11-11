'use client';

import { useState, useMemo, useEffect } from 'react';
import { getAllOrdersFromFirestore, updateOrderStatusInFirestore } from '@/firebase/orders/getOrderFromFirestore';
import Alert from '@/components/ui/Alert';
import Loading from '@/components/ui/Loading';
import { OrdersTable } from '@/components/Admin/Order/OrdersTable';

export default function OrderAdmin() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [notification, setNotification] = useState<{ variant: 'success' | 'danger'; message: string } | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getAllOrdersFromFirestore();
                setOrders(fetchedOrders);
            } catch (err) {
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = useMemo(() => {
        if (selectedStatus === 'all') {
            return orders;
        }
        return orders.filter((order) => order.status === selectedStatus);
    }, [orders, selectedStatus]);

    const handleStatusChange = async (orderId: string, newStatus: 'pending' | 'processing' | 'completed' | 'cancelled') => {
        const originalOrders = [...orders];
        const updatedOrders = orders.map((o) =>
            o.orderId === orderId ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);

        try {
            await updateOrderStatusInFirestore(orderId, newStatus);
            setNotification({ variant: 'success', message: 'Order status updated successfully' });
        } catch (error) {
            setOrders(originalOrders);
            setNotification({ variant: 'danger', message: 'Failed to update order status' });
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className='text-red-500 p-4'>{error}</div>;

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-6 text-white'>Orders</h1>

            {notification && (
                <Alert
                    variant={notification.variant}
                    onClose={() => setNotification(null)}
                    className='mb-4'
                >
                    {notification.message}
                </Alert>
            )}

            <div className='mb-6'>
                <label htmlFor='statusFilter' className='block text-sm font-medium text-white mb-2'>
                    Filter by Status:
                </label>
                <select
                    id='statusFilter'
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className='bg-gray-800 text-white p-2 rounded w-full md:w-64'
                >
                    <option value='all'>All Orders</option>
                    <option value='pending'>Pending</option>
                    <option value='processing'>Processing</option>
                    <option value='completed'>Completed</option>
                    <option value='cancelled'>Cancelled</option>
                </select>
            </div>

            <OrdersTable orders={filteredOrders} onStatusChange={handleStatusChange} />
        </div>
    );
}
