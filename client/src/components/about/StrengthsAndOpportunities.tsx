import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import React from 'react';
import { GiMuscleUp, GiOppositeHearts } from 'react-icons/gi';

const StrengthsAndOpportunities: React.FC = () => {
	const strengths = [
		'20–30% cheaper car washes',
		'multidisciplinary leadership',
		'dual-service convenience.',
	];

	const opportunities = ['Taxi fleet bulk discounts,', 'loyalty program integration.'];

	return (
		<Section tittle='Strengths and Opportunities'>
			<div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-2   '>
				<article>
					<Icon
						icon={GiMuscleUp}
						heading='Strengths'
					/>
					<ul className='list-disc list-inside '>
						{strengths.map((strength, index) => (
							<li key={index}>{strength}</li>
						))}
					</ul>
				</article>

				<article>
					<Icon
						icon={GiOppositeHearts}
						heading='Opportunities'
					/>
					<ul className='list-disc list-inside '>
						{opportunities.map((opportunity, index) => (
							<li key={index}>{opportunity}</li>
						))}
					</ul>
				</article>
			</div>
		</Section>
	);
};

export default StrengthsAndOpportunities;
