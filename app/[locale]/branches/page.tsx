import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { branches } from '@/app/data/branches';
import BranchesPageHeader from '@/app/components/Branches/BranchesPageHeader';
import BranchesContent from '@/app/components/Branches/BranchesContent';

interface BranchesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BranchesPage({ params }: BranchesPageProps) {
  const { locale } = await params;

  // Validate locale parameter
  const validLocales = ['ar', 'en'];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  // Fetch translations for branches page
  const t = await getTranslations('branches');

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <BranchesPageHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <BranchesContent
          branches={branches}
          locale={locale as 'en' | 'ar'}
        />
      </div>
    </main>
  );
}
