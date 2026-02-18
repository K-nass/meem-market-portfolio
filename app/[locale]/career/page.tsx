import { getTranslations } from 'next-intl/server';
import CareerHero from '@/app/components/Career/CareerHero';
import StatsSection from '@/app/components/Career/StatsSection';
import JobCard from '@/app/components/Career/JobCard';
import TalentPoolCTA from '@/app/components/Career/TalentPoolCTA';
import { careersService } from '@/app/services/careers';

export default async function CareerPage() {
  const t = await getTranslations('careerPage');

  // Fetch careers from API
  const careersData = await careersService.getCareers();

  return (
    <main>
      <CareerHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        description={t('hero.description')}
        primaryButtonText={t('hero.primaryButton')}
        imageAlt={t('hero.imageAlt')}
      />

      {/* Job Listings Section */}
      <section className="py-20 bg-background-light" id="jobs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="text-right">
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {t('jobListings.title')}
              </h2>
              <div className="h-1.5 w-24 bg-gold rounded-full"></div>
            </div>
            <div className="hidden md:block">
              <p className="text-secondary-text font-medium">
                {t('jobListings.subtitle')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {careersData.data.map((career, index) => (
              <JobCard
                key={career.slug}
                variant={index === 0 ? 'large' : index === 1 ? 'vertical' : undefined}
                title={career.title}
                badge={career.title}
                badgeColor={index === 0 ? 'blue' : index === 1 ? 'orange' : index === 2 ? 'green' : 'gold'}
                workType={career.type}
                location={career.location}
                description={career.description}
                requirements={career.requirements}
                icon={index === 0 ? 'video' : index === 2 ? 'support' : index === 3 ? 'cashier' : undefined}
                buttonText={t('jobListings.viewDetails')}
                slug={career.slug}
              />
            ))}
          </div>
        </div>
      </section>

      <TalentPoolCTA
        title={t('talentPool.title')}
        description={t('talentPool.description')}
        email={t('talentPool.email')}
        buttonText={t('talentPool.button')}
      />
    </main>
  );
}