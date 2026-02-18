import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <span className="material-icons text-primary text-8xl">work_off</span>
        </div>
        <h1 className="text-4xl font-black text-gray-800 mb-4">الوظيفة غير موجودة</h1>
        <p className="text-secondary-text text-lg mb-8">
          عذراً، لم نتمكن من العثور على الوظيفة المطلوبة
        </p>
        <Link
          href="/career"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
        >
          <span className="material-icons">arrow_back</span>
          العودة إلى الوظائف
        </Link>
      </div>
    </div>
  );
}
