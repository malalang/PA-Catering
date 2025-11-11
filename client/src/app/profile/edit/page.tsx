'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaSave, FaTimes } from 'react-icons/fa'; // Added FaImage for photo URL
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Loading from '@/components/ui/Loading'; // Assuming you have a Loading component
import { useUser } from '@/context/UserContext';
import { updateUser } from '@/firebase/users/utils';

import Section from '@/components/ui/layout/Section';

const EditProfilePage: React.FC = () => {
	const { user, loading } = useUser();
	const router = useRouter();

	// State for form fields
	const [displayName, setDisplayName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	const [isSaving, setIsSaving] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null); // null, true, or false

	// Validation states
	const [displayNameError, setDisplayNameError] = useState(false);
	const [phoneNumberError, setPhoneNumberError] = useState(false);

	// Effect to initialize form fields when user data loads or changes
	useEffect(() => {
		if (user) {
			setDisplayName(user.displayName || '');
			setPhoneNumber(user.phoneNumber || '');
			setPhotoURL(user.photoURL || '');
		}
	}, [user]);

	// Handle redirection if user is not logged in after loading
	useEffect(() => {
		if (!loading && !user) {
			router.replace('/Authentication/login');
		}
	}, [user, loading, router]);

	// Show loading state while user data is being fetched by context
	if (loading) {
		return <Loading message='Loading profile data...' />;
	}

	// If user is null after loading, it means redirection is happening
	if (!user) {
		return null;
	}

	const validateForm = () => {
		let isValid = true;

		if (!displayName.trim()) {
			setDisplayNameError(true);
			isValid = false;
		} else {
			setDisplayNameError(false);
		}

		// Basic phone number validation (e.g., if it's not empty, check format)
		// You might want a more robust regex for real phone numbers
		if (phoneNumber.trim() && !/^\+?[0-9\s-()]{7,20}$/.test(phoneNumber.trim())) {
			setPhoneNumberError(true);
			isValid = false;
		} else {
			setPhoneNumberError(false);
		}

		return isValid;
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission

		if (!validateForm()) {
			return; // Stop if validation fails
		}

		setIsSaving(true);
		setSaveSuccess(null); // Reset feedback

		const updatedFields: Partial<UserProfile> = {
			displayName: displayName.trim(),
			phoneNumber: phoneNumber.trim() || null, // Store null if empty
			photoURL: photoURL.trim() || null, // Store null if empty
		};

		try {
			await updateUser(user.uid, updatedFields);
			setSaveSuccess(true);
			// Optionally, redirect back to the profile page after successful save
			router.push('/profile');
		} catch (error) {
			console.error('Error saving profile:', error);
			setSaveSuccess(false);
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		router.back(); // Go back to the previous page (e.g., PersonalInformation)
	};

	return (
		<Section>
			<div className='flex flex-col items-center mb-8'>
				<Avatar
					src={photoURL || user.photoURL} // Show current input photoURL if available, else user's
					alt={displayName || user.displayName || 'User'}
					size='large'
					className='mb-4 shadow-md'
				/>
				<h2 className='text-red-500 text-3xl font-bold mb-2'>Edit Personal Information</h2>
				<p className='text-red-500 text-lg'>Update your profile details below.</p>
			</div>

			<form
				onSubmit={handleSave}
				className='space-y-6'>
				{/* Display Name */}
				<div>
					<TextInput
						type='text'
						label='Display Name'
						placeholder='Your Name'
						value={displayName}
						onChange={(e) => {
							setDisplayName(e.target.value);
							setDisplayNameError(false);
						}}
						variant={displayNameError ? 'error' : 'default'}
						required
					/>
					{displayNameError && (
						<p className='text-red-500 text-sm mt-1'>Display Name is required.</p>
					)}
				</div>

				{/* Email (Read-only) */}
				<div>
					<TextInput
						type='email'
						label='Email (Cannot be changed here)'
						value={user.email || ''}
						disabled
						className='cursor-not-allowed bg-black/50'
					/>
					<p className='text-sm mt-1'>
						To change your email, please visit your account settings or contact support.
					</p>
				</div>

				{/* Phone Number */}
				<div>
					<TextInput
						type='tel' // Use 'tel' for phone numbers
						label='Phone Number'
						placeholder='e.g., +27 12 345 6789'
						value={phoneNumber}
						onChange={(e) => {
							setPhoneNumber(e.target.value);
							setPhoneNumberError(false);
						}}
						variant={phoneNumberError ? 'error' : 'default'}
					/>
					{phoneNumberError && (
						<p className='text-red-500 text-sm mt-1'>
							Please enter a valid phone number (optional).
						</p>
					)}
				</div>

				{/* Photo URL */}
				<div>
					<TextInput
						type='url' // Use 'url' for photo URLs
						label='Profile Photo URL'
						placeholder='https://example.com/your-photo.jpg'
						value={photoURL}
						onChange={(e) => setPhotoURL(e.target.value)}
						// No specific error state for URL unless you want to validate it's a valid image URL
					/>
					<p className='text-sm mt-1'>Enter a direct link to your profile picture.</p>
				</div>

				{/* Feedback Messages */}
				{saveSuccess === true && (
					<p className='text-white font-semibold text-center'>Profile updated successfully!</p>
				)}
				{saveSuccess === false && (
					<p className='text-red-600 font-semibold text-center'>
						Failed to update profile. Please try again.
					</p>
				)}

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 justify-end pt-4'>
					<Button
						type='button' // Important for non-submit buttons inside a form
						onClick={handleCancel}
						variant='secondary'
						size='md'
						className='w-full sm:w-auto'>
						<FaTimes className='mr-2' /> Cancel
					</Button>
					<Button
						type='submit'
						variant='primary'
						size='md'
						loading={isSaving}
						disabled={isSaving}
						className='w-full sm:w-auto'>
						<FaSave className='mr-2' /> {isSaving ? 'Saving...' : 'Save Changes'}
					</Button>
				</div>
			</form>
		</Section>
	);
};

export default EditProfilePage;
