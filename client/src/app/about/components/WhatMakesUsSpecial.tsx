import { IoSparkles, IoCalendar, IoPeople, IoFastFood } from 'react-icons/io5';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const WhatMakesUsSpecial: React.FC = () => {
	return (
		<Section tittle='Our Distinctive Edge' Icon={IoSparkles}>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{[
					{ icon: IoSparkles, title: 'Modern Facilities', desc: "State-of-the-art facilities for both dining and photography, ensuring superior comfort and service." },
					{ icon: IoCalendar, title: 'Digital Ecosystem', desc: "Seamless digital booking for food and photos, saving time with integrated scheduling." },
					{ icon: IoPeople, title: 'Multidisciplinary Experts', desc: "Leadership spanning industrial engineering and design, optimizing every touchpoint of your experience." },
					{ icon: IoFastFood, title: 'Dual-Service Convenience', desc: "The unique convergence of high-end dining and luxury photo experiences in a single location." },
				].map((item, idx) => (
					<article key={idx} className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-amber-500/30 hover:bg-white/5 transition-all duration-500">
						<div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
							<item.icon className="text-2xl" />
						</div>
						<h3 className="text-xl font-bold text-white mb-4 font-small-caps tracking-wide">{item.title}</h3>
						<p className="text-white/60 leading-relaxed font-light">{item.desc}</p>
					</article>
				))}
			</div>
		</Section>
	);
};

export default WhatMakesUsSpecial;
