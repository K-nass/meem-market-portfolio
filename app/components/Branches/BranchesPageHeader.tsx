'use client';

interface BranchesPageHeaderProps {
  title: string;
  subtitle: string;
}

export default function BranchesPageHeader({ title, subtitle }: BranchesPageHeaderProps) {
  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-16">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
