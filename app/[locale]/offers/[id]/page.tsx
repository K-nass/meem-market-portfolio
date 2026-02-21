import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: OfferDetailPageProps): Promise<Metadata> {
    const { id } = await params;
    const offer = getOfferData(id);

    if (!offer) {
        return {
            title: 'Offer Not Found',
        };
    }

    return {
        title: offer.title,
        description: `${offer.category} - ${offer.branch}`,
        openGraph: {
            title: offer.title,
            description: `${offer.category} - ${offer.branch}`,
            images: offer.images.length > 0 ? [{ url: offer.images[0] }] : [],
        },
    };
}
import OfferDetailHero from '@/app/components/OfferDetails/OfferDetailHero';
import { OfferCategoryFilter, OfferImageGallery, RelatedOffers } from '@/app/components/OfferDetails';

interface OfferDetailPageProps {
    params: Promise<{
        locale: string;
        id: string;
    }>;
}

// Mock data - replace with actual data fetching
const getOfferData = (id: string) => {
    const offers: Record<string, any> = {
        '1': {
            id: '1',
            title: 'عروض سلة رمضان الخير',
            category: 'مستلزمات رمضان',
            categoryIcon: 'restaurant',
            location: 'المملكة العربية السعودية',
            branch: 'الرياض - العليا',
            status: 'عروض سارية الآن',
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuB2kJICBPplSugiGTYbPHtR9FNCF069NOOZ-dIfCyd6E1FnXLRGECgDd5_slqEQqNMwCFnewsO-pz2xQjTiSBd041rwrfkb18X4zEKF0WLvaLoflOJ0ko_pBctUvDJab8pHLIhy-eDh3MuRBWrTPH10dPyRJRX0wHIYh_E0aUEzdC2cc9-xMq6sz5qLcwRl5S-h8Fax8hM6zkjmoVUnBhEAq_cw4mIpN-A8RnXE0s5AaqRasS6LZ-2oW-q-WwT-cZN1HCNdzUrwSh5s',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAVCpHHT5Xlo2RtL1bndlbHK5-XASajCYA-DSZwI8rgcnjPAaGKojzBv29GDcNdjIE9Q64NtEiBHP19XUglNj77Negx0Htjt-0sZn3q4pL1wxqthPVrXoRG_1o_CMZTAfU42a9phuHGvnDJ0ZoKSOaLA11gzOY9pDSptfWesMTmtnUIGdiv0XD24Ys6KCiHnFXnLe7U3UWx0tV945PhadCvDYK6wHrjQtg6XWINORCcbPtI_p0BEDP71GGPNPVoQh9H3JlaRjzmaxQc',
            ],
        },
        '2': {
            id: '2',
            title: 'مهرجان الخضار والفواكه الطازجة',
            category: 'المنتجات الطازجة',
            categoryIcon: 'eco',
            location: 'المملكة العربية السعودية',
            branch: 'الرياض - العليا',
            status: 'عروض سارية الآن',
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBbaFIkqCsLx3bF2GGZHf4At07GKJGimrzI4r831Pau25o-79Am1vJq-09hGoq41BVgGC-bXCffRTbBTV6I85ClR2jlpMAGYl2MLjtBqvZM0LQk0kcEmX0DmpTcY9O04t-mOA69ZYiS_CfXZVpJMX2Jb2SH4mqijtTuEBjKFGXO8kQVATG-Ibocrm06BeSIQmRSEj6hhSiCoswUATfeFCsptljpwG7EranjbxqX-za_GpyyyRPBH2yACIRtLtn_o6sN5RNmExp35nT4',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuAgKDS-2EYzKzdG108StjhrcWAKAYwiLC-1yTVEiko0ElqDN_JBk87P02Y7BwyWmw9nb5B_AA7ErXlBf3AlXJZxii_VvoC_lDuuXzSe8FLnIRVxdDILYP4xORqvT5ylh_Xh1jiuClTmex1PmYHqE8A-QQKjD2juSHy2FuV77A3bFrXhhPP4KvXGQJPZMy7X6oPhompk8rhX-xONDMDOnvl6c-5CZlABAq9OvcVfN1TvInw0Kmr10kl5uAdAM_dYaJNagmrBkhXXKc3W',
            ],
        },
        '3': {
            id: '3',
            title: 'أحدث التقنيات بأسعار لا تقاوم',
            category: 'الأجهزة الإلكترونية',
            categoryIcon: 'devices',
            location: 'المملكة العربية السعودية',
            branch: 'الرياض - العليا',
            status: 'عروض سارية الآن',
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC-GumzhotWjDCYujf8ljVi03JKMvVKhgUJhny3bFbOfikVjblV8OTGpWXUvEkUZxO5socMjg6e2AsvQVsy4qHgubJzJIESkLlpukwfuiOSpWSy3Lvqi0lwQCzEg3iiem5UVLDiayrBN9ES-6lq3q9mNopIhDjIX8c8j4LHYn4wlVlqCkLgemFIqrvLM_lncH699mjo95ELT5K8-Nnd_2gDR8h_PSvE9LR-IzUSZ0ZYoMi7zp4HszUzokLiog-K_I_EuO2zPL-8dKyL',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDjMOPBMdb3fKsxoCp2ukRAck28dvQ9x_vCUFB_-0c55L0shj-GFFNVDLF3SmXl5cs1IqlQppHDyxM6mWS9lXl9Q_cI-eId-MhMxBphsKotWvKfJZpstJmXvrvjAzW823xFIAsdBB5lraGXFz-ViPHqe_G-zuNOqVZFbZkcOCOYzhvRIdijc2_C3IigFR3kI7274BwWZA0ajQfBSNngpXZrlvi3qL-skM5xEtZazB_JC-E6hvp1WLfWOQ8Ln_A8XuCveb6-mJYkRaEd',
            ],
        },
    };

    return offers[id] || null;
};

export default async function OfferDetailPage({ params }: OfferDetailPageProps) {
    const { id } = await params;
    const t = await getTranslations('offerDetailPage');

    const offer = getOfferData(id);

    if (!offer) {
        notFound();
    }

    const categories = [
        { id: 'all', label: t('categories.all'), icon: null },
        { id: 'ramadan', label: t('categories.ramadan'), icon: 'restaurant' },
        { id: 'fresh', label: t('categories.fresh'), icon: 'eco' },
        { id: 'electronics', label: t('categories.electronics'), icon: 'devices' },
        { id: 'household', label: t('categories.household'), icon: 'countertops' },
        { id: 'cleaning', label: t('categories.cleaning'), icon: 'sanitizer' },
    ];

    return (
        <main className="bg-background-light min-h-screen">
            <OfferDetailHero
                title={t('title')}
                location={offer.location}
                branch={offer.branch}
                status={offer.status}
            />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <OfferImageGallery
                    title={offer.title}
                    category={offer.category}
                    images={offer.images}
                />
            </section>
        </main>
    );
}
