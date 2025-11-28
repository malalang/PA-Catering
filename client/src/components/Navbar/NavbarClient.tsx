'use client';
import React from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import ProfileMenu from './ProfileMenu';
import AuthButton from './AuthButton';
import MobileMenu from './MobileMenu';
import { useMenubarToggle } from './useMenubarToggle';
import { User } from '@supabase/supabase-js';

interface NavbarClientProps {
    user: User | null;
}

const NavbarClient: React.FC<NavbarClientProps> = ({ user }) => {
    const { profileOpen, mobileOpen, setMenubar } = useMenubarToggle();

    return (
        <header className='sticky top-0 left-0 m-0 p-0 w-full px-4 sm:px-6 lg:px-8 z-50 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 backdrop-blur-md border-b border-amber-400/10 shadow-lg'>
            <div className='max-w-7xl mx-auto flex justify-between items-center py-3'>
                <MobileNavbar
                    setMenubar={setMenubar}
                    mobileOpen={mobileOpen}
                />
                <DesktopNavbar />
                <AuthButton setMenubar={setMenubar} user={user} />
            </div>
            {profileOpen ? <ProfileMenu setMenubar={setMenubar} user={user} /> : null}
            {mobileOpen ? <MobileMenu setMenubar={setMenubar} /> : null}
        </header>
    );
};
export default NavbarClient;
