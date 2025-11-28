'use client';
import AppLink from '../ui/Link';
import { HiUser, HiClipboardList, HiShoppingBag, HiLogout, HiCamera } from 'react-icons/hi';
import Button from '../ui/Button';
import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';

const protectedPaths = [
	{ path: '/profile', icon: HiUser, label: 'Profile' },
	{ path: '/orders', icon: HiClipboardList, label: 'Orders' },

	{ path: '/photo/booking', icon: HiCamera, label: '360 Booth Booking' },
];

const ProfileMenu: React.FC<{ setMenubar: (path: 'mobile' | 'profile') => void; user: User | null }> = ({
	setMenubar,
	user,
}) => {
	const pathname = usePathname();

	if (!user) return null;

	return (
		<nav className='absolute top-full right-0 w-full sm:w-80 bg-gradient-to-b from-slate-900/98 to-slate-800/98 backdrop-blur-xl border border-amber-400/10 rounded-b-xl shadow-2xl transition-all duration-300 z-40'>
			{/* User Info */}
			<div className='px-4 py-3 border-b border-white/10'>
				<p className='text-sm text-slate-400'>Signed in as</p>
				<p className='text-white font-semibold truncate'>{user.email}</p>
			</div>

			{/* Menu Items */}
			<ul className='flex flex-col p-2'>
				{protectedPaths.map(({ path, icon: Icon, label }) => {
					const isActive = pathname === path;
					return (
						<li key={path}>
							<AppLink
								href={path}
								onClick={() => setMenubar('profile')}
								className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 w-full ${isActive
									? 'bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-400/30 text-amber-400'
									: 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
									}`}>
								<Icon className={`text-lg ${isActive ? 'text-amber-400' : ''}`} />
								<span>{label}</span>
							</AppLink>
						</li>
					);
				})}
			</ul>

			{/* Logout Button */}
			<div className='p-2 border-t border-white/10'>
				<Button
					variant='primary'
					onClick={async () => {
						const { createClient } = await import('@/lib/supabase/client');
						const supabase = createClient();
						await supabase.auth.signOut();
						setMenubar('profile');
					}}
					className='flex items-center justify-center gap-2 px-4 py-2.5 w-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-300 hover:text-red-200 rounded-lg font-semibold transition-all duration-200'>
					<HiLogout className='text-lg' />
					<span>Log Out</span>
				</Button>
			</div>
		</nav>
	);
};

export default ProfileMenu;
