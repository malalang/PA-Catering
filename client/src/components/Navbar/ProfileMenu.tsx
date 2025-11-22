const protectedPaths = ['/profile', '/orders', '/carwash/booking', '/menu'];
import AppLink from '../ui/Link';
import { FaCar, FaClipboardList, FaSignOutAlt, FaUserCircle, FaUtensils } from 'react-icons/fa';
import Button from '../ui/Button';
import { useEffect, useRef } from 'react';


import { User } from '@supabase/supabase-js';

const ProfileMenu: React.FC<{ setMenubar: (path: 'mobile' | 'profile') => void; user: User | null }> = ({
	setMenubar,
	user,
}) => {
	const navRef = useRef<HTMLUListElement>(null);
	if (!user) return null;

	// useEffect(() => {
	// 	const handleClickOutside = (event: MouseEvent) => {
	// 		if (navRef.current && !navRef.current.contains(event.target as Node)) {
	// 			setMenubar('profile');
	// 		}
	// 	};
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, []);
	return (
		<nav className=' top-full m-0 left-0 w-full transition-all duration-300 z-50 h-screen'>
			<ul
				ref={navRef}
				className='flex flex-col items-start p-4 gap-4'>
				{protectedPaths.map((path) => (
					<li key={path}>
						<AppLink
							href={path}
							variant='primary'
							onClick={() => setMenubar('profile')}>
							<span className='flex items-center gap-2'>
								{path === '/menu' && <FaUtensils />}
								{path === '/profile' && <FaUserCircle />}
								{path === '/orders' && <FaClipboardList />}
								{path === '/carwash/booking' && <FaCar />}
								{path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
							</span>
						</AppLink>
					</li>
				))}
			</ul>

			<Button
				variant='primary'
				onClick={async () => {
					const { createClient } = await import('@/lib/supabase/client');
					const supabase = createClient();
					await supabase.auth.signOut();
					setMenubar('profile');
				}}
				className='flex items-center justify-between gap-2 px-4 py-2 w-full text-left'>
				<span className='flex items-center gap-2'>
					<FaSignOutAlt /> Log Out
				</span>
			</Button>
		</nav>
	);
};
export default ProfileMenu;
