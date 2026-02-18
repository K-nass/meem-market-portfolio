import { getTranslations } from 'next-intl/server';
import OffersHero from '@/app/components/Offers/OffersHero';
import LocationFilter from '@/app/components/Offers/LocationFilter';
import OfferCard from '@/app/components/Offers/OfferCard';
import WhyChooseSection from '@/app/components/Offers/WhyChooseSection';

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
          <OfferCard
            variant="large"
            badge={t('offers.seasonal.badge')}
            badgeColor="gold"
            title={t('offers.seasonal.title')}
            description={t('offers.seasonal.description')}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAhJ9MkWIyFvf1Eo_JylUxQug_jK6CzAkSA-FLlUCUkUxaXo8U2NLEDWTIM0ymi2R5WE5wPWJ0QOLDhT6IfO8uTf1sVrKQNqxgF-UtPwrq73zppoViesv5fcwPhwvqHpn81rrTgR251Z95N5b4gsqpS_Rn1uwP4MAT6heKP-QRTizkG9sGkGFlsK4ayvMkmpor8m48fPplCbQ9vUR2oCQNzFvbtpw84Kr_WAkSIMWOiNuIf0Wjdq1MqzEVKVfaMWVuHUUSvYMx4-0wT"
            buttonText={t('offers.seasonal.button')}
            offerId="1"
          />

          <OfferCard
            variant="medium"
            badge={t('offers.fresh.badge')}
            badgeColor="accent"
            title={t('offers.fresh.title')}
            description={t('offers.fresh.description')}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDstQgPYRgD3jMEycgNGNnlH6IAk7Dp5eURjgdFS8XqGm9QGP-vnrJf7QXu8mXZ__34LWhh3USITuPzScjN4_lJ7sqvMalq19yT-_XjQOzX6efYv8eq6R-bLAW_c3s3B3RS-AjJIyuwnj7MineGMbJDYLb3lEt3ZOobbQn-klPJW8aPrfclOa6MNzzD6bJwDE8IdZKvlQ61wmJQ0luWYOtTcSJJnWk22oaOgUCY8XDDWZtrbwoqEH9uzsQz3-D9qXMcGW7f7LAXkCti"
            icon="eco"
            buttonText={t('offers.fresh.button')}
            offerId="2"
          />

          <OfferCard
            variant="tech"
            badge={t('offers.tech.badge')}
            title={t('offers.tech.title')}
            description={t('offers.tech.description')}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDjukap4AJlxHMsFnEFChpCL37LSZNdagALDdNPn_xSSSm1MXX8YY-w2U9tT_TjDZgFJsYGwzWBG6FCMus8L9Dgr1_R74EiRbb9KOFTE-AyomMkfcnhAw7vDie78giaym2RBQgEamIRNf1TR07WVM74pkWrQr9fTkzm8_ItPWAzQYgzupJTFUQ0Xyfu46mRo4U9qlrYHOV5OjFaso3m-Z912DyXF2FQ_rVIUrOnvZVMgFLaC49nCTUa0y880u7prF8zSy9fU3szHalF"
            icon="devices"
            offerId="3"
          />

          <OfferCard
            variant="minimal"
            badge={t('offers.household.badge')}
            title={t('offers.household.title')}
            description={t('offers.household.description')}
            icon="home_repair_service"
            progress={75}
            progressLabel={t('offers.household.progressLabel')}
            buttonText={t('offers.household.button')}
          />

          <OfferCard
            variant="large"
            badge={t('offers.gourmet.badge')}
            badgeColor="gold"
            title={t('offers.gourmet.title')}
            description={t('offers.gourmet.description')}
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuDqBHCC6RO8N5A-jhAoi3ciJzI6g46s9jf7j41Nhuh7fa05ATjtOzNafdmBi4ootZL-zuP6laVw7HZEJLV0i1WWWDgy59BFdIj0J34futFpzdcfBiVQza4WGqyMT8bXtgacr0EAQYJTKVxC6gdzho_7fpHKWo_rKZGL5Gv35jn6q8OPH_enUTEM7lX11YkdQ9fQseazDtWIs8KyaG3W32EQKJSvopTbGWEybl234leR0JiMnlq4FIuZ-aJvFLcA2040Fb0jGmnYTLL4"
            buttonText={t('offers.gourmet.button')}
          />
        </div>

        <WhyChooseSection title={t('whyChoose.title')} features={features} />
      </section>
    </main>
  );
}
