import React from 'react';
import Main from '@/components/ui/layout/Main';
import { HiEnvelope } from 'react-icons/hi2';
import AppLink from '@/components/ui/Link';

export default function ConfirmEmailPage() {
    return (
        <Main
            tittle='Confirm Email'
            Icon={HiEnvelope}
            className='flex items-center justify-center min-h-[60vh] p-4'>
            <div className='max-w-md w-full bg-gradient-to-br from-yellow-900/90 to-yellow-800/90 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl text-center'>
                <div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-4 rounded-full border border-amber-400/30 inline-block mb-6'>
                    <HiEnvelope className='text-5xl text-amber-400' />
                </div>
                <h2 className='text-3xl font-bold text-white mb-4'>Check your email</h2>
                <p className='text-yellow-100 mb-8'>
                    We've sent you a confirmation link. Please check your inbox (and spam folder) to verify your account.
                </p>
                <AppLink href='/login' variant='button' className='w-full'>
                    Back to Login
                </AppLink>
            </div>
        </Main>
    );
}
