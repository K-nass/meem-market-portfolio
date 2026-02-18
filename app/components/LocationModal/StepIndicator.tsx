'use client';

import { useTranslations } from 'next-intl';

interface StepIndicatorProps {
  currentStep: 1 | 2;
  locale: string;
}

export default function StepIndicator({ currentStep, locale }: StepIndicatorProps) {
  const t = useTranslations('modal');

  const steps = [
    { number: 1, label: t('step1') },
    { number: 2, label: t('step2') }
  ];

  const getStepClass = (stepNumber: number): string => {
    const baseClasses = 'flex items-center gap-2 transition-all duration-200';
    
    if (stepNumber < currentStep) {
      return `${baseClasses} text-green-600`;
    } else if (stepNumber === currentStep) {
      return `${baseClasses} text-primary font-semibold`;
    } else {
      return `${baseClasses} text-gray-400`;
    }
  };

  const getNumberClass = (stepNumber: number): string => {
    const baseClasses = 'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200';
    
    if (stepNumber < currentStep) {
      return `${baseClasses} bg-green-100 text-green-600`;
    } else if (stepNumber === currentStep) {
      return `${baseClasses} bg-primary text-white`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-400`;
    }
  };

  const getConnectorClass = (stepNumber: number): string => {
    const baseClasses = 'h-0.5 transition-all duration-200';
    
    if (stepNumber < currentStep) {
      return `${baseClasses} bg-green-600 w-12 md:w-16`;
    } else {
      return `${baseClasses} bg-gray-200 w-12 md:w-16`;
    }
  };

  return (
    <div className="w-full py-4 px-4 md:px-6">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={getStepClass(step.number)}>
              <div className={getNumberClass(step.number)}>
                {step.number < currentStep ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className="text-sm whitespace-nowrap">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`mx-2 ${getConnectorClass(step.number)}`} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical layout */}
      <div className="flex md:hidden flex-col gap-3">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col">
            <div className={getStepClass(step.number)}>
              <div className={getNumberClass(step.number)}>
                {step.number < currentStep ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className="text-sm">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`${locale === 'ar' ? 'mr-4' : 'ml-4'} mt-1 mb-1`}>
                <div className={`w-0.5 h-6 transition-all duration-200 ${
                  step.number < currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
