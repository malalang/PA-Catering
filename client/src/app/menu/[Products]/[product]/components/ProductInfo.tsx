import React from 'react';
import { FaExclamationTriangle, FaLeaf, FaFire } from 'react-icons/fa';

interface ProductInfoProps {
	product: ProductType;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
	// Mock nutritional data - can be replaced with real data from product
	const nutritionalInfo = {
		calories: product?.nutritional?.calories || 450,
		protein: product?.nutritional?.protein || '12g',
		carbs: product?.nutritional?.carbs || '45g',
		fat: product?.nutritional?.fat || '18g',
		fiber: product?.nutritional?.fiber || '3g',
		sugar: product?.nutritional?.sugar || '8g',
	};

	// Mock allergen info - can be replaced with real data from product
	const allergens = product?.allergens || ['Gluten', 'Dairy', 'Eggs'];
	const isVegetarian = product?.isVegetarian || true;
	const isSpicy = product?.isSpicy || true;

	return (
		<div className=' p-2 rounded-md text-white space-y-8'>
			{/* Product Name and Price */}
			<article>
				<h1 className='text-4xl font-extrabold'>{product.Name}</h1>
				<p className='text-3xl text-center text-red-500 font-bold text-white mt-2'>
					R{product.Price.toFixed(2)}
				</p>
			</article>

			{/* Description & Dietary Tags */}
			<article>
				<h2 className='text-2xl font-bold text-white mb-3'>Description</h2>
				<ul className='list-disc list-inside space-y-1.5 text-white'>
					{product.Description.map((d: string, index: number) => (
						<li key={index}>{d}</li>
					))}
				</ul>
				<div className='flex flex-wrap gap-3 mt-4'>
					{isVegetarian && (
						<span className='flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold'>
							<FaLeaf /> Vegetarian
						</span>
					)}
					{isSpicy && (
						<span className='flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-sm font-semibold'>
							<FaFire /> Spicy
						</span>
					)}
				</div>
			</article>

			{/* Allergen Warnings Card */}
			{allergens.length > 0 && (
				<article className='bg-red-500/20 border border-red-500/50 rounded-md p-4'>
					<div className='flex items-center gap-3 mb-3'>
						<FaExclamationTriangle className='text-red-400 text-xl' />
						<h3 className='text-xl font-bold text-white'>Allergen Information</h3>
					</div>
					<p className='text-white text-sm mb-3'>This product contains the following allergens:</p>
					<div className='flex flex-wrap gap-2'>
						{allergens.map((allergen: string, index: number) => (
							<span
								key={index}
								className='px-2.5 py-1 bg-red-600 text-white rounded-md text-xs font-medium'>
								{allergen}
							</span>
						))}
					</div>
				</article>
			)}

			{/* Nutritional Information Card */}
			<div className='bg-black/20 rounded-md p-4'>
				<h3 className='text-xl font-bold text-white mb-4 text-center'>Nutritional Information</h3>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
					{Object.entries(nutritionalInfo).map(([key, value]) => (
						<div
							key={key}
							className='text-center bg-red-500/20 p-3 rounded-md'>
							<div className='text-2xl font-bold text-white'>{value}</div>
							<div className='text-sm text-white capitalize'>{key}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
