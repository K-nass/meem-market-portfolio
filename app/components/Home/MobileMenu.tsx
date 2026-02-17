'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const firstNavItemRef = useRef<HTMLAnchorElement>(null);

  // Define navigation items array
  const navigationItems = [
    { key: 'home', href: '/' },
    { key: 'offers', href: '#' },
    { key: 'aboutUs', href: '#' },
    { key: 'ourProducts', href: '#' },
    { key: 'ourBranches', href: '/branches' },
    { key: 'careers', href: '/career' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Body scroll management - prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Focus management - set focus to first nav item when menu opens
  useEffect(() => {
    if (isOpen && firstNavItemRef.current) {
      firstNavItemRef.current.focus();
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Resize handler - close menu at desktop breakpoint
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce resize handler to avoid excessive calls
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 1024 && isOpen) {
          setIsOpen(false);
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Animation variants for overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Calculate slide direction based on locale
  const isRTL = locale === 'ar';
  const menuVariants = {
    hidden: { x: isRTL ? '100%' : '-100%' },
    visible: { x: '0%' }
  };

  return (
    <div>
      {/* Burger button */}
      <button 
        onClick={toggleMenu}
        className="lg:hidden p-2.5 text-gray-600 hover:text-primary transition-all duration-300 rounded-xl hover:bg-gray-100/80"
        aria-label={isOpen ? translations.close : translations.menu}
      >
        <span className="material-icons-outlined text-[24px]">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Overlay and Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              style={{ zIndex: 99998 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
            />

            {/* Menu Panel */}
            <motion.div
              className={`fixed top-0 h-full w-[280px] bg-white shadow-2xl overflow-y-auto ${
                isRTL ? 'right-0' : 'left-0'
              }`}
              style={{ zIndex: 99999 }}
              role="dialog"
              aria-modal="true"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{
                duration: 0.3,
                ease: isOpen ? 'easeOut' : 'easeIn'
              }}
            >
              {/* Logo */}
              <div className="flex items-center justify-center pt-6 pb-4 px-6 border-b border-gray-200">
                <img 
                  src="/meem-logo.png" 
                  alt="Meem Market" 
                  className="h-12 w-auto" 
                />
              </div>
              
              {/* Navigation Items */}
              <nav className="flex flex-col px-4 py-4">
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    ref={index === 0 ? firstNavItemRef : null}
                    className="relative px-4 py-3 text-base font-medium text-gray-700 hover:text-primary transition-all duration-300 group rounded-xl"
                  >
                    <span className="relative z-10">{translations[item.key as keyof typeof translations]}</span>
                    <span className="absolute inset-0 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
