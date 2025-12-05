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
			<header className="flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto text-center">
				<span className='flex flex-col items-center gap-4'>
					{Icon && <Icon className='text-4xl md:text-5xl text-yellow-500/90 drop-shadow-lg' />}
					{tittle && <h1 className="tracking-tight">{tittle}</h1>}
				</span>
				<p className='text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl font-light'>{heading}</p>
			</header>
			{children}
		</main>
	);
}
