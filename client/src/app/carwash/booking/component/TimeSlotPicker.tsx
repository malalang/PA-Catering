import React, { useEffect, useState } from 'react';
import { getCarWashBookingsForDateAndService } from '@/firebase/carwash/carwashBookings';

interface TimeSlotPickerProps {
	selectedDate: string;
	selectedService: string;
	onSelectTime: (time: string) => void;
}

// Define service durations in minutes
const serviceDurations: { [key: string]: number } = {
	'Small Car Wash': 30,
	'SUV Wash': 45,
	'Taxi Wash': 25,
};

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
	selectedDate,
	selectedService,
	onSelectTime,
}) => {
	const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAvailableSlots = async () => {
			setLoading(true);
			setError(null);
			setAvailableTimeSlots([]);

			if (!selectedDate || !selectedService) {
				setLoading(false);
				return;
			}

			try {
				const dateObject = new Date(selectedDate);
				const existingBookings = await getCarWashBookingsForDateAndService(
					dateObject,
					selectedService
				);

				const serviceDuration = serviceDurations[selectedService];
				if (!serviceDuration) {
					setError('Invalid service selected.');
					setLoading(false);
					return;
				}

				// Define operating hours (e.g., 9:00 AM to 5:00 PM)
				const operatingHoursStart = 9 * 60; // Minutes from midnight
				const operatingHoursEnd = 17 * 60; // Minutes from midnight

				const possibleTimeSlots: string[] = [];
				for (let i = operatingHoursStart; i < operatingHoursEnd; i += 15) {
					// Generate slots every 15 minutes
					const hours = Math.floor(i / 60);
					const minutes = i % 60;
					const time = `${hours.toString().padStart(2, '0')}:${minutes
						.toString()
						.padStart(2, '0')}`;
					possibleTimeSlots.push(time);
				}

				// Filter out occupied time slots
				const occupiedSlots: string[] = [];
				existingBookings.forEach((booking: CarWashBooking) => {
					// booking.date is a Date object
					const bookingStartTime = new Date(booking.date);
					const [bookingHour, bookingMinute] = booking.time.split(':').map(Number);
					bookingStartTime.setHours(bookingHour, bookingMinute, 0, 0);

					const bookingEndTime = new Date(
						bookingStartTime.getTime() + serviceDurations[booking.service] * 60000
					);

					possibleTimeSlots.forEach((slot) => {
						const [slotHour, slotMinute] = slot.split(':').map(Number);
						const slotTime = new Date(dateObject);
						slotTime.setHours(slotHour, slotMinute, 0, 0);

						// Check for overlap
						if (
							(slotTime >= bookingStartTime && slotTime < bookingEndTime) ||
							(bookingStartTime >= slotTime &&
								bookingStartTime < new Date(slotTime.getTime() + serviceDuration * 60000))
						) {
							occupiedSlots.push(slot);
						}
					});
				});

				const filteredTimeSlots = possibleTimeSlots.filter((slot) => !occupiedSlots.includes(slot));
				setAvailableTimeSlots(filteredTimeSlots);
			} catch (error) {
				console.error('Error fetching available time slots:', error);
				setError('Error fetching available time slots.');
			} finally {
				setLoading(false);
			}
		};

		fetchAvailableSlots();
	}, [selectedDate, selectedService]);

	return (
		<div>
			<h2>Available Time Slots</h2>
			{loading && <p>Loading time slots...</p>}
			{error && <p>Error: {error}</p>}
			{!loading && !error && availableTimeSlots.length > 0 && (
				<div>
					<p>Select a time slot:</p>
					<div className='grid grid-cols-3 gap-2'>
						{availableTimeSlots.map((timeSlot) => (
							<button
								key={timeSlot}
								onClick={() => onSelectTime(timeSlot)}>
								{timeSlot}
							</button>
						))}
					</div>
				</div>
			)}
			{!loading && !error && availableTimeSlots.length === 0 && selectedDate && selectedService && (
				<p>No available time slots for the selected date and service.</p>
			)}
			{!selectedDate ||
				(!selectedService && <p>Please select a date and service to see available time slots.</p>)}
		</div>
	);
};

export default TimeSlotPicker;
