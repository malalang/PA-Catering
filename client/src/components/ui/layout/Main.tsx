interface MainProps {
	Icon?: React.ElementType;
	className?: string;
	heading?: string;
	tittle?: string;
	children: React.ReactNode;
}
export default function Main({ children, Icon, heading, tittle, className = '' }: MainProps) {
	return (
		<main className={`${className} flex flex-col gap-16 md:gap-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20`}>
			<header className="flex flex-col items-center justify-center space-y-6 w-full text-center py-8 md:py-12 mb-12">
				<span className='flex flex-col items-center gap-6'>
					{Icon && (
						<div className="p-4 rounded-full bg-white/5 border border-white/5 ring-1 ring-white/10 shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)]">
							<Icon className='text-4xl md:text-5xl text-amber-500 drop-shadow-sm' />
						</div>
					)}
					{tittle && <h1 className="tracking-widest font-small-caps text-4xl md:text-6xl text-white">{tittle}</h1>}
				</span>
				{heading && <p className='text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl font-light'>{heading}</p>}
			</header>
			{children}
		</main>
	);
}
