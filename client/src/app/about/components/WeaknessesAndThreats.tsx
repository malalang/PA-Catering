import Section from '@/components/ui/layout/Section';
import React from 'react';

const WeaknessesAndThreats: React.FC = () => {
	const weaknesses = ['Reliant on local foot traffic.', 'New brand awareness.', 'Limited funding.'];

	const threats = ['Competitor price matching', 'economic downturns', 'supply chain disruptions'];

	return (
		<Section tittle='Weaknesses and Threats'>
			<div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-2   '>
				<article>
					<h3>Weaknesses</h3>
					<ul className='list-disc list-inside '>
						{weaknesses.map((weakness, index) => (
							<li key={index}>{weakness}</li>
						))}
					</ul>
				</article>
				<article>
					<h3>Threats</h3>
					<ul className='list-disc list-inside '>
						{threats.map((threat, index) => (
							<li key={index}>{threat}</li>
						))}
					</ul>
				</article>
			</div>
		</Section>
	);
};

export default WeaknessesAndThreats;
