import React from 'react';

import ProductDetails from '@/app/menu/components/ProductDetails';
import Section from '@/components/ui/layout/Section';

const OrderItem: React.FC<{ order: Order }> = ({ order }) => {
	return (
		<Section key={order.orderId}>
			{!order.paymentMethod && (
				<div className='rounded-md bg-red-900  p-3 mb-4'>
					<p className='text-white font-bold text-center'>
						Dear Customer, Select your payment Method
					</p>
					<input
						type='text'
						placeholder='Enter payment method'
						className='w-full p-2 border border-gray-300 rounded-md'
					/>
				</div>
			)}
			<h2>{new Date(order.orderDate).toLocaleDateString()}</h2>
			<ul>
				<li>
					<p className='border border-white/50 bg-red-700 text-center py-2 rounded-md'>
						<b>Order ID:</b> {order.orderId}
					</p>
					<article>
						<ol className='list-decimal'>
							{order.products &&
								order.products.map((item) => (
									<li
										className='border-b pb-2'
										key={item.ProductID + Math.round(Math.random() * 1000)}>
										<p className='text-lg font-bold text-white'>{item.Name}</p>
										<ProductDetails item={item} />
									</li>
								))}
						</ol>
					</article>
					<dl className='grid grid-cols-2 items-baseline-last text-sm gap-x-4'>
						<dt className='font-bold'>Total</dt>
						<dd className='slashed-zero tabular-nums'>R{order.totalAmount.toFixed(2)}</dd>
						<dt className='font-bold'>Quantity</dt>
						<dd className='slashed-zero tabular-nums'>
							{order.products.reduce((acc, item) => acc + item.quantity, 0)}
						</dd>
						<dt className='font-bold'>Status</dt>
						<dd>{order.status}</dd>
					</dl>
				</li>
			</ul>
		</Section>
	);
};

export default OrderItem;
