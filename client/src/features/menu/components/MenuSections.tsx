'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/features/menu/components/ProductCard';
import CategoryCard from '@/features/menu/components/CategoryCard';
import NoResults from '@/features/menu/components/NoResults';

const MenuSections = () => {
	const { products, search, matchingCategories, matchingProductsByCategory } = useCart();

	const showSearchResults = search.length > 0;

	// No need for complex state management, using the context values directly

	return (
		<>
			{showSearchResults ? (
				<div className='flex flex-col gap-6'>
					{matchingCategories.length > 0 || matchingProductsByCategory.length > 0 ? (
						<div className='flex flex-col gap-6'>
							{/* Categories Section */}
							{matchingCategories.length > 0 && (
								<div className='space-y-4'>
									<h2 className='text-2xl font-bold text-white border-b border-red-500 pb-2'>
										Matching Categories
									</h2>
									<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{matchingCategories.map((category) => (
											<CategoryCard
												key={category.Name}
												group={category}
											/>
										))}
									</div>
								</div>
							)}

							{/* Products Section */}
							{matchingProductsByCategory.length > 0 && (
								<div className='space-y-4'>
									<h2 className='text-2xl font-bold text-white border-b border-red-500 pb-2'>
										Matching Products
									</h2>
									<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{matchingProductsByCategory.map((product) => {
											const category = products.find((cat) =>
												cat.Products.some((p) => p.ProductID === product.ProductID)
											);
											return (
												<ProductCard
													key={product.ProductID}
													product={product}
													categoryName={category?.Name || 'Other'}
												/>
											);
										})}
									</div>
								</div>
							)}
						</div>
					) : (
						<NoResults />
					)}
				</div>
			) : (
				// Default: show all categories
				<ul className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{products.map((group: ProductsType[number]) => {
						return (
							<CategoryCard
								key={group.Name}
								group={group}
							/>
						);
					})}
				</ul>
			)}
		</>
	);
};

export default MenuSections;
