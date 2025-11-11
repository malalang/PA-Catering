'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/firebase/auth/signUp';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import AppLink from '@/components/ui/Link';
import { FaUserPlus } from 'react-icons/fa';
import Icon from '@/components/ui/Icon';
import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null); // Clear previous errors

		try {
			await signUp(email, password, displayName, phoneNumber);
			// Redirect to profile page on successful registration
			router.push('/profile');
		} catch (err: unknown) {
			if (typeof err === 'object' && err !== null && 'message' in err) {
				console.error('Registration error:', err);
				setError((err.message as string) || 'An unexpected error occurred during registration.');
			} else {
				console.error('Registration error:', err);
				setError('An unexpected error occurred during registration.');
			}
		}
	};

	return (
		<Main tittle='Register'>
			<Section>
				{error && (
					<div className='text-red-500 mb-4 mt-4 bg-red-900/20 p-3 rounded-md'>{error}</div>
				)}
				<form
					onSubmit={handleSubmit}
					className='space-y-6 mt-6'>
					<TextInput
						label='Email'
						id='email'
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<TextInput
						label='Display Name'
						id='displayName'
						type='text'
						placeholder='Display Name'
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
					<TextInput
						label='Phone Number'
						id='phoneNumber'
						type='tel'
						placeholder='Phone Number'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
					/>
					<TextInput
						label='Password'
						id='password'
						type='password'
						placeholder='******************'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Button
						type='submit'
						variant='primary'
						className='w-full'
						size='lg'>
						Register
					</Button>
				</form>
				<p className='text-center text-sm mt-6 text-white/70'>
					Already have an account? <AppLink href='/Authentication/login'>Login</AppLink>
				</p>
			</Section>
		</Main>
	);
};

export default RegisterPage;
