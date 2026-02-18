'use client';

import { useTranslations } from 'next-intl';
import { MapPin, Phone, Tag } from 'lucide-react';

interface ActionSelectionStepProps {
  onActionSelect: (action: 'map' | 'contact' | 'offers') => void;
  locale: string;
}

export default function ActionSelectionStep({
  onActionSelect,
  locale,
}: ActionSelectionStepProps) {
  const t = useTranslations('modal');

  const actions = [
    {
      id: 'map' as const,
      icon: MapPin,
      title: t('actions.map.title'),
      description: t('actions.map.description'),
      color: 'bg-blue-100 group-hover:bg-blue-500',
      iconColor: 'text-blue-600 group-hover:text-white',
    },
    {
      id: 'contact' as const,
      icon: Phone,
      title: t('actions.contact.title'),
      description: t('actions.contact.description'),
      color: 'bg-green-100 group-hover:bg-green-500',
      iconColor: 'text-green-600 group-hover:text-white',
    },
    {
      id: 'offers' as const,
      icon: Tag,
      title: t('actions.offers.title'),
      description: t('actions.offers.description'),
      color: 'bg-purple-100 group-hover:bg-purple-500',
      iconColor: 'text-purple-600 group-hover:text-white',
    },
  ];

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, actionId: 'map' | 'contact' | 'offers') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActionSelect(actionId);
    }
  };

  return (
    <div className="action-selection">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {t('chooseAction')}
      </h2>

      <div className="action-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onActionSelect(action.id)}
              onKeyDown={(e) => handleKeyDown(e, action.id)}
              className="action-card group relative p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl shadow-md hover:shadow-xl hover:border-primary hover:scale-[1.03] transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`${action.title}: ${action.description}`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full transition-colors duration-200 ${action.color}`}>
                  <Icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-200 ${action.iconColor}`} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
