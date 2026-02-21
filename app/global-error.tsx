'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { AlertCircle, RefreshCw } from 'lucide-react';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // This is where you would log to an external service like Sentry or Axiom
        console.error('CRITICAL_GLOBAL_ERROR:', error);
    }, [error]);

    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-slate-50 flex items-center justify-center p-4`}>
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                        <AlertCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 mb-4">
                        System Failure
                    </h1>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        The application encountered a critical error. We have been notified and are working on it.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl active:scale-95"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Restart Application
                    </button>
                </div>
            </body>
        </html>
    );
}
