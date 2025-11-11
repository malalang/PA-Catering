'use client';

import { useState } from 'react';
import { signIn } from '@/firebase/auth/signIn';
import Loading from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import AppLink from '@/components/ui/Link';
import { FaSignInAlt } from 'react-icons/fa';
import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<string | null>(null); // To manage initial user check

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission
		setLoading('Signing in...'); // Set loading state to indicate sign-in process
		setError(null); // Clear previous errors

		try {
			const userCredential = await signIn(email, password);
			if (userCredential) {
				// The UserProvider will detect the auth change and handle data fetching.
				// We just need to navigate to the user's profile page.
				router.push('/profile');
			} else {
				// This case may not be hit if signIn throws an error, but it's a safe fallback.
				setError('Sign in failed. Please check your credentials.');
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unexpected error occurred during sign in.');
			}
		} finally {
			setLoading(null);
		}
	};

	if (loading) {
		return <Loading message={loading} />;
	}

	return (
		<Main>
			<Section>
				{error && (
					<div className='text-red-500 mb-4 mt-4 bg-red-900/20 p-3 rounded-md'>{error}</div>
				)}
				<form
					onSubmit={handleSubmit}
					className='space-y-6 mt-6'>
					<TextInput
						label='Email:'
						type='email'
						id='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<TextInput
						label='Password:'
						type='password'
						id='password'
						name='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Button
						type='submit'
						variant='primary'
						className='w-full'
						size='lg'
						loading={!!loading}>
						Sign In
					</Button>
				</form>
				<p className='mt-6 text-white/70'>
					Don&apos;t have an account? <AppLink href='/Authentication/register'>Sign Up</AppLink>
				</p>
			</Section>
		</Main>
	);
}
