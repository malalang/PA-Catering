'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
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
		<article className='sticky bg-black/50 blur-[0.1px] backdrop-blur-md top-9 m-0 shadow-none p-4 rounded-none z-20'>
			<div className='relative w-full'>
				<TextInput
					id='menu-search'
					className='bg-yellow-700/20'
					type='text'
					placeholder='Search for food or categories...'
					value={term}
					onChange={(e) => handleSearch(e.target.value)}
					aria-label='Search for food or categories'
					autoComplete='off'
					icon={
						<FaSearch
							className='text-white/70'
							aria-hidden='true'
						/>
					}
				/>
			</div>
		</article>
	);
};

export default SearchBar;
