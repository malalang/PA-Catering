'use client';

import React, { useEffect, useState } from 'react';
import { UserProvider } from '@/context/UserContext';
import { RouteGuard } from '@/context/RouteGuardContext';
import Navbar from '@/components/Navbar/Navbar';

export function Providers({ children }: { children: React.ReactNode }) {
    // Don't call next/navigation hooks here — they run during SSR and can throw
    // Instead, detect the pathname on the client using window.location inside useEffect
    const [isErrorPage, setIsErrorPage] = useState(false);

    useEffect(() => {
        try {
            const p = window?.location?.pathname ?? '';
            setIsErrorPage(p === '/_not-found' || p === '/404');
        } catch (e) {
            setIsErrorPage(false);
        }
    }, []);

    // While on server render (before useEffect runs) we render the normal Providers
    // so that server-side rendering stays unchanged and hooks are not executed.
    if (isErrorPage) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                        <p className="text-gray-600 mb-8">The page you are looking for could not be found.</p>
                        <a
                            href="/"
                            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Return Home
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <UserProvider>
            <RouteGuard>
                <Navbar />
                <main className="min-h-[calc(100vh-64px)]">
                    {children}
                </main>
            </RouteGuard>
        </UserProvider>
    );
}