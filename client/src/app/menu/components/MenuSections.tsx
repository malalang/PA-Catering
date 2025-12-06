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
				<div className='flex flex-col gap-16'>
					{categories.length > 0 || matchingProducts.length > 0 ? (
						<div className='flex flex-col gap-16'>
							{/* Categories Section */}
							{categories.length > 0 && (
								<div className='space-y-8'>
									<div className="flex items-center gap-4">
										<h2 className='text-3xl font-bold text-white font-small-caps tracking-widest'>
											Categories
										</h2>
										<div className="h-px flex-grow bg-gradient-to-r from-amber-500/50 to-transparent" />
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
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
								<div className='space-y-8'>
									<div className="flex items-center gap-4">
										<h2 className='text-3xl font-bold text-white font-small-caps tracking-widest'>
											Products
										</h2>
										<div className="h-px flex-grow bg-gradient-to-r from-amber-500/50 to-transparent" />
									</div>
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
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
				<ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
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
