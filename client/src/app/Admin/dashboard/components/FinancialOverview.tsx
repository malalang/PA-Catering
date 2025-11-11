import Icon from '@/components/ui/Icon';
import Section from '@/components/ui/layout/Section';
import {
	FaFileInvoiceDollar,
	FaDollarSign,
	FaReceipt,
	FaPiggyBank,
	FaExchangeAlt,
} from 'react-icons/fa';

const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
	<div className='flex justify-between items-center py-2 border-b border-white/10 last:border-b-0'>
		<p className='text-white'>{label}</p>
		<p className='font-semibold text-white'>{value}</p>
	</div>
);

const FinancialOverview: React.FC = () => {
	return (
<Section Icon={FaFileInvoiceDollar} tittle='Financial Overview' >		

			<div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Revenue */}
				<article >
					<Icon
						icon={FaDollarSign}
						heading='Revenue'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Total Revenue'
							value='N/A'
						/>
						<DataRow
							label='Revenue by Source'
							value='N/A'
						/>
					</div>
				</article>

				{/* Expenses */}
				<article >
					<Icon
						icon={FaReceipt}
						heading='Expenses'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='COGS'
							value='N/A'
						/>
						<DataRow
							label='Labor Costs'
							value='N/A'
						/>
						<DataRow
							label='Operating Expenses'
							value='N/A'
						/>
					</div>
				</article>

				{/* Profitability */}
				<article >
					<Icon
						icon={FaPiggyBank}
						heading='Profitability'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Gross Profit'
							value='N/A'
						/>
						<DataRow
							label='Net Profit'
							value='N/A'
						/>
					</div>
				</article>

				{/* Cash Flow */}
				<article >
					<Icon
						icon={FaExchangeAlt}
						heading='Cash Flow'
						variant='inline'
					/>
					<div className='mt-4 space-y-1'>
						<DataRow
							label='Inflow'
							value='N/A'
						/>
						<DataRow
							label='Outflow'
							value='N/A'
						/>
					</div>
				</article>
			</div>
		</Section>
	);
};

export default FinancialOverview;
