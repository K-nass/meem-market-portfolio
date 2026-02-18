import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <span className="material-symbols-outlined text-9xl text-slate-300">
            search_off
          </span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          العرض غير موجود
        </h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          عذراً، العرض الذي تبحث عنه غير متوفر أو تم إزالته.
        </p>
        <Link
          href="/offers"
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
          العودة إلى العروض
        </Link>
      </div>
    </div>
  );
}
