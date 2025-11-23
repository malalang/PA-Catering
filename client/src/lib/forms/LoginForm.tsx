'use client';

import { useActionState } from 'react';
import { signInAction } from '@/lib/actions/auth';
import Loading from '@/components/ui/Loading';

import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import AppLink from '@/components/ui/Link';
import Section from '@/components/ui/layout/Section';

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(signInAction, null);

    if (isPending) {
        return <Loading message="Signing in..." />;
    }

    return (
        <Section className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-amber-400/20 shadow-2xl">
            {state?.error && (
                <div className='text-red-300 mb-4 mt-4 bg-red-500/10 border border-red-500/30 p-3 rounded-lg'>{state.error}</div>
            )}
            <form
                action={formAction}
                className='space-y-6 mt-6'>
                <TextInput
                    label='Email:'
                    type='email'
                    id='email'
                    name='email'
                    required
                />
                <TextInput
                    label='Password:'
                    type='password'
                    id='password'
                    name='password'
                    required
                />
                <Button
                    type='submit'
                    variant='primary'
                    className='w-full'
                    size='lg'
                    loading={isPending}>
                    Sign In
                </Button>
            </form>
            <p className='mt-6 text-white/70'>
                Don&apos;t have an account? <AppLink href='/register'>Sign Up</AppLink>
            </p>
        </Section>
    );
}
