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
        <header className='sticky bg-black/50 blur-[0.1px] backdrop-blur-md  top-0 left-0 m-0 p-0  w-full px-2 z-50'>
            <div className='flex justify-between w-full'>
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
