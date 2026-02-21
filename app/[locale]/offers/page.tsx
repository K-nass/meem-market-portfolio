import { getTranslations } from 'next-intl/server';
import OffersHero from '@/app/components/Offers/OffersHero';
import LocationFilter from '@/app/components/Offers/LocationFilter';
import OfferCard from '@/app/components/Offers/OfferCard';
import WhyChooseSection from '@/app/components/Offers/WhyChooseSection';
import { offersService } from '@/app/services/offers';
import { locationsService } from '@/app/services/locations';
import { categoriesService } from '@/app/services/categories';

interface OffersPageProps {
  searchParams: Promise<{
    location?: string;
    branch?: string;
    category?: string;
  }>;

}

export default async function OffersPage({ searchParams }: OffersPageProps) {
  const { location, branch, category } = await searchParams;

  const [offersData, locationsData, categoriesData] = await Promise.all([
    offersService.getOffers({
      branch_slug: branch,
      country_slug: location,
      category_slug: category,
    }),

    locationsService.getLocations(),
    categoriesService.getCategories(),
  ])

  const currrentLocation = locationsData.data.find(l => l.slug === location);
  const t = await getTranslations('offersPage');

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
            locationLabel={t('filter.locationLabel')}
            branchLabel={t('filter.branchLabel')}
            categoryLabel={t('filter.categoryLabel')}
            locations={locationsData.data}
            categories={categoriesData.data}
          />


        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {offersData?.data && offersData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
            {offersData.data.map((offer) => (
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
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="mb-4 text-slate-300">
              <span className="material-symbols-outlined text-6xl">search_off</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">
              {t('offers.noOffers.title')}
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {t('offers.noOffers.description')}
            </p>
          </div>
        )}

        <WhyChooseSection title={t('whyChoose.title')} features={features} />
      </section>

    </main>
  );
}
