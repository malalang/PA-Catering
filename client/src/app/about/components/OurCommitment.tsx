import Section from '@/components/ui/layout/Section';
import Image from 'next/image';
import { IoShieldCheckmark } from 'react-icons/io5';

const OurCommitment: React.FC = () => {
	return (
		<Section
			Icon={IoShieldCheckmark}
			tittle='Our Commitment'>

			<div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
				<div className="w-full md:w-1/3 flex justify-center">
					<div className="relative w-48 h-48 md:w-full md:h-64 opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500">
						<Image
							alt='PA Logo'
							fill
							src='/PA_Logo.png'
							className="object-contain"
						/>
					</div>
				</div>
				<div className="w-full md:w-2/3 space-y-6">
					<h3 className="text-2xl font-bold text-white font-small-caps tracking-wide">Excellence in Every Detail</h3>
					<p className='text-white/80 leading-relaxed font-light text-lg'>
						At PA Luxe Creation, we are committed to providing a premium experience in both our food service and event offerings.
						We strive to be your convenient destination, delivering quality meals and luxurious interactions.
						Our goal is to build community trust through innovation and exceptional service in Evander.
					</p>
				</div>
			</div>
		</Section>
	);
};

export default OurCommitment;
