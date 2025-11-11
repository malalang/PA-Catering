'use client';

import ProductDetails from '@/app/menu/components/ProductDetails';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';
import { useCart } from '@/context/CartContext';
import React from 'react';
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

function CartProduct() {
	const { cartItems, removeFromCart, minisItemQuantity, addItem } = useCart();

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className='text-center text-white bg-black/50 p-8 rounded-md'>
				<h2
					className='text-2xl font-bold'
					style={{ filter: 'drop-shadow(0 0 3px #ff0000)' }}>
					Your Cart is Empty
				</h2>
			</div>
		);
	}

	const quantityButtonStyle =
		' text-white rounded-md bg-red-600 hover:bg-red-500 transition-colors duration-200 ease-in-out';
	const removeButtonStyle =
		'flex items-center justify-center gap-2 px-3 py-2 text-white rounded-md bg-red-700 hover:bg-red-600 transition-colors duration-200 ease-in-out font-semibold';

	return (
		<Section
			tittle='	Your Items'
			className=' p-2  max-h-[70vh] overflow-y-auto'>
			<ul className='space-y-4'>
				{cartItems.map((item) => (
					<li
						className='p-0 rounded-md border border-white/50 '
						key={item.ProductID}>
						<article className='p-4 m-0 flex flex-col md:flex-row items-center justify-between gap-4'>
							<ProductDetails item={item} />

							<div className='flex items-center justify-between gap-3 w-full md:w-auto'>
								{/* Quantity Controls */}
								<div className='flex items-center gap-2 bg-black/50 p-1 rounded-md'>
									<Button
										title='Decrease Quantity'
										onClick={() => minisItemQuantity(item)}
										className={quantityButtonStyle}>
										<FaMinusCircle />
									</Button>
									<span className='px-3 text-lg font-bold text-white'>{item.quantity}</span>
									<Button
										title='Increase Quantity'
										onClick={() => addItem(item)}
										className={quantityButtonStyle}>
										<FaPlusCircle />
									</Button>
								</div>

								{/* Remove Button */}
								<Button
									title='Remove Item'
									onClick={() => removeFromCart(item.ProductID)}
									className={removeButtonStyle}>
									<FaTrashAlt />
									<span className='hidden sm:inline'>Remove</span>
								</Button>
							</div>
						</article>
					</li>
				))}
			</ul>
		</Section>
	);
}

export default CartProduct;
