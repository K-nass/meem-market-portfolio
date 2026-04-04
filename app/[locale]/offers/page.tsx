import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.offers' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  };
}
import OffersHero from '@/app/components/Offers/OffersHero';
import LocationFilter from '@/app/components/Offers/LocationFilter';
import OfferCard from '@/app/components/Offers/OfferCard';
import WhyChooseSection from '@/app/components/Offers/WhyChooseSection';
import { offersService } from '@/app/services/offers';
import { locationsService } from '@/app/services/locations';
import { categoriesService } from '@/app/services/categories';
import { Link } from '@/i18n/navigation';

interface OffersPageProps {
  searchParams: Promise<{
    location?: string;
    branch?: string;
    category?: string;
    page?: string;
  }>;

}

export default async function OffersPage({ searchParams }: OffersPageProps) {
  const { location, branch, category, page } = await searchParams;
  const parsedPage = Number.parseInt(page || '1', 10);
  const safePage = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const [offersData, locationsData, categoriesData] = await Promise.all([
    offersService.getOffers({
      branch_slug: branch,
      category_slug: category,
      page: safePage,
    }),

    locationsService.getLocations(),
    categoriesService.getCategories(),
  ])

  const offerBooks = Array.from(
    offersData.data.reduce((acc, offer) => {
      const categoryId = offer.offer_category.id;
      const existing = acc.get(categoryId);

      if (!existing) {
        acc.set(categoryId, offer);
        return acc;
      }

      const existingRank = existing.offer_category.sort_order ?? existing.sort_order;
      const nextRank = offer.offer_category.sort_order ?? offer.sort_order;
      if (nextRank < existingRank) {
        acc.set(categoryId, offer);
      }

      return acc;
    }, new Map<number, (typeof offersData.data)[number]>()).values()
  ).sort((a, b) => {
    const aRank = a.offer_category.sort_order ?? a.sort_order;
    const bRank = b.offer_category.sort_order ?? b.sort_order;
    return aRank - bRank;
  });

  const hasPagination = offersData.meta.last_page > 1;
  const buildPageHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (branch) params.set('branch', branch);
    if (category) params.set('category', category);
    params.set('page', String(targetPage));
    return `?${params.toString()}`;
  };

  const currrentLocation = locationsData.data.find(l => l.slug === location);
  const currentBranch = currrentLocation?.branches.find(b => b.slug === branch);
  const t = await getTranslations('offersPage');
  const { locale } = await (async () => {
    const { getLocale } = await import('next-intl/server');
    return { locale: await getLocale() };
  })();

  const countryName = currrentLocation
    ? (locale === 'ar' ? currrentLocation.name_ar : currrentLocation.name_en)
    : location;
  const branchName = currentBranch
    ? (locale === 'ar' ? currentBranch.name_ar : currentBranch.name_en)
    : branch;

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
          country={countryName}
          branch={branchName}
        />)}

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
          <LocationFilter
            key={`${location || ''}-${branch || ''}-${category || ''}`}
            locationLabel={t('filter.locationLabel')}
            branchLabel={t('filter.branchLabel')}
            categoryLabel={t('filter.categoryLabel')}
            locations={locationsData.data}
            categories={categoriesData.data}
            initialLocationSlug={location}
            initialBranchSlug={branch}
            initialCategorySlug={category}
          />


        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {offerBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
            {offerBooks.map((offer) => (
              <OfferCard
                key={offer.id}
                variant="large"
                badge={offer.offer_category.title}
                badgeColor="gold"
                title={offer.offer_category.title}
                description={offer.offer_category.branch.name_ar}
                image={offer.offer_category.cover_image || offer.image}
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

        {hasPagination && (
          <div className="mt-10 flex items-center justify-center gap-3">
            {offersData.meta.current_page > 1 ? (
              <Link
                href={buildPageHref(offersData.meta.current_page - 1)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {locale === 'ar' ? 'السابق' : 'Previous'}
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg border border-slate-200 text-slate-400">
                {locale === 'ar' ? 'السابق' : 'Previous'}
              </span>
            )}

            <span className="px-4 py-2 rounded-lg bg-primary text-white font-semibold">
              {offersData.meta.current_page} / {offersData.meta.last_page}
            </span>

            {offersData.meta.current_page < offersData.meta.last_page ? (
              <Link
                href={buildPageHref(offersData.meta.current_page + 1)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                {locale === 'ar' ? 'التالي' : 'Next'}
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-lg border border-slate-200 text-slate-400">
                {locale === 'ar' ? 'التالي' : 'Next'}
              </span>
            )}
          </div>
        )}

        <WhyChooseSection title={t('whyChoose.title')} features={features} />
      </section>

    </main>
  );
}
