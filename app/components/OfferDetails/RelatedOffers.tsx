import { Link } from '@/i18n/navigation';

interface RelatedOffersProps {
  currentOfferId: string;
}

export default function RelatedOffers({ currentOfferId }: RelatedOffersProps) {
  // Mock related offers - replace with actual data
  const relatedOffers = [
    {
      id: '4',
      title: 'تجهيزات المطبخ العصري',
      category: 'الأدوات المنزلية',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxf2dzgnoK7HcqQZWuzkyfTMfnKU1DVVHoSNtoc_i0IcW1N3GjJqZ0jlMaV4hJAo5NPhdkfkDscNmEXA9EmIEn3QRgDLFzJ-gTXqKkc2i28R7RLPWCQHEahJUGIrFGRtJmY7LSv41uCJCQnIrLXNBEfHBlPOfx79IFLW3xIO1oBgt4FS_1Kt7Cf3BgOLohHW7r0T1W2WeBNdVfnDB_UlM2Ck4XKevz62_6E37OrYzUipzL2objhwMKVmN5ihkJk7eYhs7GEZ7B36-O',
      badgeColor: 'bg-gold',
    },
    {
      id: '5',
      title: 'أجود أنواع التمور والحلويات',
      category: 'مستلزمات رمضان',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvSElP4kmyHjk5RqucHLHdJibsSXwPfcFDD1HaLPsXuoYut-hBcHTEZho4Zbmeh72SEualJT6ZWnoHTbPg41dg3lsfZ-3dybxgMD5xSges_HXRcfLTH8Lc_iOQDD_lhPAX31gsty66ZEvzgakxqVOro0ahIb8mbuBvlWmM2-cwBcDnBHQfpUqnt_6h6BQmKLFnVtqWYKJLiJ9oZWvfFiT_dujIQ61FP5bOvQXnwFRCBXuvTFMO0Ww8SWxmT04sQ7VcI1ptsruPEhYC',
      badgeColor: 'bg-primary',
    },
    {
      id: '6',
      title: 'عروض النظافة المتكاملة',
      category: 'المنظفات',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUL0prf02dGB30QQmNyeJ54Fm_628FYPnxqoOsXAGk9Ul5Y096eTn7NU34qLdkgR_0eaxbqspxCZt-SUrwt9dcarLNoDCOy88RN2rgUYQ4ylrMcGl6peOxStxjWl4dtkr4TDnUL7Ge5gi3dS-rBaDdq6MyY047d-OChc37kojG-uiZWNZkRT1yhihjgZoYnvpXdHUo4nL-aX_dMKIVx1RZ0NVuGcNcJDASPfNPDPYt7-9sE-InUca3wdBD3-tHxjuuFei2Ik9kBydo',
      badgeColor: 'bg-blue-500',
    },
  ].filter((offer) => offer.id !== currentOfferId);

  if (relatedOffers.length === 0) return null;

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-black text-slate-900 mb-6">عروض ذات صلة</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedOffers.map((offer) => (
          <Link
            key={offer.id}
            href={`/offers/${offer.id}`}
            className="group relative block bg-white rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-primary transition-all transform hover:-translate-y-1 aspect-[4/5]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${offer.image}')` }}
            />
            <div className={`absolute top-4 right-4 ${offer.badgeColor} text-white px-3 py-1 rounded-lg font-bold text-sm`}>
              {offer.category}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-lg font-bold">{offer.title}</p>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                عرض التفاصيل
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
