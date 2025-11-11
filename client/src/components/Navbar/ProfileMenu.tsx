import { protectedPaths, adminPaths, roleBasedPaths } from '@/context/RouteGuardContext';
import AppLink from '../ui/Link';
import { FaCar, FaClipboardList, FaSignOutAlt, FaUserCircle, FaUtensils } from 'react-icons/fa';
import Button from '../ui/Button';
import { logout } from '@/firebase/auth/logout';
import { useEffect, useRef } from 'react';
import { useUser } from '@/context/UserContext';

const ProfileMenu: React.FC<{ setMenubar: (path: 'mobile' | 'profile') => void }> = ({
	setMenubar,
}) => {
	const { user } = useUser();
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
				{user.role !== "Customer" &&
					adminPaths.map((path) => (
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
					await logout();
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
