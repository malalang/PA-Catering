export const dynamic = 'force-dynamic';
import { getOrdersForUserFromFirestore } from '@/firebase/orders/getOrderFromFirestore';
import GetUser from '@/firebase/users/server/GetServerUser';
import OrderItem from '@/features/orders/components/OrderItem';
import Main from '@/components/ui/layout/Main';
import { FaHistory } from 'react-icons/fa';
const OrderHistory: React.FC = async () => {
	const user = await GetUser();

	if (!user) {
		return (
			<Main
				tittle='Order History'
				Icon={FaHistory}
				className='p-4'>
				<p className='text-white text-center'>Please log in to see your order history.</p>
			</Main>
		);
	}

	const orders = await getOrdersForUserFromFirestore(user.uid);

	if (orders.length === 0) {
		return (
			<Main
				tittle='Order History'
				Icon={FaHistory}
				className='p-4'>
				<p className='text-white text-center'>You have no orders yet.</p>
			</Main>
		);
	}

	return (
		<Main
			tittle='Order History'
			Icon={FaHistory}
			className='p-4 space-y-4'>
			{orders.map((order) => (
				<OrderItem
					key={order.orderId}
					order={order}
				/>
			))}
		</Main>
	);
};

export default OrderHistory;
