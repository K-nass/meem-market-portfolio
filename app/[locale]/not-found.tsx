import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FileQuestion, ChevronLeft, Home } from 'lucide-react';


export default function LocalizedNotFound() {
    const t = useTranslations('common');

    return (
        <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh]">
            <div className="max-w-md w-full text-center bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-3xl mb-8 rotate-3">
                    <FileQuestion className="w-10 h-10 text-amber-500 -rotate-3" />
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                    {t('notFoundTitle')}
                </h1>

                <p className="text-slate-500 mb-10 leading-relaxed">
                    {t('notFoundMessage')}
                </p>

                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                >
                    <ChevronLeft className="w-5 h-5 rtl:hidden" />
                    <Home className="w-5 h-5" />
                    {t('goHome')}

                </Link>
            </div>
        </div>
    );
}


