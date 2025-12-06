import Section from '@/components/ui/layout/Section';
import { IoEye } from 'react-icons/io5';

const OurVision: React.FC = () => {
	return (
		<Section
			Icon={IoEye}
			tittle='Our Vision'
			className="flex flex-col items-center justify-center text-center">
			<article className="max-w-3xl mx-auto relative">
				<div className="absolute -top-12 -left-12 text-9xl text-amber-500/10 font-serif leading-none">&ldquo;</div>
				<p className='text-3xl md:text-4xl font-light leading-snug text-white'>
					To become Evander&apos;s <span className="text-amber-500 font-normal">premier destination</span> for
					affordable luxury, driven by innovation, quality, and community trust.
				</p>
				<div className="absolute -bottom-12 -right-12 text-9xl text-amber-500/10 font-serif leading-none rotate-180">&ldquo;</div>
			</article>
		</Section>
	);
};

export default OurVision;
