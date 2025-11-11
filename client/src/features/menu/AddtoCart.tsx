'use client';

import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/CartContext';

import Button from '@/components/ui/Button';
import { BiSolidCartAdd } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

interface AddtoCartProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	product: ProductType;
}

const AddtoCart: React.FC<AddtoCartProps> = ({ product, ...props }) => {
	const { addItem } = useCart();
	const { showToast } = useToast();
	const router = useRouter();
	return (
		<Button
			variant='primary'
			className='w-full'
			size='sm'
			onClick={() => {
				addItem(product);
				showToast(`Added ${product.Name} (R${product.Price.toFixed(2)}) to cart!`);
				router.push('/menu/cart');
			}}
			{...props}>
			<BiSolidCartAdd
				color='white'
				size={24}
			/>
			Add to Cart
		</Button>
	);
};

export default AddtoCart;
