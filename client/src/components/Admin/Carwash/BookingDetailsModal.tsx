import { format } from 'date-fns';
import Button from '@/components/ui/Button';

interface BookingDetailsModalProps {
	booking: CarWashBooking | null;
	onClose: () => void;
}

const getStatusColor = (status: string) => {
	switch (status) {
		case 'confirmed':
			return 'bg-green-500/95';
		case 'cancelled':
			return 'bg-red-500/95';
		case 'completed':
			return 'bg-blue-500/95';
		default:
			return 'bg-yellow-500/95';
	}
};

export function BookingDetailsModal({ booking, onClose }: BookingDetailsModalProps) {
	if (!booking) return null;

	return (
		<div className='fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50'>
			<div className='bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-bold text-white'>Booking Details</h2>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-white'>
						✕
					</button>
				</div>

				<div className='space-y-4 text-white'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<h3 className='font-semibold'>Service</h3>
							<p>{booking.service}</p>
						</div>
						<div>
							<h3 className='font-semibold'>Status</h3>
							<span
								className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
									booking.status
								)}`}>
								{booking.status}
							</span>
						</div>
						<div>
							<h3 className='font-semibold'>Date</h3>
							<p>{format(new Date(booking.date), 'PPP')}</p>
						</div>
						<div>
							<h3 className='font-semibold'>Time</h3>
							<p>{booking.time}</p>
						</div>
						<div>
							<h3 className='font-semibold'>Worker</h3>
							<p>{booking.worker || 'Not assigned'}</p>
						</div>
						{booking.vehicleDetails && (
							<div>
								<h3 className='font-semibold'>Vehicle Details</h3>
								<p>{booking.vehicleDetails}</p>
							</div>
						)}
						{booking.addOns && booking.addOns.length > 0 && (
							<div className='md:col-span-2'>
								<h3 className='font-semibold'>Add-ons</h3>
								<p>{booking.addOns.join(', ')}</p>
							</div>
						)}
					</div>

					<div className='mt-6 flex justify-end space-x-2'>
						<Button
							variant="danger"
							onClick={onClose}
						>
							Close
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
