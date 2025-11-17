'use client';

import { useState } from 'react';
import { signIn } from '@/lib/supabase/auth/signIn';
import Loading from '@/components/ui/Loading';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import AppLink from '@/components/ui/Link';
import { FaSignInAlt } from 'react-icons/fa';
import Main from '@/components/ui/layout/Main';
import Section from '@/components/ui/layout/Section';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading('Signing in...');
        setError(null);

        try {
            const user = await signIn(email, password);
            if (user) {
                router.push('/profile');
            } else {
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
        <Section>
            {error && (
                <div className='text-yellow-500 mb-4 mt-4 bg-yellow-900/20 p-3 rounded-md'>{error}</div>
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
    );
}
