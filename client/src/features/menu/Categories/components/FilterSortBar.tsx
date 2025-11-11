'use client';

import React, { useState, useEffect } from 'react';
import { FaSort, FaFilter } from 'react-icons/fa';
import Button from '@/components/ui/Button';

interface FilterSortBarProps {
	onSortChange: (sortType: string) => void;
	onPriceFilterChange: (minPrice: number, maxPrice: number) => void;
	currentSort: string;
	currentMinPrice: number;
	currentMaxPrice: number;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
	onSortChange,
	onPriceFilterChange,
	currentSort,
	currentMinPrice,
	currentMaxPrice,
}) => {
	const [showFilters, setShowFilters] = useState(false);
	const [localMinPrice, setLocalMinPrice] = useState(currentMinPrice);
	const [localMaxPrice, setLocalMaxPrice] = useState(currentMaxPrice);

	useEffect(() => {
		setLocalMinPrice(currentMinPrice);
		setLocalMaxPrice(currentMaxPrice);
	}, [currentMinPrice, currentMaxPrice]);

	const handleApplyFilters = () => {
		onPriceFilterChange(localMinPrice, localMaxPrice);
		setShowFilters(false);
	};

	const handleResetFilters = () => {
		setLocalMinPrice(0);
		setLocalMaxPrice(1000);
		onPriceFilterChange(0, 1000);
		onSortChange('default');
		setShowFilters(false);
	};

	const inputStyles =
		'w-24 p-2 border border-white/50 rounded-md bg-black/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200';

	return (
		<div className='bg-black/50 blur-[0.1px] backdrop-blur-md p-2  sticky top-9 z-20 col-span-full mt-0'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
				{/* Sort Options */}
				<div className='flex items-center gap-3'>
					<FaSort size={20} />
					<label
						htmlFor='sort-select'
						className='font-semibold'>
						Sort by:
					</label>
					<select
						id='sort-select'
						value={currentSort}
						onChange={(e) => onSortChange(e.target.value)}
						className='bg-black/20 text-white border border-white/50 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200'>
						<option value='default'>Default</option>
						<option value='price-low'>Price: Low to High</option>
						<option value='price-high'>Price: High to Low</option>
						<option value='popularity'>Most Popular</option>
						<option value='name'>Name: A-Z</option>
					</select>
				</div>

				{/* Filter Toggle */}
				<Button
					variant='primary'
					onClick={() => setShowFilters(!showFilters)}
					className='flex items-center gap-2'>
					<FaFilter />
					<span>{showFilters ? 'Hide' : 'Show'} Filters</span>
				</Button>
			</div>

			{/* Filter Panel */}
			{showFilters && (
				<article className=' p-4 space-y-4'>
					<h3 className='text-lg font-semibold mb-2'>Price Range</h3>
					<div className='flex flex-col md:flex-row flex-wrap gap-4 items-center'>
						<div className='flex items-center gap-2'>
							<label
								htmlFor='min-price'
								className='text-sm'>
								Min:
							</label>
							<input
								id='min-price'
								type='number'
								value={localMinPrice}
								onChange={(e) => setLocalMinPrice(Number(e.target.value))}
								className={inputStyles}
								placeholder='0'
							/>
						</div>
						<div className='flex items-center gap-2'>
							<label
								htmlFor='max-price'
								className='text-sm'>
								Max:
							</label>
							<input
								id='max-price'
								type='number'
								value={localMaxPrice}
								onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
								className={inputStyles}
								placeholder='1000'
							/>
						</div>
						<div className='flex gap-2 ml-auto'>
							<Button
								variant='primary'
								onClick={handleResetFilters}>
								Reset
							</Button>
							<Button
								variant='primary'
								onClick={handleApplyFilters}>
								Apply
							</Button>
						</div>
					</div>
				</article>
			)}
		</div>
	);
};

export default FilterSortBar;
