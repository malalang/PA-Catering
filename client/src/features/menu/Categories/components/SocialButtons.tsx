'use client';

import { BiSolidShare } from 'react-icons/bi';
import LikesButton from './LikesButton';

import CommentsButton from './CommentsButton';

interface SocialButtonsProps {
	product: ProductType;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ product }) => {
	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: product.Name,
					text: `Check out this product: ${product.Name}`,
					url: window.location.href, // Or the specific product URL
				})
				.catch((error) => console.error('Error sharing:', error));
		} else {
			// Fallback for browsers that don't support Web Share API
			alert('Sharing is not supported in this browser.');
			// You could also provide a copy-to-clipboard option here
		}
	};

	return (
		<div className=' grid grid-cols-3 w-full border-t-2 py-1 border-red-500 bg-black/50 hover:bg-red-500 gap-2'>
			<LikesButton product={product} />
			<CommentsButton product={product} />
			{/* Share Button */}
			<span
				className='flex items-center justify-center gap-1 truncate text-center py-0.5 cursor-pointer text-white font-bold'
				onClick={handleShare}>
				<BiSolidShare size={20} />
				<span className='text-xs text-center truncate'>Share</span>
			</span>
		</div>
	);
};

export default SocialButtons;
