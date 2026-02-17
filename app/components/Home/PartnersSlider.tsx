'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function PartnersSlider() {
    const t = useTranslations('partners');

    const partners = [
        { name: 'Alizz Furniture', logo: '/companies-logo/Alizz-furniture-logo-1024x683.webp' },
        { name: 'Awanik', logo: '/companies-logo/Awanik-logo-1024x683.webp' },
        { name: 'Bema', logo: '/companies-logo/Bema-logo-1024x683.webp' },
        { name: 'Clemance', logo: '/companies-logo/Clemance-logox-1024x683.webp' },
        { name: 'Dream Reem', logo: '/companies-logo/Dream-reem-logo-1024x683.webp' },
        { name: 'Electovision', logo: '/companies-logo/Electovision-logo-1024x683.webp' },
        { name: 'Great Shave', logo: '/companies-logo/Great-shave-logo-1024x683.webp' },
        { name: 'Maxi Mooth', logo: '/companies-logo/Maxi-mooth-logo-1024x683.webp' },
        { name: 'Mila', logo: '/companies-logo/Mila-logo-1024x683.webp' },
        { name: 'Rabco', logo: '/companies-logo/Rabco-logo-1024x683.webp' },
        { name: 'Youmma', logo: '/companies-logo/Youmma-logo-1024x683.png' },
        { name: 'Zaina', logo: '/companies-logo/Zaina-logo-1024x683.webp' },
    ];

    return (
        <section className="py-16 bg-white bg-pattern overflow-hidden border border-amber-50">
            {/* <div className="max-w-7xl mx-auto px-6"> */}
                {/* Section Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary-dark mb-2 font-arabic">
                        {t('title')}
                    </h2>
                    <p className="text-secondary-text text-sm">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={50}
                    slidesPerView={4}
                    loop={true}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    speed={6000}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                        1280: {
                            slidesPerView: 6,
                        },
                    }}
                    className="partners-swiper"
                >
                    {partners.map((partner, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center justify-center h-32">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                                        className="object-contain scale-150"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            {/* </div> */}
        </section>
    );
}
