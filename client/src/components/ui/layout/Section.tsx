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
			className={`${className} relative overflow-hidden bg-gradient-to-br from-yellow-950/30 to-black/40 backdrop-blur-3xl border border-white/5 rounded-2xl p-8 md:p-12 transition-all duration-700 w-full group
            before:absolute before:inset-0 before:bg-gradient-to-br before:from-amber-500/5 before:to-transparent before:opacity-0 before:animate-[pulse_8s_ease-in-out_infinite]
            ring-1 ring-inset ring-amber-500/10 hover:ring-amber-500/30 hover:shadow-2xl hover:shadow-amber-900/10`}>
			<header className="mb-10 md:mb-14">
				{Icon ? (
					<div className='flex flex-col items-center text-center space-y-4'>
						<span className='bg-gradient-to-br from-amber-500/10 to-yellow-500/5 p-4 rounded-xl border border-amber-500/20 shadow-inner shadow-amber-500/5'>
							<Icon className='text-amber-400 text-3xl md:text-4xl' />
						</span>
						{tittle && <h3 className='mt-2 text-2xl md:text-3xl tracking-tight text-white/95'>{tittle}</h3>}
					</div>
				) : (
					tittle && <h2 className='text-3xl md:text-4xl tracking-tight mb-4'>{tittle}</h2>
				)}
				{heading && <p className='text-white/60 text-center text-base md:text-lg max-w-xl mx-auto leading-relaxed mt-4 font-light'>{heading}</p>}
			</header>
			{children}
		</section>
	);
}
