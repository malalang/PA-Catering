import PersonalInformation from './components/PersonalInformation';
import LoyaltyProgramInfo from './components/LoyaltyProgramInfo';
import Preferences from './components/Preferences';
import PaymentInformation from './components/PaymentInformation';
import AccountManagement from './components/AccountManagement';
import { FaUserCircle } from 'react-icons/fa';
import GetUser from '@/firebase/users/server/GetServerUser';
import { redirect } from 'next/navigation';
import Main from '@/components/ui/layout/Main';

const CustomerProfilePage: React.FC = async () => {
	return (
		<Main
			tittle='Profile'
			Icon={FaUserCircle}
			heading='Manage your personal information, preferences, and account security.'>
			<div className='grid grid-cols-1  gap-8'>
				<div className='lg:col-span-2 space-y-8'>
					<PersonalInformation />
					<PaymentInformation />
				</div>

				<div className='space-y-8'>
					<LoyaltyProgramInfo />
					<Preferences />
					<AccountManagement />
				</div>
			</div>
		</Main>
	);
};

export default CustomerProfilePage;
