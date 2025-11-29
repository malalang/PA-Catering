'use client';

import Icon from '@/components/ui/Icon';
import { FaUserCircle } from 'react-icons/fa';
import UserAddress from '../../../lib/forms/UserAddressForm';
import AppLink from '@/components/ui/Link';
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

const PersonalInformation: React.FC<PersonalInformationProps> = ({ user }) => {
	return (
		<Section
			Icon={FaUserCircle}
			tittle='Personal Information'>
			<article className='mt-6 border-t border-white/20'>
				<dl className='divide-y divide-white/20'>
					<InfoRow
						label='Full Name'
						value={user.displayName || user.email || 'Not set'}
					/>
					<InfoRow
						label='Email address'
						value={user.email}
					/>
					<InfoRow
						label='Phone number'
						value={user.phoneNumber || 'Not set'}
					/>
					<InfoRow
						label='Role'
						value={user.role || 'User'}
					/>
					<InfoRow
						label='Address'
						value={user.address}
					/>
					<InfoRow
						label='City'
						value={user.city}
					/>
					<InfoRow
						label='State'
						value={user.state}
					/>
					<InfoRow
						label='Zip Code'
						value={user.zipCode}
					/>
					<InfoRow
						label='Country'
						value={user.country}
					/>
				</dl>
			</article>
			<div className='mt-6'>
				<AppLink
					href='/profile/edit'
					className='underline text-yellow-500 hover:text-yellow-400'>
					Edit Profile
				</AppLink>
			</div>
		</Section>
	);
};

export default PersonalInformation;
