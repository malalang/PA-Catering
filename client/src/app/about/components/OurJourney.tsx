import Section from '@/components/ui/layout/Section';
import Image from 'next/image';

const OurJourney: React.FC = () => {
	return (
		<Section tittle='The Genesis' className='relative overflow-hidden'>
			<div className="flex flex-col md:flex-row items-start gap-12">
				<div className="w-full md:w-1/3 relative group">
					<div className="absolute inset-0 bg-amber-500/20 blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
					<div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
						<Image
							src='/PA_Logo.png'
							alt='PA Luxe Creation Logo'
							fill
							className='object-contain bg-black p-8'
						/>
					</div>
				</div>
				<div className="media-body w-full md:w-2/3">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-small-caps tracking-wide">
						From Vision to <span className="text-amber-500">Reality</span>
					</h2>
					<p className='text-lg md:text-xl text-white/80 leading-relaxed font-light'>
						<span className="text-6xl float-left mr-4 mt-[-1rem] text-amber-500 font-serif">P</span>
						A Luxe Creation PTY Ltd was established in 2024 by Precious Nyathi, driven by a desire to elevate the standard of service in Evander.
						Identifying a gap for modern, high-quality convenience, the concept of a dual-service establishment emerged—combining exquisite culinary experiences with premium care.
					</p>
					<p className='text-lg md:text-xl text-white/80 leading-relaxed font-light mt-6'>
						Our journey is fueled by a relentless commitment to excellence, community value, and the belief that everyday services should feel extraordinary.
					</p>
				</div>
			</div>
		</Section>
	);
};

export default OurJourney;
