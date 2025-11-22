'use client';

import React from 'react';

import CategoryCard from '@/app/menu/components/CategoryCard';
import NoResults from '@/app/menu/components/NoResults';
import ProductCard from './ProductCard';

interface MenuSectionsProps {
	categories: ProductsType;
	matchingProducts: ProductType[];
	productCategoryMap?: Map<string, string>; // Map of ProductID -> category slug
	isSearching: boolean;
}

const MenuSections: React.FC<MenuSectionsProps> = ({ categories, matchingProducts, productCategoryMap, isSearching }) => {
	const showSearchResults = isSearching;

	return (
		<>
			{showSearchResults ? (
				<div className='flex flex-col gap-6'>
					{categories.length > 0 || matchingProducts.length > 0 ? (
						<div className='flex flex-col gap-6'>
							{/* Categories Section */}
							{categories.length > 0 && (
								<div className='space-y-4'>
									<h2 className='text-2xl font-bold text-white border-b border-yellow-500 pb-2'>
										Matching Categories
									</h2>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{categories.map((category) => (
											<CategoryCard
												key={category.Name}
												group={category}
											/>
										))}
									</div>
								</div>
							)}

							{/* Products Section */}
							{matchingProducts.length > 0 && (
								<div className='space-y-4'>
									<h2 className='text-2xl font-bold text-white border-b border-yellow-500 pb-2'>
										Matching Products
									</h2>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
										{matchingProducts.map((product) => {
											// Get category slug from map, fallback to 'menu' if not found
											const categorySlug = productCategoryMap?.get(product.ProductID) || 'menu';
											return (
												<ProductCard
													key={product.ProductID}
													product={product}
													categoryName={categorySlug}
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
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{categories.map((group: ProductsType[number]) => {
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
