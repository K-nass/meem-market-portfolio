'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Branch } from '@/app/types/branch';
import { branches, locations } from '@/app/data/branches';
import StepIndicator from './StepIndicator';
import BranchSelectionStep from './BranchSelectionStep';
import ActionSelectionStep from './ActionSelectionStep';
import LocationMapView from './LocationMapView';
import ContactSocialView from './ContactSocialView';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
  locale: string;
}

export default function LocationModal({ isOpen, onClose, locationId, locale }: LocationModalProps) {
  const router = useRouter();
  const t = useTranslations('modal');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedAction, setSelectedAction] = useState<'map' | 'contact' | 'offers' | null>(null);

  // Get location and branches data
  const location = locations.find((loc) => loc.id === locationId);
  const locationBranches = branches.filter((branch) => branch.locationId === locationId);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      setSelectedBranch(null);
      setSelectedAction(null);
    }
  }, [isOpen]);

  // Handle branch selection
  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    setCurrentStep(2);
  };

  // Handle action selection
  const handleActionSelect = (action: 'map' | 'contact' | 'offers') => {
    if (action === 'offers' && selectedBranch && location) {
      // Construct URL with locale, location name, and branch name
      const locationName = location.name[locale as 'en' | 'ar'];
      const branchName = selectedBranch.name[locale as 'en' | 'ar'];
      const url = `/${locale}/offers?location=${encodeURIComponent(locationName)}&branch=${encodeURIComponent(branchName)}`;
      
      // Close modal and redirect
      onClose();
      router.push(url);
    } else {
      // Show the selected view
      setSelectedAction(action);
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (selectedAction) {
      setSelectedAction(null);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedBranch(null);
    }
  };
  // Handle escape key press
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (selectedAction || currentStep === 2) {
          handleBack();
        } else {
          onClose();
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, selectedAction, currentStep]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle backdrop click
  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-y-auto animate-scaleIn md:max-h-[85vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label={t('closeModal')}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Back button - show when on step 2 or viewing an action */}
        {(currentStep === 2 || selectedAction) && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={t('goBack')}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Modal content */}
        <div className="p-6 md:p-8">
          {/* Step indicator - only show when not viewing an action */}
          {!selectedAction && (
            <div className="mb-6">
              <StepIndicator currentStep={currentStep} locale={locale} />
            </div>
          )}

          {/* Step 1: Branch Selection */}
          {currentStep === 1 && !selectedAction && (
            <BranchSelectionStep
              branches={locationBranches}
              onBranchSelect={handleBranchSelect}
              locale={locale}
            />
          )}

          {/* Step 2: Action Selection */}
          {currentStep === 2 && !selectedAction && (
            <ActionSelectionStep
              onActionSelect={handleActionSelect}
              locale={locale}
            />
          )}

          {/* Action Views */}
          {selectedAction === 'map' && selectedBranch && (
            <LocationMapView branch={selectedBranch} locale={locale} />
          )}

          {selectedAction === 'contact' && selectedBranch && (
            <ContactSocialView branch={selectedBranch} locale={locale} />
          )}
        </div>
      </div>
    </div>
  );
}
