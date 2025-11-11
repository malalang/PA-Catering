import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import { IoFlag, IoRocketOutline } from 'react-icons/io5';

const MilestonesAndVision: React.FC = () => {
	return (
		<Section
			heading='Our journey began with a vision to transform convenience in Lulekani. Here are some key
				moments and our aspirations for the future.'
			tittle='Milestones & Future Vision'>
			<article className='mt-6'>
				<Icon
					icon={IoFlag}
					variant='inlineCircular'
					className='text-3xl text-red-500'
					heading='Key Milestones'
				/>

				<ul className='list-disc list-inside '>
					<li>
						<strong>2024:</strong> Central Eatery PTY Ltd was established, bringing together
						affordable, high-quality meals.
					</li>
					<li>
						<strong>2025:</strong> Central Eatery PTY Ltd has established a new building in Lulekani
						which included luxury car washes.
					</li>

					{/* Add future milestones here */}
				</ul>
			</article>

			<article className='mt-6'>
				<Icon
					icon={IoRocketOutline}
					variant='inlineCircular'
					heading='Our Future Vision'
				/>
				<p className='text-center'>
					Our vision is to become Lulekani&apos;s premier destination for these combined services,
					driven by innovation, quality, and community trust. We aim to continuously innovate,
					expand our offerings, and deepen our connection with the community we serve.
				</p>
			</article>
		</Section>
	);
};

export default MilestonesAndVision;
