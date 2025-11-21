import Section from '@/components/ui/layout/Section';
import Link from '@/components/ui/Link';
import { IoTrendingUpOutline } from 'react-icons/io5';

const FinancialSnapshotTeaser: React.FC = () => {
	return (
		<Section
			Icon={IoTrendingUpOutline}
			tittle='Building a Sustainable Future'
			heading="Since our inception, we've seen promising traction and are on a solid path toward sustainable growth. Our commitment to quality and convenience continues to drive our success.">
			<div className='mt-6'>
				<Link
					variant='button'
					href='/about#financials'>
					View Our Financial Snapshot...
				</Link>
			</div>
		</Section>
	);
};

export default FinancialSnapshotTeaser;
