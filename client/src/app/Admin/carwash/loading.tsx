import Main from '@/components/ui/layout/Main';
import Loading from '@/components/ui/Loading';

export default function LoadingPage() {
	return (
		<Main>
			<Loading message='Loading Car Wash Bookings...' />
		</Main>
	);
}
