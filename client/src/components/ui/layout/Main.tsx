interface MainProps {
	Icon?: React.ElementType;
	className?: string;
	heading?: string;
	tittle?: string;
	children: React.ReactNode;
}
export default function Main({ children, Icon, heading, tittle, className = '' }: MainProps) {
	return (
		<main className={`${className} py-12 px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-wrap gap-4 `}>
			<header>
				<span className='flex items-center justify-center gap-3'>
					{Icon && <Icon className='text-3xl text-yellow-500' />}
					{tittle && <h1>{tittle}</h1>}
				</span>
				<p className='text-white/70 text-center mt-2 flex-grow'>{heading}</p>
			</header>
			{children}
		</main>
	);
}
