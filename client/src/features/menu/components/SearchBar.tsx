'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Products from '@/context/Products';
import { useCart } from '@/context/CartContext';

const highlightMatch = (text: string, match: string) => {
	if (!match) return text;
	const idx = text.toLowerCase().indexOf(match.toLowerCase());
	if (idx === -1) return text;
	return (
		<>
			{text.slice(0, idx)}
			<span className='bg-red-700 text-white font-bold'>{text.slice(idx, idx + match.length)}</span>
			{text.slice(idx + match.length)}
		</>
	);
};

const SearchBar: React.FC = () => {
	const { search, setSearch } = useCart();
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [activeIdx, setActiveIdx] = useState(-1);
	const suggestionsRef = useRef<HTMLUListElement>(null);

	const searchTerm = search.trim().toLowerCase();
	const categorySuggestions = Products.filter((group) =>
		group.Name.toLowerCase().includes(searchTerm)
	).map((group) => ({ type: 'category', name: group.Name }));
	const productSuggestions = Products.flatMap((group) =>
		group.Products.filter((product) => product.Name.toLowerCase().includes(searchTerm)).map(
			(product) => ({ type: 'product', name: product.Name, category: group.Name })
		)
	);
	const suggestions = searchTerm ? [...categorySuggestions, ...productSuggestions].slice(0, 8) : [];

	// Keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showSuggestions || suggestions.length === 0) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActiveIdx((prev) => (prev + 1) % suggestions.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveIdx((prev) => (prev - 1 + suggestions.length) % suggestions.length);
		} else if (e.key === 'Enter' && activeIdx >= 0) {
			setSearch(suggestions[activeIdx].name);
			setShowSuggestions(false);
		}
	};

	// Scroll active suggestion into view
	useEffect(() => {
		if (activeIdx >= 0 && suggestionsRef.current) {
			const el = suggestionsRef.current.children[activeIdx] as HTMLElement;
			if (el) el.scrollIntoView({ block: 'nearest' });
		}
	}, [activeIdx]);

	return (
		<article className='sticky bg-black/50 blur-[0.1px] backdrop-blur-md top-9 m-0 shadow-none p-4 rounded-none z-20'>
			<div className='relative w-full'>
				<TextInput
					id='menu-search'
					className='bg-red-700/20'
					type='text'
					placeholder='Search for food or categories...'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setShowSuggestions(true);
						setActiveIdx(-1);
					}}
					onFocus={() => {
						setShowSuggestions(true);
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Increased delay
					onKeyDown={handleKeyDown}
					aria-label='Search for food or categories'
					autoComplete='off'
					icon={
						<FaSearch
							className='text-white/70'
							aria-hidden='true'
						/>
					}
				/>
				{showSuggestions && suggestions.length > 0 && (
					<div className='absolute top-full mt-2 w-full bg-black border border-white/20 rounded-md shadow-lg z-10'>
						<ul
							ref={suggestionsRef}
							className='max-h-60 overflow-auto p-2'
							role='listbox'>
							{suggestions.map((s, idx) => (
								<li
									key={s.type + '-' + s.name + '-' + idx}
									role='option'
									aria-selected={activeIdx === idx}>
									<Button
										variant='icon'
										onClick={() => {
											setSearch(s.name);
											setShowSuggestions(false);
										}}
										onMouseEnter={() => setActiveIdx(idx)}
										className={`w-full flex items-center justify-start text-left p-2 rounded-md ${
											activeIdx === idx ? 'bg-red-700' : ''
										}`}
										aria-label={
											s.type === 'category' ? `Category: ${s.name}` : `Product: ${s.name}`
										}>
										<span className={`text-white ${s.type === 'category' ? 'font-bold' : ''}`}>
											{highlightMatch(s.name, searchTerm)}
										</span>
										{'category' in s && (
											<span className='ml-auto text-xs text-white/70'>
												in {s.category as string}
											</span>
										)}
									</Button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</article>
	);
};

export default SearchBar;
