import { FaCalendarAlt } from 'react-icons/fa';

interface BookingHeaderProps {
	hasPending: boolean;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ hasPending }) => (
	<div className='flex items-center gap-3 mb-6'>
		<FaCalendarAlt className='text-2xl text-red-500' />
		<h1 className='text-2xl font-bold'>
			{hasPending ? 'Your Active Booking' : 'Book Your Car Wash'}
		</h1>
	</div>
);

export default BookingHeader;
