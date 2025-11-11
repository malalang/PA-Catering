import React from 'react';

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

interface TimeSlotPickerProps {
	selectedTime: string;
	onChange: (time: string) => void;
	availableWorkers: string[];
	disabled?: boolean;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
	selectedTime,
	onChange,
	availableWorkers,
	disabled = false,
}) => (
	<div className='space-y-4'>
		<h3 className='text-lg font-semibold text-white'>Available Time Slots</h3>
		<div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
			{timeSlots.map((time) => {
				const isAvailable = !disabled && availableWorkers.length > 0;
				return (
					<button
						key={time}
						type='button'
						onClick={() => isAvailable && onChange(time)}
						disabled={!isAvailable}
						className={`p-3 rounded-md text-center transition-colors ${
							selectedTime === time
								? 'bg-red-500 text-white'
								: isAvailable
								? 'bg-black/30 text-white hover:bg-red-500/20'
								: 'bg-black/10 text-white/40 cursor-not-allowed'
						}`}>
						{time}
					</button>
				);
			})}
		</div>
		{!disabled && availableWorkers.length === 0 && (
			<p className='text-red-400'>No workers available for these time slots.</p>
		)}
	</div>
);

export default TimeSlotPicker;
