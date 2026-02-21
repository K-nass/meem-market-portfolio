import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { careersService } from '@/app/services/careers';
import { MapPin, FileText, CheckCircle, Send } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await careersService.getCareerBySlug(slug);
    const career = response.data;

    return {
      title: career.title,
      description: career.description.substring(0, 160),
      openGraph: {
        title: career.title,
        description: career.description.substring(0, 160),
      },
    };
  } catch (error) {
    return {
      title: 'Career Not Found',
    };
  }
}

interface CareerDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const t = await getTranslations('careerDetailPage');

  let career;
  try {
    const response = await careersService.getCareerBySlug(slug);
    career = response.data;
  } catch (error) {
    notFound();
  }

  return (
    <main className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="text-sm font-semibold">{career.type}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{career.title}</h1>
            <div className="flex items-center justify-center gap-2 text-lg">
              <MapPin className="text-gold" size={20} />
              <span>{career.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Job Description */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <FileText className="text-primary" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{t('description')}</h2>
            </div>
            <p className="text-secondary-text text-lg leading-relaxed">{career.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-gold" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{t('requirements')}</h2>
            </div>
            <p className="text-secondary-text text-lg leading-relaxed">{career.requirements}</p>
          </div>

          {/* Apply Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <span className="flex items-center justify-center gap-2">
                <Send size={20} />
                {t('applyNow')}
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
