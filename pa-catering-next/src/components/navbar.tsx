'use client';

import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from '@/components/ui/Link';
import Button from '@/components/ui/Button';
import { useUser } from '@/context/user-context';
import CartButton from '@/features/cart/components/CartButton';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-secondary-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl">
              P.A Catering
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/menu" variant="secondary">Menu</Link>
            <Link href="/about" variant="secondary">About</Link>
            <Link href="/contact" variant="secondary">Contact</Link>
            <CartButton />
            {user ? (
              <Link href="/profile" variant="button">Profile</Link>
            ) : (
              <Link href="/auth/login" variant="button">Login</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/menu" 
              className="block px-3 py-2 text-white hover:bg-primary/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link 
              href="/about"
              className="block px-3 py-2 text-white hover:bg-primary/20"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact"
              className="block px-3 py-2 text-white hover:bg-primary/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <Link 
                href="/profile"
                className="block px-3 py-2 text-white hover:bg-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            ) : (
              <Link 
                href="/auth/login"
                className="block px-3 py-2 text-white hover:bg-primary/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}