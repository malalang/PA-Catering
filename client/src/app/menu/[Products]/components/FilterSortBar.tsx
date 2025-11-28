'use client';

import React, { useState, useEffect } from 'react';
import { FaSort, FaFilter } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const FilterSortBar: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const currentSort = searchParams.get('sort') || 'default';
	const currentMinPrice = Number(searchParams.get('minPrice')) || 0;
	const currentMaxPrice = Number(searchParams.get('maxPrice')) || 1000;

	const [showFilters, setShowFilters] = useState(false);
	const [localMinPrice, setLocalMinPrice] = useState(currentMinPrice);
	const [localMaxPrice, setLocalMaxPrice] = useState(currentMaxPrice);

	useEffect(() => {
		setLocalMinPrice(currentMinPrice);
		setLocalMaxPrice(currentMaxPrice);
	}, [currentMinPrice, currentMaxPrice]);

	const updateParams = (updates: Record<string, string | number | null>) => {
		const params = new URLSearchParams(searchParams.toString());
		Object.entries(updates).forEach(([key, value]) => {
			if (value === null) {
				params.delete(key);
			} else {
				params.set(key, String(value));
			}
		});
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handleSortChange = (sortType: string) => {
		updateParams({ sort: sortType });
	};

	const handleApplyFilters = () => {
		updateParams({
			minPrice: localMinPrice,
			maxPrice: localMaxPrice,
		});
		setShowFilters(false);
	};

	const handleResetFilters = () => {
		setLocalMinPrice(0);
		setLocalMaxPrice(1000);
		updateParams({
			minPrice: null,
			maxPrice: null,
			sort: null,
		});
		setShowFilters(false);
	};

	const inputStyles =
		'w-24 p-2 border border-amber-400/30 rounded-md bg-slate-900/50 text-amber-100 placeholder-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-200';

	const buttonStyles = 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-400/30 text-amber-400 hover:bg-amber-600/30 hover:text-amber-300 transition-all duration-200';

	return (
		<div className='bg-slate-900/80 blur-[0.1px] backdrop-blur-md p-3 rounded-xl border border-amber-400/10 sticky top-20 z-20 col-span-full mt-0 shadow-xl shadow-black/20'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
				{/* Sort Options */}
				<div className='flex items-center gap-3'>
					<div className='p-2 rounded-lg bg-amber-400/10 text-amber-400'>
						<FaSort size={16} />
					</div>
					<label
						htmlFor='sort-select'
						className='font-semibold text-amber-100'>
						Sort by:
					</label>
					<select
						id='sort-select'
						value={currentSort}
						onChange={(e) => handleSortChange(e.target.value)}
						className='bg-slate-900/50 text-amber-100 border border-amber-400/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer hover:border-amber-400/50 transition-all duration-200'>
						<option value='default'>Default</option>
						<option value='price-low'>Price: Low to High</option>
						<option value='price-high'>Price: High to Low</option>
						<option value='popularity'>Most Popular</option>
						<option value='name'>Name: A-Z</option>
					</select>
				</div>

				{/* Filter Toggle */}
				<button
					onClick={() => setShowFilters(!showFilters)}
					className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${showFilters ? 'bg-amber-400 text-slate-900' : buttonStyles}`}>
					<FaFilter />
					<span>{showFilters ? 'Hide' : 'Show'} Filters</span>
				</button>
			</div>

			{/* Filter Panel */}
			{showFilters && (
				<article className='mt-4 p-4 rounded-lg bg-slate-900/50 border border-amber-400/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200'>
					<h3 className='text-lg font-semibold mb-2 text-amber-400'>Price Range</h3>
					<div className='flex flex-col md:flex-row flex-wrap gap-4 items-center'>
						<div className='flex items-center gap-2'>
							<label
								htmlFor='min-price'
								className='text-sm text-amber-200'>
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
								className='text-sm text-amber-200'>
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
							<button
								onClick={handleResetFilters}
								className='px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors'>
								Reset
							</button>
							<button
								onClick={handleApplyFilters}
								className='px-6 py-2 rounded-lg text-sm font-bold bg-amber-400 text-slate-900 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all duration-200'>
								Apply Filters
							</button>
						</div>
					</div>
				</article>
			)}
		</div>
	);
};

export default FilterSortBar;
