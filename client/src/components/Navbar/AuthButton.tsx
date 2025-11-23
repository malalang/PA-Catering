'use client';
import AppLink from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { HiLogin, HiUserCircle } from 'react-icons/hi';
import { User } from '@supabase/supabase-js';

const AuthButton: React.FC<{ setMenubar: (path: 'mobile' | 'profile') => void; user: User | null }> = ({
	setMenubar,
	user,
}) => {
	if (user)
		return (
			<Button
				variant='icon'
				onClick={() => setMenubar('profile')}
				className='bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/30 transition-all duration-200 p-2 rounded-lg'
				aria-label='Open profile menu'>
				<HiUserCircle size={28} className='text-amber-400' />
			</Button>
		);
	return (
		<AppLink
			href='/login'
			className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-lg font-semibold text-white shadow-lg hover:shadow-amber-500/50 transition-all duration-200 border-0'>
			<HiLogin size={20} />
			<span className='hidden sm:inline'>Log in</span>
		</AppLink>
	);
};

export default AuthButton;
