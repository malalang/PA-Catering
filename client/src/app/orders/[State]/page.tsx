import React from 'react';

import GetUser from '@/firebase/users/server/GetServerUser';
import Image from 'next/image';

import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';
import { getOrdersForUserFromFirestore } from '@/firebase/orders/getOrderFromFirestore';


const StateOrderPage = async () => {
	const user = await GetUser();

	if (!user) {
		return (
			<main className='p-4'>
				<p className='text-white text-center'>Please log in to see your order history.</p>
			</main>
		);
	}

	const orders = await getOrdersForUserFromFirestore(user.uid);

	if (orders.length === 0) {
		return (
			<main className='p-4'>
				<p className='text-white text-center'>You have no orders yet.</p>
			</main>
		);
	}

	return (
		<Main>
			{orders.map((order: Order) => (
				<Section
					tittle={`Order on ${new Date(order.orderDate).toLocaleDateString()}`}
					key={order.orderId}>
					<ul className='text-white'>
						<li>
							<p>
								<b>Order Number:</b> {order.orderId}
							</p>
							<p>
								<b>Date:</b> {new Date(order.orderDate).toLocaleDateString()}
							</p>
							<p className='mt-2'>
								<b>Products:</b>
							</p>
							<ul className='mt-2 space-y-2'>
								{order.products?.map((item: CartItem) => (
									<li
										className='border-t border-white/20 py-2'
										key={item.ProductID + Math.random().toString()}>
										<article className='flex gap-4 items-center'>
											{item.Image && (
												<Image
													src={item.Image}
													alt={item.Name}
													width={80}
													height={80}
													className='rounded-md'
												/>
											)}
											<div>
												<h3 className='font-semibold text-white'>{item.Name}</h3>
												<p>
													<b>Quantity:</b> {item.quantity}
												</p>
												<p>
													<b>Price:</b> R{item.Price.toFixed(2)}
												</p>
											</div>
										</article>
									</li>
								))}
							</ul>
							<p className='mt-2'>
								<b>Total:</b> R{order.totalAmount.toFixed(2)}
							</p>
							<p>
								<b>Status:</b> <span className='font-semibold text-white'>{order.status}</span>
							</p>
						</li>
					</ul>
				</Section>
			))}
		</Main>
	);
};

export default StateOrderPage;
