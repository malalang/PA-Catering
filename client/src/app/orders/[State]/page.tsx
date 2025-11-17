import React from 'react';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';
import { getOrdersByUser } from '@/lib/supabase/orders/orders';


const StateOrderPage = async () => {
	const supabase = await createClient();
	const { data: { user }, error } = await supabase.auth.getUser();

	if (error || !user?.id) {
		return redirect('/Authentication/login');
	}

	const orders = await getOrdersByUser(user.id);

	if (orders.length === 0) {
		return (
			<main className='p-4'>
				<p className='text-white text-center'>You have no orders yet.</p>
			</main>
		);
	}

	return (
		<Main>
			{orders.map((order: any) => (
				<Section
					tittle={`Order on ${new Date(order.created_at).toLocaleDateString()}`}
					key={order.id}>
					<ul className='text-white'>
						<li>
							<p>
								<b>Order Number:</b> {order.id}
							</p>
							<p>
								<b>Date:</b> {new Date(order.created_at).toLocaleDateString()}
							</p>
							<p className='mt-2'>
								<b>Total Price:</b> R{order.total_price?.toFixed(2) || '0.00'}
							</p>
							<p>
								<b>Total Quantity:</b> {order.total_quantity || 0}
							</p>
							<p>
								<b>Status:</b> {order.status || 'pending'}
							</p>
						</li>
					</ul>
				</Section>
			))}
		</Main>
	);
};

export default StateOrderPage;
