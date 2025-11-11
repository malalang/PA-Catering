import AppLink from '../ui/Link';
import { FaHome, FaInfoCircle, FaCar, FaEnvelope, FaImages } from 'react-icons/fa';
import { publicPaths } from '@/context/RouteGuardContext';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
const MobileMenu: React.FC<{
	setMenubar: (path: 'mobile' | 'profile') => void;
}> = ({ setMenubar }) => {
	const navRef = useRef<HTMLUListElement>(null);
	// useEffect(() => {
	// 	const handleClickOutside = (event: MouseEvent) => {
	// 		if (navRef.current && !navRef.current.contains(event.target as Node)) {
	// 			setMenubar('mobile');
	// 		}
	// 	};
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// }, []);
	return (
		<nav className='md:hidden  top-full m-0 left-0 w-full transition-all duration-300 z-50 h-screen '>
			<ul
				ref={navRef}
				className='flex flex-col items-start p-4 gap-4'>
				{publicPaths.map((path) => (
					<li key={path}>
						<AppLink
							href={path}
							variant='primary'
							onClick={() => setMenubar('mobile')}>
							<span className='flex items-center gap-2'>
								{path === '/' && (
									<span className='flex items-center gap-2'>
										<FaHome /> Home
									</span>
								)}
								{path === '/about' && <FaInfoCircle />}
								{path === '/gallery' && <FaImages />}
								{path === '/carwash' && <FaCar />}
								{path === '/contact' && <FaEnvelope />}
								{path === '/terms' && 'Terms'}
								{path === '/blog' && 'Blog'}
								{path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1)}
							</span>
						</AppLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
export default MobileMenu;
