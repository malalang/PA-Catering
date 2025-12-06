import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import React from 'react';
import { GiMuscleUp, GiOppositeHearts } from 'react-icons/gi';

const StrengthsAndOpportunities: React.FC = () => {
	const strengths = [
		'20–30% More Competitive Pricing',
		'Multidisciplinary Leadership',
		'Dual-Service Venue Convenience',
	];

	const opportunities = ['Taxi Fleet Bulk Partnerships', 'Loyalty Program Integration', 'Corporate Event Expansion'];

	return (
		<Section tittle='Strengths & Opportunities'>
			<div className='flex flex-col gap-6 h-full'>
				<article className="flex-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-emerald-500/30 transition-all duration-500 group">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
							<GiMuscleUp className="text-2xl" />
						</div>
						<h3 className="text-xl font-bold text-white font-small-caps tracking-wide">Strengths</h3>
					</div>
					<ul className='space-y-4'>
						{strengths.map((str, index) => (
							<li key={index} className="flex items-start gap-3 text-white/70">
								<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></span>
								{str}
							</li>
						))}
					</ul>
				</article>

				<article className="flex-1 p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-blue-500/30 transition-all duration-500 group">
					<div className="flex items-center gap-4 mb-6">
						<div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
							<GiOppositeHearts className="text-2xl" />
						</div>
						<h3 className="text-xl font-bold text-white font-small-caps tracking-wide">Opportunities</h3>
					</div>
					<ul className='space-y-4'>
						{opportunities.map((opp, index) => (
							<li key={index} className="flex items-start gap-3 text-white/70">
								<span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
								{opp}
							</li>
						))}
					</ul>
				</article>
			</div>
		</Section>
	);
};

export default StrengthsAndOpportunities;
