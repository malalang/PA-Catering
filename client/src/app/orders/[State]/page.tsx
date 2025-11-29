import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';
import { Order } from '@/lib/supabase/orders/orders';
import OrderItem from '@/app/orders/components/OrderItem';

interface PageProps {
	params: {
		State: string;
	};
}

const StateOrderPage = async ({ params }: PageProps) => {
	const { State } = params;
	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user?.id) {
		return redirect('/login');
	}

	// Fetch orders filtered by status
	const { data: ordersData, error: ordersError } = await supabase
		.from('orders')
		.select('*')
		.eq('user_id', user.id)
		.eq('status', State.toLowerCase()) // Ensure status matches DB enum
		.order('created_at', { ascending: false });

	if (ordersError) {
		console.error('Error fetching orders:', ordersError);
	}

	const orders = (ordersData as Order[]) || [];

	if (orders.length === 0) {
		return (
			<main className='p-4 min-h-[50vh] flex flex-col items-center justify-center'>
				<div className='bg-white/5 p-8 rounded-2xl border border-white/10 text-center max-w-md'>
					<h2 className='text-2xl font-bold text-white mb-2 capitalize'>No {State} Orders</h2>
					<p className='text-yellow-400'>
						You don't have any orders with the status "{State}" at the moment.
					</p>
				</div>
			</main>
		);
	}

	return (
		<Main className='p-4 md:p-6 space-y-4'>
			<div className='mb-6'>
				<h2 className='text-2xl font-bold text-white mb-2 capitalize'>{State} Orders</h2>
				<p className='text-yellow-400'>Viewing all your {State} orders</p>
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

export default StateOrderPage;
