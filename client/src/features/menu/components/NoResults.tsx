import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';

const NoResults: React.FC = () => (
	<div className='col-span-full flex flex-col items-center justify-center text-center text-white p-8'>
		<div className='bg-black/50 border border-white/50 rounded-md p-8 max-w-md w-full'>
			<FaRegSadTear className='text-6xl mb-4 text-red-500 mx-auto' />
			<h3 className='text-2xl font-bold'>No Results Found</h3>
			<p className='text-white mt-2'>
				We couldn&apos;t find any matches for your search. Please try different keywords or browse
				our menu categories.
			</p>
		</div>
	</div>
);

export default NoResults;
