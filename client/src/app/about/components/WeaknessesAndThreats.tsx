import Section from '@/components/ui/layout/Section';
import React from 'react';

const WeaknessesAndThreats: React.FC = () => {
	const weaknesses = ['Reliance on local foot traffic patterns', 'Developing brand awareness in new markets', 'Capital allocation constraints'];
	const threats = ['Aggressive competitor price matching', 'Economic downturns affecting luxury spend', 'Global supply chain disruptions'];

	return (
		<Section tittle='Weaknesses & Threats'>
			<div className='flex flex-col gap-6 h-full'>
				<article className="flex-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-orange-500/30 transition-all duration-500 group">
					<div className="flex items-center gap-4 mb-6">
						<div className="w-2 h-2 rounded-full bg-orange-500"></div>
						<h3 className="text-xl font-bold text-white font-small-caps tracking-wide">Weaknesses</h3>
					</div>
					<ul className='space-y-4'>
						{weaknesses.map((item, index) => (
							<li key={index} className="flex items-start gap-3 text-white/50 group-hover:text-white/70 transition-colors">
								<span className="w-1.5 h-1.5 rounded-full bg-white/10 mt-2"></span>
								{item}
							</li>
						))}
					</ul>
				</article>
				<article className="flex-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-red-500/30 transition-all duration-500 group">
					<div className="flex items-center gap-4 mb-6">
						<div className="w-2 h-2 rounded-full bg-red-500"></div>
						<h3 className="text-xl font-bold text-white font-small-caps tracking-wide">Threats</h3>
					</div>
					<ul className='space-y-4'>
						{threats.map((item, index) => (
							<li key={index} className="flex items-start gap-3 text-white/50 group-hover:text-white/70 transition-colors">
								<span className="w-1.5 h-1.5 rounded-full bg-white/10 mt-2"></span>
								{item}
							</li>
						))}
					</ul>
				</article>
			</div>
		</Section>
	);
};

export default WeaknessesAndThreats;
