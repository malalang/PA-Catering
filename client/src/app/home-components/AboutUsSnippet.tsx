import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import AppLink from '@/components/ui/Link';
import { IoInformationCircleOutline } from 'react-icons/io5';

const AboutUsSnippet: React.FC = () => {
	return (
		<Section
			Icon={IoInformationCircleOutline}
			tittle='Our Story of Taste & Tech'
			className="text-center"
			heading=''>
			<div className="flex flex-col items-center space-y-8">
				<p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed font-light">
					PA Luxe Creation is redefining the Evander lifestyle by merging
					<span className="text-amber-400 font-medium"> gourmet culinary artistry </span>
					with
					<span className="text-amber-400 font-medium"> cutting-edge entertainment technology</span>.
				</p>

				<div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
					<div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
						<h4 className="text-amber-400 mb-2 font-small-caps tracking-wider">The Restaurant</h4>
						<p className="text-sm text-white/70">Offering affordable, high-quality meals crafted with passion and fresh ingredients.</p>
					</div>
					<div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
						<h4 className="text-amber-400 mb-2 font-small-caps tracking-wider">The 360° Experience</h4>
						<p className="text-sm text-white/70">Competitively priced luxury photo booth rentals to capture your most memorable moments.</p>
					</div>
				</div>

				<div className='mt-8'>
					<AppLink
						variant='primary'
						href='/about'
						className="px-8 py-3 text-sm tracking-widest uppercase border border-amber-500/50 hover:bg-amber-500/10">
						Read Our Full Story
					</AppLink>
				</div>
			</div>
		</Section>
	);
};

export default AboutUsSnippet;
