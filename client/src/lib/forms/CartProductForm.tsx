'use client';

import ProductDetails from '@/app/menu/components/ProductDetails';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/layout/Section';
import { useCart } from '@/lib/context/CartContext';
import { HiMinusSm, HiPlusSm, HiTrash, HiShoppingCart } from 'react-icons/hi';

function CartProductForm() {
	const { cartItems, removeFromCart, minisItemQuantity, addItem } = useCart();

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className='text-center bg-gradient-to-br from-yellow-900/90 to-yellow-800/90 backdrop-blur-xl p-12 rounded-2xl border border-white/10 shadow-2xl'>
				<div className='flex flex-col items-center gap-4'>
					<div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-6 rounded-full border border-amber-400/30'>
						<HiShoppingCart className='text-6xl text-amber-400' />
					</div>
					<h2 className='text-3xl font-bold text-white'>
						Your Cart is Empty
					</h2>
					<p className='text-yellow-400 max-w-md'>
						Start adding delicious items to your cart and place your order!
					</p>
				</div>
			</div>
		);
	}

	return (
		<Section
			tittle='Your Items'
			className='p-4 max-h-[70vh] overflow-y-auto custom-scrollbar'>
			<ul className='space-y-3 px-2'>
				{cartItems.map((item) => (
					<li
						className=' group rounded-xl border border-white/10 bg-gradient-to-br from-yellow-900/80 to-yellow-800/80 backdrop-blur-sm hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10'
						key={item.ProductID}>
						<article className='p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
							<ProductDetails item={item} />

							<div className='flex items-center gap-3 w-full md:w-auto'>
								{/* Quantity Controls with modern design */}
								<div className='flex items-center gap-2 bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-xl border border-white/10'>
									<Button
										title='Decrease Quantity'
										onClick={() => minisItemQuantity(item)}
										className='p-2 text-white rounded-lg bg-gradient-to-br from-amber-600/80 to-yellow-600/80 hover:from-amber-500 hover:to-yellow-500 transition-all duration-200 disabled:opacity-50 border-0 shadow-md hover:shadow-amber-500/50'>
										<HiMinusSm size={18} />
									</Button>

									<span className='px-4 text-xl font-bold text-white min-w-[3rem] text-center'>
										{item.quantity}
									</span>

									<Button
										title='Increase Quantity'
										onClick={() => addItem(item)}
										className='p-2 text-white rounded-lg bg-gradient-to-br from-amber-600/80 to-yellow-600/80 hover:from-amber-500 hover:to-yellow-500 transition-all duration-200 disabled:opacity-50 border-0 shadow-md hover:shadow-amber-500/50'>
										<HiPlusSm size={18} />
									</Button>
								</div>

								{/* Remove Button with improved styling */}
								<Button
									title='Remove Item'
									onClick={() => removeFromCart(item.ProductID)}
									className='flex items-center justify-center gap-2 px-4 py-2.5 text-red-300 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200 font-semibold shadow-md hover:shadow-red-500/20'>
									<HiTrash size={18} />
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

export default CartProductForm;
