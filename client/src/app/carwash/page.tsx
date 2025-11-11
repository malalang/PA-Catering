import CarWashCallToAction from '@/components/carwash/CarWashCallToAction';
import CarWashFAQ from '@/components/carwash/CarWashFAQ';
import CarWashIntroduction from '@/components/carwash/CarWashIntroduction';
import CarWashLoyaltyProgram from '@/components/carwash/CarWashLoyaltyProgram';
import PricingInformation from '@/components/carwash/PricingInformation';
import ServicesOffeyellow from '@/components/carwash/ServicesOffeyellow';
import { FaCar } from 'react-icons/fa';
import Main from '@/components/ui/layout/Main';

const CarWashPage: React.FC = () => {
	return (
		<Main
			tittle='Car Wash'
			Icon={FaCar}
			heading='Experience the Luxury of Clean'>
			<CarWashCallToAction />
			<CarWashIntroduction />
			<ServicesOffeyellow />
			<PricingInformation />
			<CarWashLoyaltyProgram />
			<CarWashFAQ />
		</Main>
	);
};

export default CarWashPage;
