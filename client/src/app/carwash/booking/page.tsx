'use client';
import { getCarWashBookingsForUser } from '@/firebase/carwash/carwashBookings';

import BookingContainer from './component/BookingContainer';

import { FaCalendarAlt } from 'react-icons/fa';
import Main from '@/components/ui/layout/Main';
import { redirect } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import Section from '@/components/ui/layout/Section';

const CarwashBookingPage: React.FC = () => {
	const { user, loading } = useUser();
	const [pendingBooking, setPendingBooking] = useState<CarWashBooking | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchBookings() {
			if (!user?.uid) return;
			try {
				const data = await getCarWashBookingsForUser(user.uid);
				const found = data?.find((booking: CarWashBooking) => booking.status === 'pending') || null;
				setPendingBooking(found);
			} catch (error) {
				console.error('Error fetching bookings:', error);
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		}

		if (!loading) {
			fetchBookings();
		}
	}, [user?.uid, loading]);

	if (loading || isLoading) {
		return (
			<Main tittle='Booking'>
				<div className='flex items-center justify-center min-h-[400px]'>
					<div className='text-white/70'>Loading...</div>
				</div>
			</Main>
		);
	}

	if (!user) {
		return (
			<Main tittle='Booking'>
				<Section>
					<div className='text-red-400'>Please log in to view your bookings.</div>
				</Section>
			</Main>
		);
	}

	return <BookingContainer pendingBooking={pendingBooking} />;
};

export default CarwashBookingPage;
