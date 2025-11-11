interface MainProps {
	Icon?: React.ElementType;
	className?: string;
	heading?: string;
	tittle?: string;
	children: React.ReactNode;
}
export default function Main({ children, Icon, heading, tittle, className }: MainProps) {
	return (
		<main
			className={
				className
					? className
					: 'relative flex flex-col items-center justify-start w-full min-h-screen p-2 md:px-4 bg-white/10;'
			}>
			<header>
				<span className='flex items-center justify-center gap-3'>
					{Icon && <Icon className='text-3xl text-red-500' />}
					{tittle && <h1>{tittle}</h1>}
				</span>
				<p className='text-white/70 text-center mt-2 flex-grow'>{heading}</p>
			</header>
			{children}
		</main>
	);
}
