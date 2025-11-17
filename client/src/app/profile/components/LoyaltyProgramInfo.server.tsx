import Icon from '@/components/ui/Icon';
import { FaGift } from 'react-icons/fa';
import ReferralCodeCopier from './ReferralCodeCopier';
import Section from '@/components/ui/layout/Section';

// Server component that will receive user data from client wrapper
interface LoyaltyProgramInfoServerProps {
	userUid?: string;
}

const LoyaltyProgramInfoServer: React.FC<LoyaltyProgramInfoServerProps> = ({ userUid }) => {
	if (!userUid) {
		return null;
	}

	return (
		<Section
			Icon={FaGift}
			heading='Loyalty Program'>
			<article className='mt-8'>
				<h3 className='text-lg font-semibold text-white mb-4'>Refer a Friend & Earn More!</h3>
				<p className='text-white mb-4'>
					Share your referral code with friends. When they sign up, you both get bonus points!
				</p>
				<ReferralCodeCopier code={userUid.slice(0, 8)} />
			</article>
		</Section>
	);
};

export default LoyaltyProgramInfoServer;
