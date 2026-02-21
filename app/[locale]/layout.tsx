import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

import { getTranslations } from "next-intl/server";
import { API_BASE_URL } from "@/app/config/api";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'seo' });


    return {
        metadataBase: new URL(API_BASE_URL),
        title: {
            default: t('title'),
            template: t('titleTemplate'),
        },
        description: t('description'),
        keywords: t('keywords'),
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: '/en',
                ar: '/ar',
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: `./`,
            siteName: t('title'),
            locale: locale === 'ar' ? 'ar_SA' : 'en_US',
            type: 'website',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: t('title'),
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            images: ['/og-image.jpg'],
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const dir = locale === "ar" ? "rtl" : "ltr";

    // Check if current path is career page
    const isCareerPage = false; // Will be handled by career layout

    return (

        <html lang={locale} dir={dir}>
            <head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-pattern min-h-screen flex flex-col antialiased">
                <NextIntlClientProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

