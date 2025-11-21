import Image from 'next/image';
import React from 'react';

function ProductDetails({ item }: { item: CartItem }) {
	return (
		<div className='flex items-center gap-4 w-full text-white bg-black/20  rounded-md p-4'>
			{item.Image && (
				<div className=' w-20 h-20 sm:w-24 sm:h-24  flex-shrink-0'>
					<Image
						src={item.Image}
						alt={item.Name}
						height={100}
						width={100}
						className='w-full rounded-md  '
					/>
				</div>
			)}
			<div className='flex-grow flex flex-col justify-between h-full'>
				<h4>{item.Name}</h4>
				<div className='space-y-1 text-sm'>
					<div className='flex justify-between'>
						<span className='text-white'>Quantity:</span>
						<span className='font-semibold'>{item.quantity}</span>
					</div>
					<div className='flex justify-between'>
						<span className='text-white'>Price:</span>
						<span className='font-semibold'>R{item.Price.toFixed(2)}</span>
					</div>
					{item.quantity > 1 && (
						<div className='flex justify-between font-bold border-t border-white/20 pt-1 mt-1'>
							<span className='text-white'>Total:</span>
							<span>R{(item.Price * item.quantity).toFixed(2)}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
