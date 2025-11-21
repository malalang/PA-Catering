import { useState } from 'react';

type MenuPath = 'mobile' | 'profile';

export const useMenubarToggle = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const setMenubar = (path: MenuPath) => {
    if (path === 'mobile') {
      setMobileOpen(prev => !prev);
      setProfileOpen(false);
    } else if (path === 'profile') {
      setProfileOpen(prev => !prev);
      setMobileOpen(false);
    }
  };

  return {
    profileOpen,
    mobileOpen,
    setMenubar,
  };
};