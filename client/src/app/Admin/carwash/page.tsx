'use client';

import { useState, useMemo } from 'react';
import { useCarWashBookings } from '@/hooks/useCarWashBookings';
import {
	deleteCarWashBooking,
	updateCarWashBookingStatus,
} from '@/firebase/carwash/carwashBookings';
import Alert from '@/components/ui/Alert';
import Loading from '@/components/ui/Loading';
import { BookingsTable } from '@/components/Admin/Carwash/BookingsTable';
import { BookingDetailsModal } from '@/components/Admin/Carwash/BookingDetailsModal';

export default function CarWashAdmin() {
	const { bookings, loading, error, refetch, setBookings } = useCarWashBookings();
	const [selectedStatus, setSelectedStatus] = useState<string>('all');
	const [selectedBooking, setSelectedBooking] = useState<CarWashBooking | null>(null);
	const [notification, setNotification] = useState<{
		variant: 'success' | 'danger';
		message: string;
	} | null>(null);

	const filteredBookings = useMemo(() => {
		if (selectedStatus === 'all') {
			return bookings;
		}
		return bookings.filter((booking) => booking.status === selectedStatus);
	}, [bookings, selectedStatus]);

	const handleStatusChange = async (
		bookingId: string,
		newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'deleted'
	) => {
		const originalBookings = [...bookings];
		const updatedBookings = bookings.map((b) =>
			b.id === bookingId ? { ...b, status: newStatus } : b
		);
		setBookings(updatedBookings);

		try {
			await updateCarWashBookingStatus(bookingId, newStatus);
			setNotification({ variant: 'success', message: 'Booking status updated successfully' });
		} catch (error) {
			setBookings(originalBookings);
			setNotification({ variant: 'danger', message: 'Failed to update booking status' });
		}
	};

	if (loading) return <Loading />;
	if (error) return <div className='text-red-500 p-4'>{error}</div>;

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6 text-white'>Car Wash Bookings</h1>

			{notification && (
				<Alert
					variant={notification.variant}
					onClose={() => setNotification(null)}
					className='mb-4'>
					{notification.message}
				</Alert>
			)}

			<div className='mb-6'>
				<label
					htmlFor='statusFilter'
					className='block text-sm font-medium text-white mb-2'>
					Filter by Status:
				</label>
				<select
					id='statusFilter'
					value={selectedStatus}
					onChange={(e) => setSelectedStatus(e.target.value)}
					className='bg-gray-800 text-white p-2 rounded w-full md:w-64'>
					<option value='all'>All Bookings</option>
					<option value='pending'>Pending</option>
					<option value='confirmed'>Confirmed</option>
					<option value='cancelled'>Cancelled</option>
					<option value='completed'>Completed</option>
					<option value='deleted'>Deleted</option>
				</select>
			</div>

			<BookingsTable
				bookings={filteredBookings}
				onStatusChange={handleStatusChange}
				onView={(booking) => setSelectedBooking(booking)}
			/>

			<BookingDetailsModal
				booking={selectedBooking}
				onClose={() => setSelectedBooking(null)}
			/>
		</div>
	);
}
