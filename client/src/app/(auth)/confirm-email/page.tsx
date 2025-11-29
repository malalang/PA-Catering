import React from 'react';
import Main from '@/components/ui/layout/Main';
import React from 'react';
import Main from '@/components/ui/layout/Main';
import { HiEnvelope } from 'react-icons/hi2';
import AppLink from '@/components/ui/Link';

export default function ConfirmEmailPage() {
    return (
        <Main
            tittle='Confirm Email'
            Icon={HiEnvelope}
            className='flex items-center justify-center min-h-[60vh] p-4 md:p-8'>
            <div className='max-w-md w-full bg-gradient-to-br from-yellow-900/90 to-yellow-800/90 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl text-center transform transition-all hover:scale-[1.01] duration-300'>
                <div className='bg-gradient-to-br from-amber-500/20 to-yellow-500/20 p-5 md:p-6 rounded-full border border-amber-400/30 inline-block mb-6 shadow-lg shadow-amber-500/10 animate-pulse'>
                    <HiEnvelope className='text-5xl md:text-6xl text-amber-400' />
                </div>
                <h2 className='text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight'>Check your email</h2>
                <p className='text-yellow-100/90 mb-8 text-sm md:text-base leading-relaxed'>
                    We've sent you a confirmation link. Please check your inbox (and spam folder) to verify your account.
                </p>
                <div className='space-y-4'>
                    <AppLink href='/login' variant='button' className='w-full py-3 text-lg shadow-amber-500/20'>
                        Back to Login
                    </AppLink>
                    <p className='text-xs text-yellow-500/60 mt-4'>
                        Didn't receive the email? Check your spam folder or try logging in again.
                    </p>
                </div>
            </div>
        </Main>
    );
}
