import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { branchesService } from '@/app/services/branches';
import { transformBranchData } from '@/app/components/LocationModal/utils/transformBranchData';
import { Branch } from '@/app/types/branch';
import BranchesPageHeader from '@/app/components/Branches/BranchesPageHeader';
import BranchesContent from '@/app/components/Branches/BranchesContent';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.branches' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}

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

  // Fetch branches from API server-side
  let branches: Branch[];
  try {
    const branchesData = await branchesService.getBranches();
    branches = branchesData.data.map((item) => transformBranchData(item));
  } catch (error) {
    console.error('Error fetching branches:', error);
    // Return empty array on error - component will handle empty state
    branches = [];
  }

  return (
    <main className="min-h-screen bg-pattern">
      {/* Page Header */}
      <BranchesPageHeader
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 md:pb-12">
        <BranchesContent
          branches={branches}
          locale={locale as 'en' | 'ar'}
        />
      </div>
    </main>
  );
}
