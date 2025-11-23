'use client';

import { useActionState } from 'react';
import { signUpAction } from '@/lib/actions/auth';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import AppLink from '@/components/ui/Link';
import Section from '@/components/ui/layout/Section';

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(signUpAction, null);

    if (isPending) {
        return <Loading message="Registering..." />;
    }

    return (
        <Section >
            {state?.error && (
                <div className='text-red-300 mb-4 mt-4 bg-red-500/10 border border-red-500/30 p-3 rounded-lg'>{state.error}</div>
            )}
            <form
                action={formAction}
                className='space-y-6 mt-6'>
                <TextInput
                    label='Email'
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    required
                />
                <TextInput
                    label='Display Name'
                    id='displayName'
                    name='displayName'
                    type='text'
                    placeholder='Display Name'
                    required
                />
                <TextInput
                    label='Phone Number'
                    id='phoneNumber'
                    name='phoneNumber'
                    type='tel'
                    placeholder='Phone Number'
                    required
                />
                <TextInput
                    label='Password'
                    id='password'
                    name='password'
                    type='password'
                    placeholder='******************'
                    required
                />
                <Button
                    type='submit'
                    variant='primary'
                    className='w-full'
                    size='lg'
                    loading={isPending}>
                    Register
                </Button>
            </form>
            <p className='text-center text-sm mt-6 text-white/70'>
                Already have an account? <AppLink href='/login'>Login</AppLink>
            </p>
        </Section>
    );
};

export default RegisterForm;
