'use client';

import AppLink from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { FaShieldAlt, FaFileContract, FaUserSecret, FaKey, FaTrash } from 'react-icons/fa';
import { MouseEventHandler } from 'react';
import Section from '@/components/ui/layout/Section';

const AccountManagement: React.FC = () => {
	const handleDeleteAccount: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();
		// In a real app, this would trigger a confirmation modal.
		if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			console.log('Account deletion initiated...');
			// TODO: Implement Firebase function to delete user account.
		}
	};

	return (
		<Section
			Icon={FaShieldAlt}
			tittle='Account & Security'>
			<div className='mt-6 space-y-4'>
				{/* Legal Links */}
				<article className='bg-black/20 p-4 rounded-md border border-white/10 space-y-3'>
					<Icon
						icon={FaFileContract}
						heading='Legal'
						variant='inlineCircular'
					/>
					<AppLink
						href='/terms'
						variant='secondary'>
						<FaFileContract className='mr-2' /> View Terms and Conditions
					</AppLink>
					<AppLink
						href='/privacy'
						variant='secondary'>
						<FaUserSecret className='mr-2' /> View Privacy Policy
					</AppLink>
				</article>

				{/* Security Actions */}
				<article className='bg-black/20 p-4 rounded-md border border-white/10 space-y-3'>
					<Icon
						icon={FaKey}
						heading='Security'
						variant='inlineCircular'
					/>
					<AppLink
						href='/Authentication/change-password'
						variant='secondary'>
						<FaKey className='mr-2' /> Change Password
					</AppLink>
					<Button
						onClick={handleDeleteAccount}
						variant='danger'
						className='w-full flex items-center justify-center gap-2'>
						<FaTrash /> Delete Account
					</Button>
				</article>
			</div>
		</Section>
	);
};

export default AccountManagement;
