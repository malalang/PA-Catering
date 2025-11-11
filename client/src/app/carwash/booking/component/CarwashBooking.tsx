'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import CancelBooking from './CancelBooking';

import { updateCarWashBooking } from '@/firebase/carwash/updateCarWashBooking';

import Icon from '@/components/ui/Icon';
import { FaCheckCircle, FaExclamationTriangle, FaPencilAlt, FaTag } from 'react-icons/fa';
import BookingDetails from './BookingDetails';
import Loading from '@/components/ui/Loading';
import Section from '@/components/ui/layout/Section';

const formInputStyle =
	'w-full p-3 rounded-md bg-black/30 border border-white/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none';

const Alert = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
	<div
		className={`mt-4 text-center p-3 rounded-md flex items-center justify-center gap-2 ${
			type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
		}`}>
		{type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
		<span>{message}</span>
	</div>
);

interface BookingDetailProps {
	label: string;
	value?: string;
	children?: React.ReactNode;
}

const BookingDetail: React.FC<BookingDetailProps> = ({ label, value, children }) => (
	<div>
		<p className='text-sm font-semibold text-white/60'>{label}</p>
		{value && <p className='text-lg text-white'>{value}</p>}
		{children}
	</div>
);

interface StatusBadgeProps {
	status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
	const statusStyles = {
		pending: 'bg-red-500/20 text-red-300',
		confirmed: 'bg-white/20 text-white',
		completed: 'bg-green-500/20 text-green-300',
		cancelled: 'bg-red-500/20 text-red-300',
	};
	return (
		<span
			className={`px-3 py-1 text-sm font-medium rounded-full ${
				statusStyles[status] || 'bg-gray-500/20 text-gray-300'
			}`}>
			{status}
		</span>
	);
};

const CarwashBookingComponent: React.FC<{ booking: CarWashBooking }> = ({ booking }) => {
	const [resolvedBooking, setResolvedBooking] = useState<CarWashBooking | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editableBooking, setEditableBooking] = useState<CarWashBooking | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	useEffect(() => {
		// Ensure date is a Date object
		const normalizedDate = new Date(booking.date);
		setResolvedBooking({ ...booking, date: normalizedDate });
		setEditableBooking({ ...booking, date: normalizedDate });
	}, [booking]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (editableBooking) {
			setEditableBooking({
				...editableBooking,
				[name]: name === 'date' ? new Date(value) : value,
			});
		}
	};

	const handleUpdate = async () => {
		if (!editableBooking) return;
		setIsLoading(true);
		setError(null);
		setSuccess(null);
		try {
			await updateCarWashBooking(editableBooking.id, {
				date: editableBooking.date, // already a Date object
				time: editableBooking.time,
				service: editableBooking.service,
			});
			setIsEditing(false);
			setSuccess('Booking updated successfully!');
			setResolvedBooking(editableBooking);
		} catch (err: unknown) {
			setError(
				(err as { message?: string })?.message || 'Failed to update booking. Please try again.'
			);
		}
		setIsLoading(false);
	};

	if (!resolvedBooking || !editableBooking) {
		return <Loading message='Loading booking details...' />;
	}

	return (
		<Section>
			{isEditing ? (
				<div className='space-y-6'>
					<Icon
						icon={FaPencilAlt}
						heading='Edit Your Booking'
					/>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<label
								htmlFor='date'
								className='block mb-2 font-semibold text-white'>
								Date
							</label>
							<input
								type='date'
								id='date'
								name='date'
								value={
									editableBooking.date instanceof Date
										? editableBooking.date.toISOString().split('T')[0]
										: new Date(editableBooking.date).toISOString().split('T')[0]
								}
								onChange={handleInputChange}
								className={formInputStyle}
							/>
						</div>
						<div>
							<label
								htmlFor='time'
								className='block mb-2 font-semibold text-white'>
								Time
							</label>
							<input
								type='time'
								id='time'
								name='time'
								value={editableBooking.time}
								onChange={handleInputChange}
								className={formInputStyle}
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='service'
							className='block mb-2 font-semibold text-white'>
							Service
						</label>
						<select
							name='service'
							id='service'
							required
							className={formInputStyle}
							value={editableBooking.service}
							onChange={handleInputChange}>
							<option value='Small Car Wash'>Small Car Wash</option>
							<option value='SUV Wash'>SUV Wash</option>
							<option value='Taxi Wash'>Taxi Wash</option>
						</select>
					</div>
				</div>
			) : (
				<div className='space-y-6'>
					<div className='grid grid-cols-2 md:grid-cols-2 gap-8'>
						<BookingDetails booking={resolvedBooking} />
					</div>
					{resolvedBooking.addOns && resolvedBooking.addOns.length > 0 && (
						<div className='mt-6 pt-6 border-t border-white/10'>
							<Icon
								icon={FaTag}
								heading='Add-on Services'
							/>
							<ul className='mt-4 list-disc list-inside text-white space-y-1'>
								{resolvedBooking.addOns.map((addOn: string, index: number) => (
									<li key={index}>{addOn}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}

			{error && (
				<Alert
					message={error}
					type='error'
				/>
			)}
			{success && (
				<Alert
					message={success}
					type='success'
				/>
			)}

			<nav className='flex items-center gap-4 mt-8 pt-6 border-t border-white/10'>
				{isEditing ? (
					<>
						<Button
							onClick={handleUpdate}
							disabled={isLoading}>
							{isLoading ? 'Saving...' : 'Save Changes'}
						</Button>
						<Button
							onClick={() => setIsEditing(false)}
							variant='secondary'>
							Cancel
						</Button>
					</>
				) : (
					<>
						<Button onClick={() => setIsEditing(true)}>Update Booking</Button>
						<CancelBooking bookingId={resolvedBooking.id} />
					</>
				)}
			</nav>
		</Section>
	);
};
export default CarwashBookingComponent;
