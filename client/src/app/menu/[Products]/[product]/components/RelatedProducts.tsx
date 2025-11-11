import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Products from '@/context/Products';

import Section from '@/components/ui/layout/Section';

interface RelatedProductsProps {
	currentProduct: ProductType;
	categoryName: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProduct, categoryName }) => {
	// Find the category and then filter products from it
	const category = Products.find(
		(group) => group.Name.toLowerCase() === categoryName.toLowerCase()
	);
	const relatedProducts = category
		? category.Products.filter((product) => product.ProductID !== currentProduct.ProductID).slice(
				0,
				4
		  ) // Show max 4 related products
		: [];

	if (relatedProducts.length === 0) {
		return null;
	}

	return (
		<Section tittle='You Might Also Like'>
			<div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-2'>
				{relatedProducts.map((product) => (
					<Link
						key={product.ProductID}
						href={`/menu/${categoryName
							.toLowerCase()
							.replace(/\s+/g, '-')}/${product.Name.toLowerCase().replace(/\s+/g, '-')}`}
						className='group relative bg-red-700  rounded-md p-2 pt-6  flex flex-col transition-transform duration-300 hover:scale-105 hover:border-white'>
						{product.Image && (
							<div className='relative w-full aspect-square  overflow-hidden rounded-md'>
								<Image
									src={product.Image}
									alt={product.Name}
									fill
									className=' transition-transform duration-300 group-hover:scale-110'
								/>
							</div>
						)}
						<div className='flex-grow  flex flex-col'>
							<h1 className='font-semibold text-white text-base mb-2 line-clamp-2 flex-grow'>
								{product.Name}
							</h1>
							<p className='text-white font-bold text-md mt-auto'>R{product.Price.toFixed(2)}</p>
							{product.badge && (
								<span className='absolute w-full top-0 right-0 px-2 py-1 rounded-t-md text-xs font-bold bg-red-600 text-white'>
									{product.badge}
								</span>
							)}
						</div>
					</Link>
				))}
			</div>
		</Section>
	);
};

export default RelatedProducts;
