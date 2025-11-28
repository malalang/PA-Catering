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
		<footer className='fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-t from-black/90 via-black/80 to-black/60 border-t border-white/10 shadow-2xl'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
				<div className='flex flex-col lg:flex-row items-center justify-between gap-4'>
					{/* Order Summary with improved visual hierarchy */}
					<div className='flex items-center gap-6 w-full lg:w-auto'>
						<div className='flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10'>
							<HiShoppingCart className='text-amber-400 text-2xl' />
							<div>
								<p className='text-xs text-yellow-400 uppercase tracking-wider'>Items</p>
								<p className='text-xl font-bold text-white'>{totalQuantity}</p>
							</div>
						</div>

						<div className='flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-6 py-2.5 rounded-xl border border-amber-400/30'>
							<div>
								<p className='text-xs text-amber-300 uppercase tracking-wider'>Total</p>
								<p className='text-2xl font-extrabold text-white tracking-tight'>
									R{totalPrice.toFixed(2)}
								</p>
							</div>
						</div>
					</div>

					{/* Action Buttons with improved styling */}
					<nav className='flex gap-2.5 w-full lg:w-auto'>
						{/* Add Items Button */}
						<Button
							onClick={() => router.back()}
							className='flex-1 lg:flex-none bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200'
						>
							<IoAddCircle size={20} className='text-amber-400' />
							<span className='hidden sm:inline'>Add Items</span>
							<span className='sm:hidden'>Add</span>
						</Button>

						{/* Place Order Button - only show if cart has items */}
						{cartItems.length > 0 && (
							<Button
								onClick={handlePlaceOrder}
								disabled={isPlacingOrder}
								className='flex-1 lg:flex-none bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border-0 shadow-lg hover:shadow-amber-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
							>
								{isPlacingOrder ? (
									<>
										<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
										<span className='hidden sm:inline'>Placing Order...</span>
										<span className='sm:hidden'>Placing...</span>
									</>
								) : (
									<>
										<IoCheckmarkCircleSharp size={20} />
										<span className='hidden sm:inline'>Place Order</span>
										<span className='sm:hidden'>Order</span>
									</>
								)}
							</Button>
						)}

						{/* Cancel Button */}
						<Button
							onClick={handleCancelOrder}
							className='flex-1 lg:flex-none bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-300 hover:text-red-200 transition-all duration-200'
						>
							<TbCancel size={20} />
							<span className='hidden sm:inline'>Cancel</span>
						</Button>
					</nav>
				</div>
			</div>
		</footer>
	);
}

export default CartFooter;
