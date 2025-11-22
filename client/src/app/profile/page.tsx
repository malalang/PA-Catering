import PersonalInformation from './components/PersonalInformation';
import LoyaltyProgramInfo from './components/LoyaltyProgramInfo';
import Preferences from './components/Preferences';
import PaymentInformation from './components/PaymentInformation';
import AccountManagement from './components/AccountManagement';
import { FaUserCircle } from 'react-icons/fa';
import Main from '@/components/ui/layout/Main';

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const CustomerProfilePage: React.FC = async () => {
	const supabase = await createClient();
	const { data: { user } } = await supabase.auth.getUser();

	if (!user) {
		redirect("/login");
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.single();

	if (!profile) {
		// Handle case where profile doesn't exist (shouldn't happen if auth works)
		return <div>Profile not found</div>;
	}

	return (
		<Main
			tittle='Profile'
			Icon={FaUserCircle}
			heading='Manage your personal information, preferences, and account security.'>
			<div className='grid grid-cols-1  gap-8'>
				<div className='lg:col-span-2 space-y-8'>
					<PersonalInformation user={profile as any} />
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
