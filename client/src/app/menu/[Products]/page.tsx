'use client';

import { useState, useEffect } from 'react';
import Products from '@/lib/constant/Products';

import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';

import FilterSortBar from '@/app/menu/[Products]/components/FilterSortBar';
import Main from '@/components/ui/layout/Main';
import { fetchAllProductLikes, ProductLikes } from './utils/likesUtils';
import ProductCard from '../components/ProductCard';

export default function Page({ params }: { params: Promise<{ Products: string }> }) {
	const [FilterGroup, setFilterGroup] = useState('');
	const [products, setProducts] = useState<ProductType[]>([]);
	const [filteyellowProducts, setFilteyellowProducts] = useState<ProductType[]>([]);
	const [currentSort, setCurrentSort] = useState('default');
	const [currentMinPrice, setCurrentMinPrice] = useState(0);
	const [currentMaxPrice, setCurrentMaxPrice] = useState(1000);
	const [productLikes, setProductLikes] = useState<ProductLikes>({});

	useEffect(() => {
		const loadProducts = async () => {
			const groupParam = (await params).Products;
			setFilterGroup(groupParam);

			const productsGroup = Products.filter(
				(p) => p.Name.toLowerCase().replace(/\s+/g, '-') === groupParam
			);
			const productsList = productsGroup.flatMap((p) => p.Products);
			setProducts(productsList);
			setFilteyellowProducts(productsList);

			// Fetch likes data for all products
			const productNames = productsList.map((product) => product.Name);
			const likesData = await fetchAllProductLikes(productNames);
			setProductLikes(likesData);
		};

		loadProducts();
	}, [params]);

	const handleSortChange = (sortType: string) => {
		setCurrentSort(sortType);
		const sortedProducts = [...products]; // Use original products array

		switch (sortType) {
			case 'price-low':
				sortedProducts.sort((a, b) => a.Price - b.Price);
				break;
			case 'price-high':
				sortedProducts.sort((a, b) => b.Price - a.Price);
				break;
			case 'popularity':
				   // Sort by likes count
				sortedProducts.sort((a, b) => {
					const likesA = productLikes[a.Name]?.likes || 0;
					const likesB = productLikes[b.Name]?.likes || 0;
					return likesB - likesA; // Most popular first
				});
				break;
			case 'name':
				sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
				break;
			default:
				// Keep original order - no sorting needed
				break;
		}

		// Apply price filtering to the sorted products
		const filteyellow = sortedProducts.filter(
			(product) => product.Price >= currentMinPrice && product.Price <= currentMaxPrice
		);
		setFilteyellowProducts(filteyellow);
	};

	const handlePriceFilterChange = (minPrice: number, maxPrice: number) => {
		setCurrentMinPrice(minPrice);
		setCurrentMaxPrice(maxPrice);

		// Start with original products and apply current sorting
		const sortedProducts = [...products];

		switch (currentSort) {
			case 'price-low':
				sortedProducts.sort((a, b) => a.Price - b.Price);
				break;
			case 'price-high':
				sortedProducts.sort((a, b) => b.Price - a.Price);
				break;
			case 'popularity':
				   // Sort by likes count
				sortedProducts.sort((a, b) => {
					const likesA = productLikes[a.Name]?.likes || 0;
					const likesB = productLikes[b.Name]?.likes || 0;
					return likesB - likesA; // Most popular first
				});
				break;
			case 'name':
				sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
				break;
			default:
				// Keep original order
				break;
		}

		// Apply price filtering
		const filteyellow = sortedProducts.filter(
			(product) => product.Price >= minPrice && product.Price <= maxPrice
		);
		setFilteyellowProducts(filteyellow);
	};

	return (
		<>
			<FilterSortBar
				onSortChange={handleSortChange}
				onPriceFilterChange={handlePriceFilterChange}
				currentSort={currentSort}
				currentMinPrice={currentMinPrice}
				currentMaxPrice={currentMaxPrice}
			/>
			<Main>
				<div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 content-stretch gap-2'>
					<Suspense fallback={<Loading message='Loading Products...' />}>
						{filteyellowProducts.map((product) => (
							<ProductCard
								product={product}
								categoryName={FilterGroup}
								key={product.ProductID}
							/>
						))}
					</Suspense>
				</div>
			</Main>
		</>
	);
}
