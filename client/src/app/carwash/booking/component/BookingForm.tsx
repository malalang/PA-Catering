'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
	createCarWashBooking,
	fetchAvailableWorkers,
	BookingResult,
} from '@/firebase/carwash/actions';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { useUser } from '@/context/UserContext';
import FreeWash from '@/components/carwash/FreeWash';
import Section from '@/components/ui/layout/Section';
import { useRouter } from 'next/navigation';

const initialState: BookingResult = {
	success: false,
	message: '',
};

const formInputStyle =
	'w-full p-3 rounded-md bg-black/30 border border-white/20 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none';

const Alert = ({ message, type }: { message: string; type: 'success' | 'error' }) => (
	<p
		className={`mt-4 text-center p-3 rounded-md ${
			type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
		}`}>
		{message}
	</p>
);

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<Button
			type='submit'
			disabled={pending}
			className='w-full'
			size='lg'>
			{pending ? 'Booking...' : 'Book Now'}
		</Button>
	);
}

const BookingForm: React.FC = () => {
	const { user, loading } = useUser();
	const [state, formAction] = useFormState(createCarWashBooking, initialState);
	const [workers, setWorkers] = useState<string[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
	const [selectedTime, setSelectedTime] = useState('');
	const router = useRouter();
	if (state.success == true) {
		// Handle successful booking
		router.refresh();
	}
	useEffect(() => {
		async function getWorkers() {
			if (selectedDate && selectedTime) {
				const availableWorkers = await fetchAvailableWorkers(selectedDate, selectedTime);
				setWorkers(availableWorkers);
			}
		}
		getWorkers();
	}, [selectedDate, selectedTime]);

	if (loading) {
		return <Loading message='Loading user information...' />;
	}

	if (!user) {
		return (
			<Alert
				message='You must be logged in to book a car wash.'
				type='error'
			/>
		);
	}

	const carWashCount = user.carWashCount || 0;
	const washesNeeded = 5 - (carWashCount % 10);
	const isFreeWash = carWashCount > 0 && carWashCount % 5 === 0;

	return (
		<Section>
			<FreeWash carWashCount={carWashCount} />

			<form
				action={formAction}
				className='space-y-6'>
				<div>
					<label
						htmlFor='service'
						className='block mb-2 font-semibold text-white'>
						Select Service
					</label>
					<select
						name='service'
						id='service'
						required
						className={formInputStyle}>
						<option value=''>--Please choose a service--</option>
						<option value='Small Car Wash'>Small Car Wash</option>
						<option value='SUV Wash'>SUV Wash</option>
						<option value='Taxi Wash'>Taxi Wash</option>
					</select>
				</div>

				<div>
					<label
						htmlFor='vehicleDetails'
						className='block mb-2 font-semibold text-white'>
						Vehicle Make and Model
					</label>
					<input
						type='text'
						name='vehicleDetails'
						id='vehicleDetails'
						required
						className={formInputStyle}
						placeholder='e.g., Toyota Corolla'
					/>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label
							htmlFor='date'
							className='block mb-2 font-semibold text-white'>
							Select Date
						</label>
						<input
							type='date'
							name='date'
							id='date'
							required
							value={selectedDate}
							className={formInputStyle}
							onChange={(e) => setSelectedDate(e.target.value)}
							min={new Date().toISOString().split('T')[0]}
						/>
					</div>
					<div>
						<label
							htmlFor='time'
							className='block mb-2 font-semibold text-white'>
							Select Time
						</label>
						<input
							type='time'
							name='time'
							id='time'
							required
							className={formInputStyle}
							onChange={(e) => setSelectedTime(e.target.value)}
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor='worker'
						className='block mb-2 font-semibold text-white'>
						Assign Worker
					</label>
					<select
						name='worker'
						id='worker'
						required
						className={formInputStyle}
						disabled={!selectedDate || !selectedTime || workers.length === 0}>
						<option value=''>--Select an available worker--</option>
						{workers.map((worker) => (
							<option
								key={worker}
								value={worker}>
								{worker}
							</option>
						))}
					</select>
					{selectedDate && selectedTime && workers.length === 0 && (
						<p className='text-sm mt-2 text-red-400'>
							No workers available for this time slot. Please select another time.
						</p>
					)}
				</div>

				<SubmitButton />

				{state.message && (
					<Alert
						message={state.message}
						type={state.success ? 'success' : 'error'}
					/>
				)}
			</form>
		</Section>
	);
};

export default BookingForm;
