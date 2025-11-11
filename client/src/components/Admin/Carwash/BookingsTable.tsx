import { format } from 'date-fns';
import Button from '@/components/ui/Button';

interface BookingsTableProps {
	bookings: CarWashBooking[];
	onStatusChange: (
		bookingId: string,
		newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'deleted'
	) => void;
	onView: (booking: CarWashBooking) => void;
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'confirmed':
			return 'bg-green-500/95';
		case 'cancelled':
			return 'bg-red-500/95';
		case 'deleted':
			return 'bg-gray-700/95';
		case 'completed':
			return 'bg-blue-500/95';
		default:
			return 'bg-yellow-500/95';
	}
};

export function BookingsTable({ bookings, onStatusChange, onView }: BookingsTableProps) {
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full bg-gray-900 rounded-lg overflow-hidden'>
				<thead>
					<tr className='bg-gray-800'>
						<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
							Date & Time
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
							Service
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
							Status
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
							Worker
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
							Make and Model
						</th>
						<th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className='bg-gray-900 divide-y divide-gray-700'>
					{bookings.map((booking) => (
						<tr
							key={booking.id}
							className='hover:bg-gray-800'>
							<td className='px-6 py-4 whitespace-nowrap text-white'>
								<div>{format(new Date(booking.date), 'PPP')}</div>
								<div className='text-sm text-gray-400'>{booking.time}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-white'>
								<div className='font-medium'>{booking.service}</div>
								{booking.addOns && booking.addOns.length > 0 && (
									<div className='text-sm text-gray-400'>Add-ons: {booking.addOns.join(', ')}</div>
								)}
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								<span
									className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
										booking.status
									)} text-white`}>
									{booking.status}
								</span>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-white'>
								{booking.worker || 'Not assigned'}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-white'>
								{booking.vehicleDetails || 'Not assigned'}
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<div className='flex space-x-2'>
									<Button
										variant='primary'
										size='sm'
										onClick={() => onView(booking)}>
										View
									</Button>
									<select
										value={booking.status}
										onChange={(e) =>
											onStatusChange(
												booking.id,
												e.target.value as
													| 'pending'
													| 'confirmed'
													| 'cancelled'
													| 'completed'
													| 'deleted'
											)
										}
										className='bg-gray-800 w-full text-white text-xs p-1 rounded border border-white/20'
										onClick={(e) => e.stopPropagation()}>
										<option value='pending'>Pending</option>
										<option value='confirmed'>Confirm</option>
										<option value='cancelled'>Cancel</option>
										<option value='completed'>Complete</option>
										<option value='deleted'>Delete</option>
									</select>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
