import { getTranslations } from 'next-intl/server';
import CareerHero from '@/app/components/Career/CareerHero';
import StatsSection from '@/app/components/Career/StatsSection';
import JobCard from '@/app/components/Career/JobCard';
import TalentPoolCTA from '@/app/components/Career/TalentPoolCTA';

export default async function CareerPage() {
  const t = await getTranslations('careerPage');
  
  const stats = [
    { value: '500+', label: t('stats.employees') },
    { value: '15+', label: t('stats.branches') },
    { value: '100%', label: t('stats.safeEnvironment') },
    { value: '24/7', label: t('stats.support') },
  ];

  return (
    <main>
      <CareerHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        description={t('hero.description')}
        primaryButtonText={t('hero.primaryButton')}
        imageAlt={t('hero.imageAlt')}
      />

      <StatsSection stats={stats} />

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
            <JobCard
              variant="large"
              title={t('jobListings.jobs.videoEditor.title')}
              badge={t('jobListings.jobs.videoEditor.badge')}
              badgeColor="blue"
              workType={t('jobListings.fullTime')}
              location={t('jobListings.jobs.videoEditor.location')}
              description={t('jobListings.jobs.videoEditor.description')}
              icon="video"
              buttonText={t('jobListings.viewDetails')}
            />

            <JobCard
              variant="vertical"
              title={t('jobListings.jobs.salesperson.title')}
              badge={t('jobListings.jobs.salesperson.badge')}
              badgeColor="orange"
              workType={t('jobListings.fullTime')}
              location={t('jobListings.jobs.salesperson.location')}
              requirements={t('jobListings.jobs.salesperson.requirements')}
              buttonText={t('jobListings.viewDetails')}
            />

            <JobCard
              title={t('jobListings.jobs.customerService.title')}
              badge={t('jobListings.jobs.customerService.badge')}
              badgeColor="green"
              workType={t('jobListings.fullTime')}
              location={t('jobListings.jobs.customerService.location')}
              icon="support"
              postedDate={t('jobListings.jobs.customerService.postedDate')}
              buttonText={t('jobListings.viewDetails')}
            />

            <JobCard
              title={t('jobListings.jobs.cashier.title')}
              badge={t('jobListings.jobs.cashier.badge')}
              badgeColor="gold"
              workType={t('jobListings.fullTime')}
              location={t('jobListings.jobs.cashier.location')}
              icon="cashier"
              postedDate={t('jobListings.jobs.cashier.postedDate')}
              buttonText={t('jobListings.viewDetails')}
            />
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