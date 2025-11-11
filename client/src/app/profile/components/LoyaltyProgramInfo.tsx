'use client';
import Icon from '@/components/ui/Icon';
import { FaGift } from 'react-icons/fa';
import ReferralCodeCopier from './ReferralCodeCopier';
import FreeWash from '@/components/carwash/FreeWash';
import { useUser } from '@/context/UserContext';
import Section from '@/components/ui/layout/Section';

interface LoyaltyProgramInfoProps {
	loyaltyPoints: number;
	carWashCount: number;
}

const LoyaltyProgramInfo: React.FC = () => {
	const { user } = useUser();
	if (!user) {
		return null;
	}

	return (
		<Section
			Icon={FaGift}
			heading='Loyalty Program'>
			<FreeWash carWashCount={user.carWashCount} />
			<article className='mt-8'>
				<h3 className='text-lg font-semibold text-white mb-4'>Refer a Friend & Earn More!</h3>
				<p className='text-white mb-4'>
					Share your referral code with friends. When they sign up, you both get bonus points!
				</p>
				<ReferralCodeCopier code={user.uid.slice(0, 8)} />
			</article>
		</Section>
	);
};

export default LoyaltyProgramInfo;
