import React from 'react';
import { FaRegSadTear } from 'react-icons/fa';

const NoResults: React.FC = () => (
	<div className='col-span-full flex flex-col items-center justify-center text-center text-white py-20 px-4'>
		<div className='relative group'>
			<div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse group-hover:bg-amber-500/30 transition-colors" />
			<div className="relative bg-black/60 backdrop-blur-xl border border-amber-500/30 p-8 rounded-full shadow-2xl">
				<FaRegSadTear className='text-6xl text-amber-500' />
			</div>
		</div>

		<h3 className='text-3xl font-bold mt-8 mb-4 tracking-tight font-small-caps'>No Matches Found</h3>
		<p className='text-white/60 text-lg max-w-md mx-auto leading-relaxed'>
			We couldn&apos;t find any delicacies matching your search.
			<span className="block mt-2 text-amber-400">Try adjusting your keywords or browse our full menu below.</span>
		</p>
	</div>
);

export default NoResults;
