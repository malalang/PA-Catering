'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import TextInput from '@/components/ui/TextInput';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@/lib/supabase/auth/useAuth';
import { updateProfileAction } from '@/lib/actions/profile';

import Section from '@/components/ui/layout/Section';

const EditProfileForm: React.FC = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(updateProfileAction, null);

    // State for form fields
    const [displayName, setDisplayName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    // Validation states
    const [displayNameError, setDisplayNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    // Effect to initialize form fields when user data loads or changes
    useEffect(() => {
        if (user) {
            setDisplayName(user.user_metadata?.displayName || '');
            setPhoneNumber(user.user_metadata?.phoneNumber || '');
            setPhotoURL(user.user_metadata?.photoURL || '');
        }
    }, [user]);

    // Handle redirection if user is not logged in after loading
    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [user, loading, router]);

    // Redirect on success
    useEffect(() => {
        if (state?.success) {
            router.push('/profile');
        }
    }, [state?.success, router]);

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

        // Basic phone number validation
        if (phoneNumber.trim() && !/^\+?[0-9\s-()]{7,20}$/.test(phoneNumber.trim())) {
            setPhoneNumberError(true);
            isValid = false;
        } else {
            setPhoneNumberError(false);
        }

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (!validateForm()) {
            e.preventDefault();
            return;
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <Section className="bg-white/10 backdrop-blur-md">
            <div className='flex flex-col items-center mb-8'>
                <Avatar
                    src={photoURL || user.user_metadata?.photoURL || ''}
                    alt={displayName || user.user_metadata?.displayName || user.email || 'User'}
                    size='large'
                    className='mb-4 shadow-md'
                />
                <h2 className='text-yellow-500 text-3xl font-bold mb-2'>Edit Personal Information</h2>
                <p className='text-yellow-500 text-lg'>Update your profile details below.</p>
            </div>

            {state?.error && (
                <div className='text-yellow-500 mb-4 bg-yellow-900/20 p-3 rounded-md'>{state.error}</div>
            )}
            {state?.success && (
                <div className='text-white mb-4 bg-green-900/20 p-3 rounded-md'>Profile updated successfully!</div>
            )}

            <form
                action={formAction}
                onSubmit={handleSubmit}
                className='space-y-6'>
                {/* Display Name */}
                <div>
                    <TextInput
                        type='text'
                        label='Display Name'
                        name='displayName'
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
                        <p className='text-yellow-500 text-sm mt-1'>Display Name is required.</p>
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
                        type='tel'
                        label='Phone Number'
                        name='phoneNumber'
                        placeholder='e.g., +27 12 345 6789'
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            setPhoneNumberError(false);
                        }}
                        variant={phoneNumberError ? 'error' : 'default'}
                    />
                    {phoneNumberError && (
                        <p className='text-yellow-500 text-sm mt-1'>
                            Please enter a valid phone number (optional).
                        </p>
                    )}
                </div>

                {/* Photo URL */}
                <div>
                    <TextInput
                        type='url'
                        label='Profile Photo URL'
                        name='photoURL'
                        placeholder='https://example.com/your-photo.jpg'
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                    />
                    <p className='text-sm mt-1'>Enter a direct link to your profile picture.</p>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-end pt-4'>
                    <Button
                        type='button'
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
                        loading={isPending}
                        disabled={isPending}
                        className='w-full sm:w-auto'>
                        <FaSave className='mr-2' /> {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Section>
    );
};

export default EditProfileForm;
