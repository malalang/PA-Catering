'use client';

import { useCart } from '@/lib/context/CartContext';
import { useToast } from '@/lib/context/CartContext';
import Button from '@/components/ui/Button';
import { HiShoppingCart } from 'react-icons/hi2';
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
			className='w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border-0 shadow-lg hover:shadow-amber-500/50 transition-all duration-200 font-semibold'
			size='sm'
			onClick={() => {
				addItem(product);
				showToast(`Added ${product.Name} (R${product.Price.toFixed(2)}) to cart!`);
				router.push('/menu/cart');
			}}
			{...props}>
			<HiShoppingCart
				color='white'
				size={20}
			/>
			Add to Cart
		</Button>
	);
};

export default AddtoCart;
