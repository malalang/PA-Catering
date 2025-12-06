// components/KeyHighlights.tsx
import React from 'react';
import { IoBusiness, IoPricetag, IoCalendar } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const KeyHighlights = () => {
	return (
		<Section tittle='Why Choose Us' Icon={IoBusiness}>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				{/* Highlight 1: Unique Combination of Services */}
				<article className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
							<IoBusiness className="text-2xl" />
						</div>
						<h3 className="text-lg font-bold text-white font-small-caps tracking-wide">Dual-Service Excellence</h3>
					</div>
					<p className='text-white/60 leading-relaxed font-light'>
						PA Luxe Creation is a unique destination combining a <span className="text-white font-medium">premium eatery</span> with a <span className="text-white font-medium">360° Photo Booth</span> experience.
					</p>
				</article>

				{/* Highlight 2: Competitive Photo boot Pricing */}
				<article className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
							<IoPricetag className="text-2xl" />
						</div>
						<h3 className="text-lg font-bold text-white font-small-caps tracking-wide">Competitive Value</h3>
					</div>
					<p className='text-white/60 leading-relaxed font-light'>
						We offer accessible luxury with competitive pricing for our Photo Booth packages, ensuring premium memories are within reach.
					</p>
				</article>

				{/* Highlight 3: Advanced Booking and Modern POS */}
				<article className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 transition-all duration-500">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
							<IoCalendar className="text-2xl" />
						</div>
						<h3 className="text-lg font-bold text-white font-small-caps tracking-wide">Seamless Experience</h3>
					</div>
					<p className='text-white/60 leading-relaxed font-light'>
						Powered by advanced booking systems and modern POS integration, ensuring a smooth, hassle-free journey from reservation to memory.
					</p>
				</article>
			</div>
		</Section>
	);
};

export default KeyHighlights;
