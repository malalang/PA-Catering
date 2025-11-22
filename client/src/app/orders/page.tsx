export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { getOrdersByUser } from '@/lib/supabase/orders/orders';
import OrderItem from '@/app/orders/components/OrderItem';
import Main from '@/components/ui/layout/Main';
import { FaHistory } from 'react-icons/fa';
import { redirect } from 'next/navigation';

const OrderHistory: React.FC = async () => {
	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user?.id) {
		return redirect('/login');
	}

	const orders = await getOrdersByUser(user.id);

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
					key={order.id}
					order={order}
				/>
			))}
		</Main>
	);
};

export default OrderHistory;
