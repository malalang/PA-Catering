import React, { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import { IoClose } from 'react-icons/io5';
import CartProductForm from '@/lib/forms/CartProductForm';
import CartFooter from '@/app/menu/cart/components/CartFooter';
import AppLink from '@/components/ui/Link';
import Main from '@/components/ui/layout/Main';


const CartPage: React.FC = () => {
	return (
		<Main >
			<AppLink className="mb-2 bg-red-500/10 backdrop-blur-sm border border-red-500/30 hover:border-red-500/50 transition-all duration-200 hover:shadow-red-500/20 rounded-xl" href="/menu" >
				<IoClose /> Close Cart
			</AppLink>
			<Suspense fallback={<Loading message="Loading Cart..." />}>
				<CartProductForm />
			</Suspense>
			<Suspense fallback={<Loading message="Loading Cart footer..." />}>
				<CartFooter />
			</Suspense>
		</Main>

	);
};

export default CartPage;
