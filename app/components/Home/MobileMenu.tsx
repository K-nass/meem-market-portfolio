'use client';

import { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/navigation';

interface MobileMenuProps {
  translations: {
    home: string;
    offers: string;
    aboutUs: string;
    ourProducts: string;
    ourBranches: string;
    careers: string;
    menu: string;
    close: string;
  };
  locale: string;
}

export default function MobileMenu({ translations, locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'offers', href: '/offers' },
    { key: 'aboutUs', href: '/#about' },
    { key: 'ourProducts', href: '/#products' },
    { key: 'ourBranches', href: '/branches' },
    { key: 'careers', href: '/career' },
  ];

  // Close on outside click (mouse + touch)
  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('touchstart', handleOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="lg:hidden relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 text-gray-600 hover:text-primary transition-colors rounded-xl hover:bg-gray-100/80"
        aria-label={isOpen ? translations.close : translations.menu}
        aria-expanded={isOpen}
      >
        <span className="material-icons-outlined text-[24px]">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[99999] ${
            locale === 'ar' ? 'left-0' : 'right-0'
          }`}
        >
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {translations[item.key as keyof typeof translations]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
