import React, { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import { IoClose } from 'react-icons/io5';
import CartProduct from '@/features/cart/components/CartProduct';
import CartFooter from '@/features/cart/components/CartFooter';
import AppLink from '@/components/ui/Link';
import Main from '@/components/ui/layout/Main';


const CartPage: React.FC = () => {
	return (
		<Main >
			<AppLink className="mb-2" href="/menu" >
				<IoClose /> Close Cart
			</AppLink>
			<Suspense fallback={<Loading message="Loading Cart..." />}>
				<CartProduct />
			</Suspense>
			<Suspense fallback={<Loading message="Loading Cart footer..." />}>
				{/* Fixed footer section for total summary and action buttons */}
				<CartFooter />
			</Suspense>
			</Main>
	
	);
};

export default CartPage;
