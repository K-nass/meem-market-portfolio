import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function Footer() {
    const t = await getTranslations('footer');

    const fields = [t('field1'), t('field2'), t('field3'), t('field4'), t('field5')];

    return (
        <footer className="bg-gradient-to-br from-[#003366] via-[#004080] to-[#002952] text-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand */}
                    <div className="space-y-6">
                        <Image
                            src="/Meem-logox-white.png"
                            alt="Meem Market"
                            width={180}
                            height={77}
                            className="w-auto h-16"
                        />
                        <p className="text-white/80 text-sm leading-relaxed">
                            {t('brandDescription')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h2 className="text-white font-bold text-lg">{t('quickLinks')}</h2>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-white/75 hover:text-white transition-colors text-sm">{t('home')}</Link></li>
                            <li><Link href="/#about" className="text-white/75 hover:text-white transition-colors text-sm">{t('aboutUs')}</Link></li>
                            <li><Link href="/offers" className="text-white/75 hover:text-white transition-colors text-sm">{t('offers')}</Link></li>
                            <li><Link href="/branches" className="text-white/75 hover:text-white transition-colors text-sm">{t('ourBranches')}</Link></li>
                            <li><Link href="/career" className="text-white/75 hover:text-white transition-colors text-sm">{t('contactUs')}</Link></li>
                        </ul>
                    </div>

                    {/* Branches */}
                    <div className="space-y-4">
                        <h2 className="text-white font-bold text-lg">{t('branchesTitle')}</h2>
                        <ul className="space-y-3">
                            <li><Link href="/branches?branch=riyadh" className="text-white/75 hover:text-white transition-colors text-sm">{t('saudiRiyadh')}</Link></li>
                            <li><Link href="/branches?branch=ahsa" className="text-white/75 hover:text-white transition-colors text-sm">{t('saudiAhsa')}</Link></li>
                            <li><Link href="/branches?branch=qareen" className="text-white/75 hover:text-white transition-colors text-sm">{t('kuwaitQareen')}</Link></li>
                            <li><Link href="/branches?branch=rai" className="text-white/75 hover:text-white transition-colors text-sm">{t('kuwaitRai')}</Link></li>
                            <li><Link href="/branches?branch=eqaila" className="text-white/75 hover:text-white transition-colors text-sm">{t('kuwaitEqaila')}</Link></li>
                        </ul>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        <h2 className="text-white font-bold text-lg">{t('fieldsTitle')}</h2>
                        <ul className="space-y-3">
                            {fields.map((item) => (
                                <li key={item} className="flex items-center gap-2 text-white/75 text-sm">
                                    <svg className="w-2 h-2 fill-current shrink-0" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"/></svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/15 py-6">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
                    <p>{t('copyright')}</p>
                    <a href="https://kyan-soft.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        {t('credit')}
                    </a>
                </div>
            </div>
        </footer>
    );
}
