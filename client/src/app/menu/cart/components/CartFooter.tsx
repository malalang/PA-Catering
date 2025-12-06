'use client';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/context/CartContext';
import { addOrder } from '@/lib/supabase/orders/orders';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoAddCircle, IoCheckmarkCircleSharp } from 'react-icons/io5';
import { TbCancel } from 'react-icons/tb';
import { HiShoppingCart } from 'react-icons/hi2';

function CartFooter() {
	const router = useRouter();
	const { cartItems, clearCart, totalPrice, totalQuantity } = useCart();
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);

	const handlePlaceOrder = async () => {
		if (isPlacingOrder) return;
		setIsPlacingOrder(true);
		try {
			// Get the authenticated user from Supabase
			const { createClient } = await import('@/lib/supabase/client');
			const supabase = createClient();
			const { data: { user } } = await supabase.auth.getUser();

			// Only authenticated users can place orders
			if (!user) {
				alert('Please log in to place an order.');
				router.push('/login');
				return;
			}

			await addOrder(user.id, cartItems, totalPrice, totalQuantity);
			router.push('/orders');
			clearCart();
		} catch (error) {
			console.error('Failed to place order: ', error);
			alert('There was an issue placing your order. Please try again.');
		} finally {
			setIsPlacingOrder(false);
		}
	};

	const handleCancelOrder = () => {
		clearCart();
		router.back();
	};

	return (
		<footer className='fixed bottom-0 left-0 right-0 z-50'>
			{/* Gradient Fade Top */}
			<div className="absolute -top-24 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

			<div className="bg-black/80 backdrop-blur-xl border-t border-white/10 pb-safe">
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex flex-col gap-6'>

						{/* Receipt Summary */}
						<div className="flex items-end justify-between border-b border-dashed border-white/20 pb-6">
							<div className="flex flex-col gap-1">
								<span className="text-white/50 text-sm uppercase tracking-widest">Total Items</span>
								<span className="text-xl font-mono text-white">{totalQuantity}</span>
							</div>
							<div className="flex flex-col gap-1 text-right">
								<span className="text-amber-500 text-sm uppercase tracking-widest font-bold">Total Amount</span>
								<span className="text-4xl font-mono text-white tracking-tighter">
									R{totalPrice.toFixed(2)}
								</span>
							</div>
						</div>

						{/* Action Buttons */}
						<nav className='grid grid-cols-2 lg:flex gap-4'>
							{/* Cancel */}
							<button
								onClick={handleCancelOrder}
								className='col-span-1 lg:flex-none px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-colors'
							>
								Cancel
							</button>

							{/* Add More */}
							<button
								onClick={() => router.back()}
								className='col-span-1 lg:flex-none px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-widest text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors'
							>
								Add More
							</button>

							{/* Place Order - Massive Button */}
							{cartItems.length > 0 && (
								<button
									onClick={handlePlaceOrder}
									disabled={isPlacingOrder}
									className='col-span-2 lg:flex-1 bg-amber-500 text-black text-lg md:text-xl font-bold uppercase tracking-[0.2em] py-5 rounded-xl hover:bg-amber-400 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1'
								>
									{isPlacingOrder ? (
										<div className="flex items-center justify-center gap-3">
											<div className='w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin'></div>
											<span>Processing...</span>
										</div>
									) : (
										<div className="flex items-center justify-center gap-3">
											<span>Confirm Order</span>
											<IoCheckmarkCircleSharp size={24} />
										</div>
									)}
								</button>
							)}
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default CartFooter;
