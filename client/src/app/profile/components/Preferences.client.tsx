'use client';
import PreferencesServer from './Preferences.server';
import { useAuth } from '@/lib/supabase/auth/useAuth';

const Preferences: React.FC = () => {
	const { user } = useAuth();
	return <PreferencesServer preferences={user?.user_metadata?.preferences} />;
};

export default Preferences;
