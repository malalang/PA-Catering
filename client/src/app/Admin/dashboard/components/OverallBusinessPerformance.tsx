import {
	FaChartLine,
	FaBullseye,
	FaChartPie,
	FaDollarSign,
	FaUsers,
	FaShoppingCart,
	FaPercentage,
} from 'react-icons/fa';
import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';

const OverallBusinessPerformance: React.FC = () => {
	const kpis = [
		{ icon: FaDollarSign, label: 'Total Revenue', value: 'N/A' },
		{ icon: FaUsers, label: 'Customer Traffic', value: 'N/A' },
		{ icon: FaShoppingCart, label: 'Average Spend', value: 'N/A' },
		{ icon: FaPercentage, label: 'Profit Margin', value: 'N/A' },
		{ icon: FaShoppingCart, label: 'Order Volume', value: 'N/A' },
		{ icon: FaUsers, label: 'Retention Rate', value: 'N/A' },
	];

	return (
		<Section
			Icon={FaChartLine}
			tittle='Overall Business Performance'>
			<div className='mt-6 bg-black/20 p-4 rounded-md border border-white/10'>
				<Icon
					icon={FaBullseye}
					heading='Key Performance Indicators'
					variant='inline'
				/>
				<div className='grid grid-cols-2 md:grid-cols-2 gap-4 mt-4'>
					{kpis.map((kpi, index) => (
						<div
							key={index}
							className='bg-black/30 p-3 rounded-md text-center border border-white/10'>
							<kpi.icon className='text-red-500 text-3xl mx-auto mb-2' />
							<p className='text-sm text-white/70 font-medium'>{kpi.label}</p>
							<p className='text-lg font-bold text-white'>{kpi.value}</p>
						</div>
					))}
				</div>
			</div>

			<div className='mt-6 bg-black/20 p-4 rounded-md border border-white/10'>
				<Icon
					icon={FaChartPie}
					heading='Visualizations'
					variant='inline'
				/>
				<div className='mt-4 space-y-2 text-white/70 italic'>
					<p>Line graph for Revenue Trends: Data not available</p>
					<p>Pie chart for Revenue Breakdown: Data not available</p>
					<p>Bar graph for Performance Comparison: Data not available</p>
				</div>
			</div>
		</Section>
	);
};

export default OverallBusinessPerformance;
