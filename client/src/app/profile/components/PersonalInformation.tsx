'use client';

import Icon from '@/components/ui/Icon';
import { FaUserCircle } from 'react-icons/fa';
import UserAddress from './Elements/UserAddress';
import AppLink from '@/components/ui/Link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import Section from '@/components/ui/layout/Section';

interface PersonalInformationProps {
	user: UserProfile;
}

const InfoRow: React.FC<{ label: string; value: string | null | undefined }> = ({
	label,
	value,
}) => (
	<div className='py-3 sm:grid sm:grid-cols-3 sm:gap-4'>
		<dt className='text-sm font-medium text-white/70'>{label}</dt>
		<dd className='mt-1 text-sm text-white sm:mt-0 sm:col-span-2'>{value || 'Not set'}</dd>
	</div>
);

const PersonalInformation: React.FC = () => {
	const { user } = useUser();
	const route = useRouter();
	if (!user) {
		route.replace('/Authentication/login');
		return null;
	}
	return (
		<Section
			Icon={FaUserCircle}
			tittle='Personal Information'>
			<article className='mt-6 border-t border-white/20'>
				<dl className='divide-y divide-white/20'>
					<InfoRow
						label='Full Name'
						value={user.displayName}
					/>
					<InfoRow
						label='Email address'
						value={user.email}
					/>
					<InfoRow
						label='Phone number'
						value={user.phoneNumber}
					/>
					<InfoRow
						label='Role'
						value={user.role}
					/>
				</dl>
			</article>
			<UserAddress />
			<AppLink
				href='/profile/edit'
				className='underline'>
				Edit Profile
			</AppLink>
		</Section>
	);
};

export default PersonalInformation;
