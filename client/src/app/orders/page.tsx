export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { getOrdersByUser, Order } from '@/lib/supabase/orders/orders';
import OrderItem from '@/app/orders/components/OrderItem';
import Main from '@/components/ui/layout/Main';
import { HiDocumentText, HiShoppingBag } from 'react-icons/hi2';
import { redirect } from 'next/navigation';

const OrderHistory: React.FC = async () => {
	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user?.id) {
		return redirect('/login');
	}

	const { data: ordersData, error: ordersError } = await supabase
		.from('orders')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	if (ordersError) {
		console.error('Error fetching orders:', ordersError);
	}

	// ... existing code ...

	// ... existing code ...

	const orders = (ordersData as Order[]) || [];

	if (orders.length === 0) {
		return (
			<Main
				tittle='Order History'
				Icon={HiDocumentText}
				className='p-4 flex items-center justify-center min-h-[60vh]'>
				<div className='text-center bg-gradient-to-br from-yellow-900/90 to-yellow-800/90 backdrop-blur-xl p-12 rounded-2xl border border-white/10 shadow-2xl max-w-md'>
					<div className='flex flex-col items-center gap-4'>
						<div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-6 rounded-full border border-amber-400/30'>
							<HiShoppingBag className='text-6xl text-amber-400' />
						</div>
						<h2 className='text-3xl font-bold text-white'>
							No Orders Yet
						</h2>
						<p className='text-yellow-400 max-w-sm'>
							Your order history will appear here once you place your first order.
						</p>
					</div>
				</div>
			</Main>
		);
	}

	return (
		<Main
			tittle='Order History'
			Icon={HiDocumentText}
			className='p-4 md:p-6 space-y-4'>
			<div className='mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2'>Your Orders</h2>
				<p className='text-yellow-400'>Track and manage all your orders in one place</p>
			</div>

			<div className='space-y-4'>
				{orders.map((order) => (
					<OrderItem
						key={order.id}
						order={order}
					/>
				))}
			</div>
		</Main>
	);
};

export default OrderHistory;
