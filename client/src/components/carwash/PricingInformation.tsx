import Icon from '@/components/ui/Icon';
import { FaDollarSign } from 'react-icons/fa';
import Section from '../ui/layout/Section';

interface PricingRowProps {
	name: string;
	price: string;
}

const PricingRow: React.FC<PricingRowProps> = ({ name, price }) => (
	<div className='flex justify-between items-center py-4 border-b border-white'>
		<p className='text-lg font-bold '>{name}</p>
		<span className='text-xl font-semibold '>{price}</span>
	</div>
);

const PricingInformation: React.FC = () => {
	return (
		<Section
			tittle='Transparent Pricing'
			Icon={FaDollarSign}
			heading='We are committed to providing premium services at unbeatable prices. Our efficient process allows us to offer significant savings without compromising on quality.'>
			<article className='max-w-2xl mx-auto'>
				<PricingRow
					name='Small Car'
					price='R60.00'
				/>
				<PricingRow
					name='SUV'
					price='R70.00'
				/>
				<PricingRow
					name='Taxi'
					price='R80.00'
				/>

				<h3>Premium Add-Ons</h3>
				<PricingRow
					name='Tire Shine'
					price='R10.00'
				/>
				<PricingRow
					name='Interior Fragrance'
					price='R30.00'
				/>
			</article>
		</Section>
	);
};

export default PricingInformation;
