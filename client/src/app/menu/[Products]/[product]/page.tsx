import Products from '@/context/Products';
import Image from 'next/image';
import SocialButtons from '../../../../features/menu/Categories/components/SocialButtons';
import Comments from './components/comments';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import FavoriteButton from './components/FavoriteButton';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import AddtoCart from '@/features/menu/AddtoCart';
import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';

async function ProductPage({ params }: { params: Promise<{ product: string; Products: string }> }) {
	const { product: productId, Products: categoryName } = await params;

	const product = Products.flatMap((group) => group.Products).find(
		(p) => p.Name.toLowerCase().replace(/\s+/g, '-') === productId
	);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<Main>
			{/* Main Product Section */}
			<Section>
				{/* Product Image */}
				{product.Image && (
					<div className='lg:w-1/2 flex justify-center items-start'>
						<div className='relative w-full max-w-md aspect-square bg-black/20 rounded-md shadow-lg overflow-hidden'>
							<Image
								src={product.Image}
								alt={product.Name}
								fill
								style={{ objectFit: 'contain' }}
								className='rounded-md'
							/>
						</div>
					</div>
				)}

				{/* Product Information */}
				<div className='lg:w-1/2'>
					<ProductInfo product={product} />

					{/* Action Buttons */}
					<div className='flex flex-wrap gap-4 mt-8'>
						<AddtoCart
							product={product}
							className='bg-black/50 hover:bg-red-500'>
							Add to Cart
						</AddtoCart>
						<FavoriteButton product={product} />
						<SocialButtons product={product} />
					</div>
				</div>
			</Section>

			{/* Related Products */}
			<RelatedProducts
				currentProduct={product}
				categoryName={categoryName}
			/>

			{/* Comments Section */}

			<Comments product={product} />
		</Main>
	);
}

export default ProductPage;
