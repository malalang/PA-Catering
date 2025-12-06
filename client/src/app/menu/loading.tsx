export default function LoadingPage() {
	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-16 md:gap-24 animate-pulse">
			{/* Search Bar Skeleton */}
			<div className="w-full max-w-2xl mx-auto h-16 bg-white/5 rounded-full border border-white/5" />

			{/* Main Content Skeleton */}
			<div className="flex flex-col gap-16">
				{/* Section Header */}
				<div className="flex flex-col items-center space-y-6">
					<div className="w-16 h-16 rounded-full bg-white/5 border border-white/5" />
					<div className="w-48 h-12 bg-white/5 rounded-lg" />
					<div className="w-96 h-6 bg-white/5 rounded-lg" />
				</div>

				{/* Cards Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{[...Array(8)].map((_, i) => (
						<div key={i} className="aspect-[4/5] bg-neutral-900/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
							<div className="w-full aspect-square bg-white/5 rounded-xl" />
							<div className="w-3/4 h-8 bg-white/5 rounded mx-auto" />
							<div className="w-1/2 h-6 bg-white/5 rounded mx-auto" />
							<div className="mt-auto w-full h-10 bg-white/5 rounded-full" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
