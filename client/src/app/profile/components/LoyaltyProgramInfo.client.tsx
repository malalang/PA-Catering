'use client';
import LoyaltyProgramInfoServer from './LoyaltyProgramInfo.server';
import { useAuth } from '@/lib/supabase/auth/useAuth';

const LoyaltyProgramInfo: React.FC = () => {
	const { user } = useAuth();

	return <LoyaltyProgramInfoServer userUid={user?.id} />;
};

export default LoyaltyProgramInfo;
