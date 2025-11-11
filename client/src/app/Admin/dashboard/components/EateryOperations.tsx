import { FaUtensils, FaChartBar, FaBoxes, FaClipboardList } from 'react-icons/fa';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const DataRow = ({ label, value }: { label: string; value: string }) => (
	<div className='flex justify-between items-center py-2 border-b border-white/10'>
		<p className='text-white'>{label}</p>
		<p className='font-semibold text-white'>{value}</p>
	</div>
);

const EateryOperations: React.FC = () => {
	return (
		<Section
			tittle='Eatery Operations'
			Icon={FaUtensils}>
			
			<div className='mt-6 space-y-6'>
				{/* Sales Data */}
				<article >
					<Icon
						icon={FaChartBar}
						heading='Sales Data'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Top-Selling Items'
							value='N/A'
						/>
						<DataRow
							label='Sales by Category'
							value='N/A'
						/>
						<DataRow
							label='Average Order Value'
							value='N/A'
						/>
					</div>
				</article>

				{/* Inventory Management */}
				<article >
					<Icon
						icon={FaBoxes}
						heading='Inventory Management'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Stock Levels'
							value='N/A'
						/>
						<DataRow
							label='Low-Stock Alerts'
							value='N/A'
						/>
						<DataRow
							label='Waste Tracking'
							value='N/A'
						/>
					</div>
				</article>

				{/* Order Management */}
				<article >
					<Icon
						icon={FaClipboardList}
						heading='Order Management'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Orders in Progress'
							value='N/A'
						/>
						<DataRow
							label='Avg. Prep Time'
							value='N/A'
						/>
						<DataRow
							label='Fulfillment Status'
							value='N/A'
						/>
					</div>
				</article>
			</div>
		</Section>
	);
};

export default EateryOperations;
