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

	const { data: profileData } = await supabase
		.from("profiles")
		.select("*")
		.eq("id", user.id)
		.single();

	if (!profileData) {
		// Handle case where profile doesn't exist (shouldn't happen if auth works)
		return <div>Profile not found</div>;
	}

	const profile = profileData as any;

	// Map DB profile (snake_case) to UserProfile (camelCase)
	const userProfile: UserProfile = {
		uid: profile.uid || profile.id,
		displayName: profile.display_name,
		email: profile.email,
		emailVerified: profile.email_verified || false,
		photoURL: profile.photo_url,
		phoneNumber: profile.phone,
		role: (profile.role as UserRole) || 'Customer',
		address: profile.address || '',
		city: profile.city || '',
		state: profile.state || '',
		zipCode: profile.zip_code || '',
		country: profile.country || '',
		theme: (profile.theme as 'system' | 'light' | 'dark') || 'system',
		orderHistory: (profile.order_history as any) || [],
		loyaltyPointsBalance: profile.loyalty_points_balance || 0,
		tierStatus: profile.tier_status || 'Bronze',
		rewardsAvailable: (profile.rewards_available as any) || [],
		yellowemptionHistory: (profile.redemption_history as any) || [],
		personalizedPromotions: (profile.personalized_promotions as any) || [],
		referralCode: profile.referral_code || '',
		carWashCount: profile.car_wash_count || 0,
		preferences: (profile.preferences as any) || {
			dietaryRestrictions: [],
			favoriteItems: [],
			preferyellowCarWashServices: [],
			preferyellowPaymentMethod: 'credit_card',
			communicationPreferences: { email: true, sms: false, promotions: true }
		},
		savedPaymentMethods: (profile.saved_payment_methods as any) || [],
		createdAt: new Date(profile.created_at),
		updatedAt: profile.updated_at ? new Date(profile.updated_at) : new Date(),
		lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
	};

	return (
		<Main
			tittle='Profile'
			Icon={FaUserCircle}
			heading='Manage your personal information, preferences, and account security.'>
			<div className='grid grid-cols-1  gap-8'>
				<div className='lg:col-span-2 space-y-8'>
					<PersonalInformation user={userProfile} />
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
