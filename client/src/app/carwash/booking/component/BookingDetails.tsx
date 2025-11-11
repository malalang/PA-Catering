import React from 'react';

import StatusBadge from './StatusBadge';

interface BookingInfoItemProps {
	label: string;
	children: React.ReactNode;
}

const BookingInfoItem: React.FC<BookingInfoItemProps> = ({ label, children }) => (
	<div>
		<p className='text-sm font-semibold text-white/60'>{label}</p>
		{children}
	</div>
);

interface BookingDetailsProps {
	booking: CarWashBooking;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => (
	<div className='space-y-6'>
		
			<BookingInfoItem label='Date'>
				<p className='text-lg text-white'>
					{new Date(booking.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</p>
			</BookingInfoItem>

			<BookingInfoItem label='Time'>
				<p className='text-lg text-white'>{booking.time}</p>
			</BookingInfoItem>

			<BookingInfoItem label='Status'>
				<StatusBadge status={booking.status} />
			</BookingInfoItem>

			<BookingInfoItem label='Service'>
				<p className='text-lg text-white'>{booking.service}</p>
			</BookingInfoItem>

			<BookingInfoItem label='Assigned Worker'>
				<p className='text-lg text-white'>{booking.worker}</p>
			</BookingInfoItem>

			<BookingInfoItem label='Booking ID'>
				<p className='text-lg text-white'>{booking.id}</p>
			</BookingInfoItem>
	

		{booking.addOns && booking.addOns.length > 0 && (
			<div className='mt-6 pt-6 border-t border-white/10'>
				<h2 className='font-semibold text-white mb-2'>Add-on Services</h2>
				<ul className='mt-4 list-disc list-inside text-white space-y-1'>
					{booking.addOns.map((addOn: string, index: number) => (
						<li key={index}>{addOn}</li>
					))}
				</ul>
			</div>
		)}
	</div>
);

export default BookingDetails;
