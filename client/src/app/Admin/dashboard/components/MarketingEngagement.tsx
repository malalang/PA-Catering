import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import { FaBullhorn, FaGlobe, FaShareAlt, FaStar } from 'react-icons/fa';

const MarketingEngagement: React.FC = () => {
	return (
<Section Icon={FaBullhorn}
				tittle='Marketing & Engagement'>		

			<div className='mt-6 space-y-6'>
				{/* Website Traffic */}
				<article >
					<Icon
						icon={FaGlobe}
						heading='Website Traffic'
						variant='inline'
					/>
					<p className='text-white/70 italic mt-2'>Data not available</p>
				</article>

				{/* Social Media Engagement */}
				<article >
					<Icon
						icon={FaShareAlt}
						heading='Social Media Engagement'
						variant='inline'
					/>
					<p className='text-white/70 italic mt-2'>Data not available</p>
				</article>

				{/* Customer Feedback & Reviews */}
				<article >
					<Icon
						icon={FaStar}
						heading='Customer Feedback & Reviews'
						variant='inline'
					/>
					<p className='text-white/70 italic mt-2'>Data not available</p>
				</article>
			</div>
		</Section>
	);
};

export default MarketingEngagement;
