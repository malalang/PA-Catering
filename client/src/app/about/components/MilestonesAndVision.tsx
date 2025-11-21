import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import { IoFlag, IoRocketOutline } from 'react-icons/io5';

const MilestonesAndVision: React.FC = () => {
	return (
		<Section
			heading='Our journey began with a vision to transform convenience in Evander. Here are some key
				moments and our aspirations for the future.'
			tittle='Milestones & Future Vision'>
			<article className='mt-6'>
				<Icon
					icon={IoFlag}
					variant='inlineCircular'
					className='text-3xl text-yellow-500'
					heading='Key Milestones'
				/>

				<ul className='list-disc list-inside '>
					<li>
						<strong>2024:</strong> PA Luxe Creation PTY Ltd was established, bringing together
						affordable, high-quality meals.
					</li>
					<li>
						<strong>2025:</strong> PA Luxe Creation PTY Ltd has established a new building in Evander
						which included luxury Photo boot.
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
					Our vision is to become Evander&apos;s premier destination for these combined services,
					driven by innovation, quality, and community trust. We aim to continuously innovate,
					expand our offerings, and deepen our connection with the community we serve.
				</p>
			</article>
		</Section>
	);
};

export default MilestonesAndVision;
