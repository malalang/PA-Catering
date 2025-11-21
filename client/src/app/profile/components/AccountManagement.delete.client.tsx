'use client';
import Button from '@/components/ui/Button';
import { FaTrash } from 'react-icons/fa';

const AccountManagementDeleteButton: React.FC = () => {
	const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			console.log('Account deletion initiated...');
			   // TODO: Implement Supabase function to delete user account.
		}
	};

	return (
		<Button
			onClick={handleDeleteAccount}
			variant='danger'
			className='w-full flex items-center justify-center gap-2'>
			<FaTrash /> Delete Account
		</Button>
	);
};

export default AccountManagementDeleteButton;
