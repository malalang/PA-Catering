import Section from '@/components/ui/layout/Section';
import { IoSparklesOutline, IoCheckmarkCircle } from 'react-icons/io5';

const KeyHighlights: React.FC = () => {
	const highlights = [
		{
			id: 1,
			text: 'Dual-Service Convenience: Enjoy a tasty meal while your car is being taken care of.',
		},
		{ id: 2, text: "Affordability: Quality food and car wash services that won't break the bank." },
		{
			id: 3,
			text: "Community-Centric: We're dedicated to serving and supporting the Lulekani community.",
		},
	];

	return (
		<Section
			Icon={IoSparklesOutline}
			tittle='The Central Eatery Difference'>
			<div className=' grid md:grid-cols-2 gap-8'>
				{highlights.map((highlight) => (
					<div
						key={highlight.id}
						className='flex flex-col items-center'>
						<IoCheckmarkCircle className='text-4xl text-red-500 mb-3' />
						<p>{highlight.text}</p>
					</div>
				))}
			</div>
		</Section>
	);
};

export default KeyHighlights;
