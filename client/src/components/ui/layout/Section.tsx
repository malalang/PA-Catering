import { Suspense } from 'react';
import Loading from '../Loading';

interface SectionProps extends React.HTMLProps<HTMLElement> {
	Icon?: React.ElementType;
	heading?: string;
	tittle?: string;
	className?: string;
	children: React.ReactNode;
}
export default function Section({
	children,
	Icon,
	heading,
	tittle,
	className,
	...props
}: SectionProps) {
	return (
		<section
			{...props}
			className={
				className ? className : ' bg-black/30 border border-red-500/20 rounded-md p-2 my-4'
			}>
			<header>
				{Icon ? (
					<div className='flex flex-col items-center text-center'>
						<span className='flex items-center justify-center w-12 h-12 bg-red-500 mx-auto text-white rounded-full shadow-sm shadow-black/50 '>
							<Icon className='text-3xl' />
						</span>
						{tittle && <h3 className='mt-4 text-shadow-sm text-shadow-black/50'>{tittle}</h3>}
					</div>
				) : (
					tittle && <h2 className='text-shadow-sm text-shadow-black/50'>{tittle}</h2>
				)}
				<p className='text-white/70 text-center mt-2 flex-grow'>{heading}</p>
			</header>
			{children}
		</section>
	);
}
