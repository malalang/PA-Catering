'use client';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';
import { addOrderToFirestore } from '@/firebase/orders/addOrderToFirestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoAddCircle } from 'react-icons/io5';
import { TbCancel, TbMenuOrder } from 'react-icons/tb';

function CartFooter() {
	const router = useRouter();
	const { cartItems, clearCart, totalPrice, totalQuantity } = useCart();
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);

	const handlePlaceOrder = async () => {
		if (isPlacingOrder) return;
		setIsPlacingOrder(true);
		try {
			await addOrderToFirestore(cartItems, totalPrice, totalQuantity);
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
		
			<div className='bg-black/50 fixed bottom-0 pb-4  flex flex-col md:flex-row items-center justify-between gap-2'>
				{/* Order Summary */}
				<div className='text-center md:text-left'>
					<p className='text-lg font-bold'>
						Total Items: <span className='font-extrabold'>{totalQuantity}</span>
					</p>
					<p
						className='text-xl font-bold'
						style={{ filter: 'drop-shadow(0 0 2px #000000)' }}>
						Total Price: <span className='font-extrabold'>R{totalPrice.toFixed(2)}</span>
					</p>
				</div>

				{/* Action Buttons */}
				<nav className='flex gap-3 px-2 w-full md:w-auto'>
					{/* Button to add more items (goes back to menu) */}
					<Button onClick={() => router.back()}>
						<IoAddCircle size={25} /> Add Items
					</Button>
					
					{cartItems.length > 0 && (
						<Button
							onClick={handlePlaceOrder}
							// className={buttonStyle}
							disabled={isPlacingOrder}>
							{isPlacingOrder ? (
								<div className='w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin'></div>
							) : (
								<TbMenuOrder size={22} />
							)}
							<span>{isPlacingOrder ? 'Placing Order...' : 'Place Order'}</span>
						</Button>
					)}

					<Button
						onClick={handleCancelOrder}
                    // className={buttonStyle}
                >
						<TbCancel size={22} />
						<span>Cancel Order</span>
					</Button>
				</nav>
			</div>
	
	);
}

export default CartFooter;
