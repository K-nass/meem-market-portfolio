import { getTranslations } from 'next-intl/server';
import OffersHero from '@/app/components/Offers/OffersHero';
import LocationFilter from '@/app/components/Offers/LocationFilter';
import OfferCard from '@/app/components/Offers/OfferCard';
import WhyChooseSection from '@/app/components/Offers/WhyChooseSection';
import { offersService } from '@/app/services/offers';

interface OffersPageProps {
  searchParams: Promise<{
    location?: string;
    branch?: string;
  }>;
}

export default async function OffersPage({ searchParams }: OffersPageProps) {
  const t = await getTranslations('offersPage');

  // Get location and branch from URL params
  const { location, branch } = await searchParams;

  console.log('Selected filters:', { location, branch });

  // Fetch offers from API
  let offersData = null;
  try {
    offersData = await offersService.getOffers();
    console.log('Fetched offers:', offersData);
  } catch (error) {
    console.error('Failed to fetch offers:', error);
  }
  
  const features = [
    {
      icon: 'verified_user',
      title: t('whyChoose.features.quality.title'),
      description: t('whyChoose.features.quality.description'),
    },
    {
      icon: 'local_shipping',
      title: t('whyChoose.features.delivery.title'),
      description: t('whyChoose.features.delivery.description'),
    },
    {
      icon: 'workspace_premium',
      title: t('whyChoose.features.pricing.title'),
      description: t('whyChoose.features.pricing.description'),
    },
  ];

  return (
    <main>
      {location && branch && (
      <OffersHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        description={t('hero.description')}
        country={location}
        branch={branch}
      />)}

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
          <LocationFilter
            countryLabel={t('filter.countryLabel')}
            cityLabel={t('filter.cityLabel')}
            branchLabel={t('filter.branchLabel')}
            countries={[
              t('filter.countries.0'),
              t('filter.countries.1'),
              t('filter.countries.2'),
            ]}
            cities={[
              t('filter.cities.0'),
              t('filter.cities.1'),
              t('filter.cities.2'),
            ]}
            branches={[
              t('filter.branches.0'),
              t('filter.branches.1'),
              t('filter.branches.2'),
            ]}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
          {offersData?.data.map((offer) => (
            <OfferCard
              key={offer.id}
              variant="large"
              badge={offer.offer_category.title}
              badgeColor="gold"
              title={offer.title}
              description={offer.offer_category.branch.name_ar}
              image={offer.image}
              buttonText={t('offers.seasonal.button')}
              offerId={offer.id.toString()}
            />
          ))}
        </div>

        <WhyChooseSection title={t('whyChoose.title')} features={features} />
      </section>
    </main>
  );
}
