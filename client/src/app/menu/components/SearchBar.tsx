'use client';
import React, { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import TextInput from '@/components/ui/TextInput';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const SearchBar: React.FC = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const [term, setTerm] = useState(searchParams.get('search') || '');

	const handleSearch = (value: string) => {
		setTerm(value);
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set('search', value);
		} else {
			params.delete('search');
		}
		router.replace(`${pathname}?${params.toString()}`);
	};

	return (
		<div className='bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md p-3 rounded-b-xl border border-amber-400/10 sticky top-20 z-20 col-span-full mt-0 shadow-xl shadow-black/20'>
			<div className='max-w-7xl mx-auto relative w-full'>
				<TextInput
					id='menu-search'
					className='bg-yellow-900/60 border-amber-400/20 focus:border-amber-400 pl-12'
					type='text'
					placeholder='Search for food or categories...'
					value={term}
					onChange={(e) => handleSearch(e.target.value)}
					aria-label='Search for food or categories'
					autoComplete='off'
					icon={
						<HiSearch
							className='text-amber-400'
							size={20}
							aria-hidden='true'
						/>
					}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
