import PersonalInformation from './components/PersonalInformation';
import ProfileHeader from './components/ProfileHeader';
import OrdersSummary from './components/OrdersSummary';
import FavoritesSummary from './components/FavoritesSummary';

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
		tierStatus: profile.tier_status || 'Bronze',
		referralCode: profile.referral_code || '',
		preferences: (profile.preferences as any) || {
			dietaryRestrictions: [],
			favoriteItems: [],
			preferyellowPaymentMethod: 'credit_card',
			communicationPreferences: { email: true, sms: false, promotions: true }
		},
		savedPaymentMethods: (profile.saved_payment_methods as any) || [],
		createdAt: new Date(profile.created_at),
		updatedAt: profile.updated_at ? new Date(profile.updated_at) : new Date(),
		lastLogin: profile.last_login ? new Date(profile.last_login) : undefined,
	};

	// Fetch orders count
	const { count: ordersCount } = await supabase
		.from('orders')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', user.id);

	// Fetch favorites count
	const { count: favoritesCount } = await supabase
		.from('user_favorites')
		.select('*', { count: 'exact', head: true })
		.eq('user_id', user.id);

	return (
		<Main
			tittle='Profile'
			Icon={FaUserCircle}
			heading='Manage your personal information, preferences, and account security.'>

			<ProfileHeader
				user={profile}
				ordersCount={ordersCount || 0}
				favoritesCount={favoritesCount || 0}
			/>



			<PersonalInformation user={userProfile} />

			<OrdersSummary userId={user.id} />
			<FavoritesSummary userId={user.id} />

		</Main>
	);
};

export default CustomerProfilePage;
