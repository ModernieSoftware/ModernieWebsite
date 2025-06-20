'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, MenuItem } from '../acernityui/navbar-menu';
import { MenuIcon, X } from 'lucide-react';

export function NavbarDemo() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        // At top of page
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar showNavbar={showNavbar} />
    </div>
  );
}

function Navbar({ showNavbar }: { showNavbar: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* ✅ Desktop Navbar */}
      <div
        className={cn(
          'hidden md:block fixed top-6 inset-x-0 max-w-5xl mx-auto z-40 transition-all duration-300',
          showNavbar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Home" href="/" />
          <MenuItem setActive={setActive} active={active} item="Careers" href="/careers" />
          <MenuItem setActive={setActive} active={active} item="Services" href="/#services" />
          <div className="px-2 flex items-center">
            <Image
              src="/img/About Us (6).png"
              alt="Company Logo"
              width={120}
              height={40}
              className="object-contain relative -mt-1"
            />
          </div>
          <MenuItem setActive={setActive} active={active} item="Products" href="/#product" />
          <MenuItem setActive={setActive} active={active} item="Blog" href="/" />
          <MenuItem setActive={setActive} active={active} item="Contact Us" href="/contact" />
        </Menu>
      </div>

      {/* ✅ Mobile Floating Button */}
      {!mobileMenuOpen && (
        <div
          className={cn(
            'flex md:hidden bg-black bg-opacity-100 p-4 rounded-xl items-center justify-between shadow-lg fixed top-6 left-4 right-4 z-50 transition-all duration-300',
            showNavbar ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          )}
        >
          <Image
            src="/img/About Us (6).png"
            alt="Company Logo"
            width={100}
            height={35}
            className="object-contain relative -mt-1 transition-all duration-300"
          />
          <button onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon className="text-white w-7 h-7" />
          </button>
        </div>
      )}

      {/* ✅ Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 text-white p-8 z-50 flex flex-col md:hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <Image
              src="/img/About Us (2).png"
              alt="Company Logo"
              width={120}
              height={40}
              className="object-contain relative -mt-1"
            />
            <X className="w-8 h-8 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
          </div>

          {/* Mobile Links */}
          <ul className="space-y-8 text-lg">
            <li className="cursor-pointer" onClick={() => { router.push('/'); setMobileMenuOpen(false); }}>Home</li>
            <li className="cursor-pointer" onClick={() => { router.push('/#products'); setMobileMenuOpen(false); }}>Products</li>
            <li className="cursor-pointer" onClick={() => { router.push('/#services'); setMobileMenuOpen(false); }}>Services</li>
            <li className="cursor-pointer" onClick={() => { router.push('/careers'); setMobileMenuOpen(false); }}>Careers</li>
            <li className="cursor-pointer" onClick={() => { router.push('/contact'); setMobileMenuOpen(false); }}>Contact</li>
          </ul>
        </div>
      )}
    </>
  );
}
