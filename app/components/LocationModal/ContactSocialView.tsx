'use client';

import { Branch } from '@/app/types/branch';
import { useTranslations } from 'next-intl';
import { Phone, Clock, Instagram, Twitter, Facebook, MessageCircle } from 'lucide-react';

interface ContactSocialViewProps {
  branch: Branch;
  locale: string;
}

interface SocialLink {
  platform: string;
  icon: any;
  url: string;
  color: string;
}

export default function ContactSocialView({ branch, locale }: ContactSocialViewProps) {
  const t = useTranslations('modal');

  // Social media links with brand colors and Lucide icons
  const socialLinks: SocialLink[] = [
    {
      platform: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/meemmarket',
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500'
    },
    {
      platform: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/meemmarket',
      color: 'bg-black'
    },
    {
      platform: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/meemmarket',
      color: 'bg-blue-600'
    },
    {
      platform: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/966500000000',
      color: 'bg-green-500'
    },
    {
      platform: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: 'https://tiktok.com/@meemmarket',
      color: 'bg-black'
    }
  ];

  const formatHours = (open: string, close: string): string => {
    return `${open} - ${close}`;
  };

  return (
    <div className="contact-social-view">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {t('contactInfo')}
      </h2>

      {/* Contact Information Section */}
      <div className="contact-section space-y-4 mb-8">
        {branch.phone && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Phone className="w-5 h-5 text-primary" />
            <a
              href={`tel:${branch.phone}`}
              className="text-gray-800 font-medium hover:text-primary transition-colors duration-200"
            >
              {branch.phone}
            </a>
          </div>
        )}

        {branch.hours && (
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
            <p className="text-gray-800 font-medium">
              {formatHours(branch.hours.open, branch.hours.close)}
            </p>
          </div>
        )}
      </div>

      {/* Social Media Section with Decorative Background */}
      <div className="social-section relative">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 rounded-xl opacity-50 -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%)] -z-10" />
        
        <div className="relative p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">
            {t('followUs')}
          </h3>
          
          {/* Social Media Grid */}
          <div className="social-grid grid grid-cols-5 gap-4 justify-items-center">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-button ${link.color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-200 hover:shadow-lg`}
                  aria-label={link.platform}
                  title={link.platform}
                >
                  {typeof Icon === 'function' ? <Icon /> : <Icon className="w-6 h-6" />}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
