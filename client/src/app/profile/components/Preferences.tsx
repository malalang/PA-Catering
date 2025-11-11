'use client';
import React from 'react';

import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { FaCog, FaLeaf, FaHeart, FaCar, FaEnvelope } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';
import Section from '@/components/ui/layout/Section';

interface PreferencesProps {
	preferences: UserProfile['preferences'];
}

const PreferenceItem: React.FC<{
	icon: React.ElementType;
	title: string;
	children: React.ReactNode;
}> = ({ icon, title, children }) => (
	<article>
		<Icon
			icon={icon}
			heading={title}
			variant='inlineCircular'
		/>
		<div className='mt-4'>{children}</div>
	</article>
);

const ListRenderer: React.FC<{ items: string[] | undefined; emptyText: string }> = ({
	items,
	emptyText,
}) => {
	if (!items || items.length === 0) {
		return <p className='text-white/60 italic'>{emptyText}</p>;
	}
	return (
		<ul className='space-y-2'>
			{items.map((item, index) => (
				<li
					key={index}
					className='text-sm text-white'>
					- {item}
				</li>
			))}
		</ul>
	);
};

const Preferences: React.FC = () => {
	const { user } = useUser();
	if (!user) {
		return null;
	}
	return (
		<Section
			Icon={FaCog}
			tittle='User Preferences'>
			<div className='mt-6 grid gap-6 md:grid-cols-2'>
				<PreferenceItem
					icon={FaLeaf}
					title='Dietary Needs'>
					<ListRenderer
						items={user?.preferences?.dietaryRestrictions}
						emptyText='No dietary restrictions specified.'
					/>
				</PreferenceItem>

				<PreferenceItem
					icon={FaHeart}
					title='Favorite Items'>
					<ListRenderer
						items={user.preferences?.favoriteItems}
						emptyText='No favorite items added yet.'
					/>
				</PreferenceItem>

				<PreferenceItem
					icon={FaCar}
					title='Preferred Car Wash'>
					<ListRenderer
						items={user.preferences?.preferredCarWashServices}
						emptyText='No preferred services selected.'
					/>
				</PreferenceItem>

				<PreferenceItem
					icon={FaEnvelope}
					title='Communication'>
					<p className='text-white/60 italic'>Communication settings coming soon.</p>
				</PreferenceItem>
			</div>
			<div className='mt-8 text-right'>
				<Button variant='primary'>Update Preferences</Button>
			</div>
		</Section>
	);
};

export default Preferences;
