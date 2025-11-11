import SocialButtons from '@/features/menu/Categories/components/SocialButtons';

import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
	handleBackdropClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	product: ProductType;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageModal: NextPage<Props> = ({ handleBackdropClick, setModalOpen, product }) => {
	return (
		<main
			className='fixed inset-0 z-50 flex items-center justify-center bg-black  animate-fadein p-4'
			onClick={handleBackdropClick}
			aria-modal='true'
			role='dialog'>
			<div className='relative max-w-4xl  w-full '>
				<button
					onClick={() => setModalOpen(false)}
					className='absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10'
					aria-label='Close full image'
					autoFocus>
					<svg
						width='24'
						height='24'
						fill='none'
						viewBox='0 0 24 24'>
						<path
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6 6l12 12M6 18L18 6'
						/>
					</svg>
				</button>
				<article className='w-full relative m-0 p-0  flex flex-col items-center justify-center'>
					{product?.Image && (
						<div className='relative p-4 w-full max-h-[75vh] '>
							<Image
								src={product.Image}
								alt={`${product.Name} gallery image`}
								layout='responsive'
								width={500}
								height={500}
								className=' rounded-md'
								priority
							/>
						</div>
					)}
					<div className='text-white text-center text-lg font-bold'>{product.Name}</div>
					<SocialButtons product={product} />
				</article>
			</div>
		</main>
	);
};

export default ImageModal;
