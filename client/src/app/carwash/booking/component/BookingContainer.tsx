import BookingForm from './BookingForm';
import CarwashBooking from './CarwashBooking';
import Main from '@/components/ui/layout/Main';
import BookingHeader from './BookingHeader';

interface BookingContainerProps {
	pendingBooking: CarWashBooking | null;
}

const BookingContainer: React.FC<BookingContainerProps> = ({ pendingBooking }) => (
	<Main tittle='Booking'>
		<BookingHeader hasPending={!!pendingBooking} />
		{!pendingBooking ? <BookingForm /> : <CarwashBooking booking={pendingBooking} />}
	</Main>
);

export default BookingContainer;
