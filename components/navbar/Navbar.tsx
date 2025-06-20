"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../acernityui/navbar-menu";
import { Link, MenuIcon, X } from "lucide-react";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ✅ Desktop Navbar - Hidden on Mobile */}
      <div className={cn("hidden md:block fixed top-10 inset-x-0 max-w-3xl mx-auto z-40", className)}>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Home" href="/" />
          <MenuItem setActive={setActive} active={active} item="Careers" href="/careers" />
          <MenuItem setActive={setActive} active={active} item="Services" href="/#services">
            {/* <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/services">Web Development</HoveredLink>
              <HoveredLink href="/services">Interface Design</HoveredLink>
              <HoveredLink href="/services">SEO</HoveredLink>
              <HoveredLink href="/services">Branding</HoveredLink>
            </div> */}
          </MenuItem>

          <div className="px-2 flex items-center">
            <Image src="./img/About Us (6).png" alt="Company Logo" width={120} height={40} className="object-contain relative -mt-1" />
          </div>

          <MenuItem setActive={setActive} active={active} item="Products" href="/#product">
       
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Blog" href="/" />
          <MenuItem setActive={setActive} active={active} item="Contact Us" href="/contact" />
        </Menu>
      </div>

      {/* ✅ Mobile Navbar Floating Button */}
      {!mobileMenuOpen && (
        <div className="flex md:hidden bg-black bg-opacity-100 p-4 rounded-xl items-center justify-between shadow-lg fixed top-6 left-4 right-4 z-50">
           <Image src="./img/About Us (6).png" alt="Company Logo" width={120} height={40} className="object-contain relative -mt-1" />
           <button onClick={() => setMobileMenuOpen(true)}>
            <MenuIcon className="text-white w-8 h-8" />
          </button>
        </div>
      )}

      {/* ✅ Full-Screen Mobile Navbar */}
      {mobileMenuOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-90 text-white p-8 z-50 flex flex-col md:hidden">
    {/* Header */}
    <div className="flex items-center justify-between mb-12">
      <Image src="./img/About Us (2).png" alt="Company Logo" width={120} height={40} className="object-contain relative -mt-1" />
      <X className="w-8 h-8 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
    </div>

    {/* Menu Links */}
    <ul className="space-y-8 text-lg">
      <li className="cursor-pointer" onClick={() => { window.location.href = '/'; setMobileMenuOpen(false); }}>Home</li>

      <li>
        <details className="cursor-pointer">
          <summary className="flex justify-between items-center"  onClick={() => { window.location.href = '/#products'; setMobileMenuOpen(false); }}>Products</summary>
        
        </details>
      </li>

      <li>
        <details className="cursor-pointer">
          <summary className="flex justify-between items-center"  onClick={() => { window.location.href = '/#services'; setMobileMenuOpen(false); }}>Services</summary>
         
        </details>
      </li>

      <li className="cursor-pointer" onClick={() => { window.location.href = '/careers'; setMobileMenuOpen(false); }}>Careers</li>
      <li className="cursor-pointer" onClick={() => { window.location.href = '/contact'; setMobileMenuOpen(false); }}>Contact</li>
    </ul>
  </div>
)}

    </>
  );
}
