import React from 'react';

import ProductDetails from '@/app/menu/components/ProductDetails';
import Section from '@/components/ui/layout/Section';

const OrderItem: React.FC<{ order: any }> = ({ order }) => {
	return (
		<Section key={order.id}>
			<h2>{new Date(order.created_at).toLocaleDateString()}</h2>
			<ul>
				<li>
					<p className='border border-white/50 bg-yellow-700 text-center py-2 rounded-md'>
						<b>Order ID:</b> {order.id}
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
	);
};

export default OrderItem;