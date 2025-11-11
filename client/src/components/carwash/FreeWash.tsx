import Icon from '@/components/ui/Icon';
import React from 'react';
import { FaGift } from 'react-icons/fa';

function FreeWash({ carWashCount = 0 }: { carWashCount: UserProfile["carWashCount"] }) {
	const washesNeeded = 5 - (carWashCount % 10);
	const isFreeWash = carWashCount > 0 && carWashCount % 5 === 0;
	return (
		<article>
			<Icon
				icon={FaGift}
				heading='Loyalty Status'
			/>
			<div className='mt-2 text-white'>
				{isFreeWash ? (
					<p className='text-green-400 font-semibold'>
						Congratulations! Your next car wash is FREE!
					</p>
				) : (
					<p>
						You have {carWashCount} car washes. {washesNeeded} more to go for a free wash!
					</p>
				)}
			</div>
		</article>
	);
}

export default FreeWash;
