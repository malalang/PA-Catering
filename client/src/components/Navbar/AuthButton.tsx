'use client';
import AppLink from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useUser } from '@/context/UserContext';
import { FaSignInAlt, FaUserCircle } from 'react-icons/fa';
const AuthButton: React.FC<{ setMenubar: (path: 'mobile' | 'profile') => void }> = ({
	setMenubar,
}) => {
	const { user } = useUser();
	if (user)
		return (
			<Button
				variant='icon'
				onClick={() => setMenubar('profile')}
				aria-label='Open profile menu'>
				<FaUserCircle size={28} />
			</Button>
		);
	return (
		<AppLink
			variant='button'
			className='my-1'
			href='/Authentication/login'>
			<FaSignInAlt /> Log in
		</AppLink>
	);
};

export default AuthButton;
