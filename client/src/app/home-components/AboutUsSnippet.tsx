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

				<div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mt-12">
					<div className="group bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 relative overflow-hidden">
						<div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
							<IoInformationCircleOutline className="text-8xl text-white" />
						</div>
						<h4 className="text-xl font-bold text-white mb-3 font-small-caps tracking-wide group-hover:text-amber-500 transition-colors">Culinary Artistry</h4>
						<p className="text-white/70 font-light leading-relaxed">
							Experience affordable gourmet dining where every dish is crafted with passion, creating a symphony of flavors for the discerning palate.
						</p>
					</div>
					<div className="group bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500 relative overflow-hidden">
						<div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
							<IoInformationCircleOutline className="text-8xl text-white" />
						</div>
						<h4 className="text-xl font-bold text-white mb-3 font-small-caps tracking-wide group-hover:text-amber-500 transition-colors">The 360° Experience</h4>
						<p className="text-white/70 font-light leading-relaxed">
							Step into the spotlight with our luxury 360° photo booth. Capture immersive memories with cinematic flair at competitive rates.
						</p>
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
