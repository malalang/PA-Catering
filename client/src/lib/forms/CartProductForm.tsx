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
			<div className='flex flex-col items-center justify-center py-20 px-4'>
				<div className='relative group mb-8'>
					<div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse" />
					<div className="relative bg-black/60 backdrop-blur-xl border border-amber-500/30 p-8 rounded-full shadow-2xl">
						<HiShoppingCart className='text-6xl text-amber-500' />
					</div>
				</div>
				<h2 className='text-3xl font-bold text-white font-small-caps tracking-widest mb-4'>
					Your Cart is Empty
				</h2>
				<p className='text-white/60 text-lg max-w-md text-center leading-relaxed'>
					Your culinary journey awaits.
					<span className="block mt-2 text-amber-400">Add some exquisite items to get started.</span>
				</p>
			</div>
		);
	}

	return (
		<Section
			tittle='Order Details'
			className='max-h-[70vh] overflow-y-auto custom-scrollbar bg-neutral-900/20 backdrop-blur-sm border-none p-0'>
			<ul className='flex flex-col gap-6 px-2 md:px-4 pb-24'>
				{cartItems.map((item) => (
					<li
						className='group relative flex flex-col md:flex-row items-center gap-6 bg-black/40 border border-white/5 rounded-2xl p-6 transition-all duration-500 hover:border-amber-500/20'
						key={item.ProductID}>

						{/* Product Info */}
						<div className="flex-1 w-full">
							<ProductDetails item={item} />
						</div>

						{/* Controls */}
						<div className='flex items-center justify-between w-full md:w-auto gap-6'>
							{/* Quantity */}
							<div className='flex items-center gap-4 bg-white/5 rounded-full px-4 py-2 border border-white/10'>
								<button
									onClick={() => minisItemQuantity(item)}
									className='text-white/50 hover:text-white transition-colors p-1'>
									<HiMinusSm size={20} />
								</button>
								<span className='w-8 text-center text-xl font-bold text-amber-400 font-mono'>
									{item.quantity}
								</span>
								<button
									onClick={() => addItem(item)}
									className='text-white/50 hover:text-white transition-colors p-1'>
									<HiPlusSm size={20} />
								</button>
							</div>

							{/* Remove */}
							<button
								onClick={() => removeFromCart(item.ProductID)}
								className='text-white/30 hover:text-red-400 transition-colors p-2'
								title='Remove Item'>
								<HiTrash size={20} />
							</button>
						</div>
					</li>
				))}
			</ul>
		</Section>
	);
}

export default CartProductForm;
