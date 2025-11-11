import Icon from '@/components/ui/Icon';
import { FaStar, FaCheckCircle, FaGift } from 'react-icons/fa';
import Section from '../ui/layout/Section';

const LoyaltyStep = ({ children }: { children: React.ReactNode }) => (
	<li className='flex items-start'>
		<FaCheckCircle className='text-red-500 mt-1 mr-3 flex-shrink-0' />
		<span className='text-white'>{children}</span>
	</li>
);

const CarWashLoyaltyProgram: React.FC = () => {
	return (
		<Section
			tittle='Loyalty Program'
			Icon={FaGift}
			heading="Join our digital loyalty program and get rewarded! With our digital card, your 6th car wash is on us. It's our way of saying thank you for being a loyal customer.">
			<article>
				<p className='mt-4'>
					Ask a staff member to sign up today and start earning your free wash!
				</p>
			</article>
			<article>
				<h3>How It Works:</h3>
				<ul className='space-y-3 text-start'>
					<LoyaltyStep>Sign up for free with one of our staff members.</LoyaltyStep>
					<LoyaltyStep>Receive a digital stamp for every car wash purchased.</LoyaltyStep>
					<LoyaltyStep>Collect 10 stamps to redeem your free car wash.</LoyaltyStep>
					<LoyaltyStep>Enjoy exclusive member-only offers and discounts.</LoyaltyStep>
				</ul>
			</article>
		</Section>
	);
};

export default CarWashLoyaltyProgram;
