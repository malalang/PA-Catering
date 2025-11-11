// Suggested code may be subject to a license. Learn more: ~LicenseLog:2144683830.
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

import { FaExclamationTriangle } from 'react-icons/fa';
import { cancelBookingAndHandleLoyalty } from '@/firebase/carwash/actions';

interface CancelBookingProps {
	bookingId: string;
}

const Alert = ({ message }: { message: string }) => (
	<div
		className={`mt-4 text-center p-3 rounded-md flex items-center justify-center gap-2 bg-red-500/20 text-red-300`}>
		<FaExclamationTriangle />
		<span>{message}</span>
	</div>
);

const CancelBooking: React.FC<CancelBookingProps> = ({ bookingId }) => {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCancelling, setIsCancelling] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCancel = async () => {
		setIsCancelling(true);
		setError(null);
		try {
			await cancelBookingAndHandleLoyalty(bookingId);
			router.push('/profile');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to cancel booking.');
			setIsCancelling(false);
		}
	};

	return (
		<>
			<Button
				onClick={() => setIsModalOpen(true)}
				variant='danger'
				disabled={isCancelling}>
				Cancel Booking
			</Button>

			{isModalOpen && (
				<div className='fixed inset-0 bg-black/60 flex items-center justify-center z-10'>
					<div className='bg-black border border-white/20 rounded-md p-8 max-w-md w-full text-center'>
						<FaExclamationTriangle className='text-red-500 text-5xl mx-auto mb-4' />
						<h3 className='text-2xl font-bold mb-2'>Confirm Cancellation</h3>
						<p className='text-white mb-6'>
							Are you sure you want to cancel this booking? This action cannot be undone.
						</p>
						{error && <Alert message={error} />}
						<div className='flex justify-center gap-4 mt-8'>
							<Button
								onClick={() => setIsModalOpen(false)}
								variant='secondary'
								disabled={isCancelling}>
								Go Back
							</Button>
							<Button
								onClick={handleCancel}
								variant='danger'
								disabled={isCancelling}>
								{isCancelling ? 'Cancelling...' : 'Confirm'}
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CancelBooking;
