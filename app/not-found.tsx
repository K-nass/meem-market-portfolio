import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-8">
                    <FileQuestion className="w-12 h-12 text-blue-600" />
                </div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    404 - Page Not Found
                </h1>
                <p className="text-slate-600 mb-10 text-lg">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-primary/20 active:scale-95"
                >
                    <Home className="w-5 h-5" />
                    Return Home
                </Link>
            </div>
        </div>
    );
}
