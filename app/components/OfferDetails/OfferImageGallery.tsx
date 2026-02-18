'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OfferImageGalleryProps {
  title: string;
  category: string;
  images: string[];
}

export default function OfferImageGallery({
  title,
  category,
  images,
}: OfferImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="group relative block bg-white rounded-xl overflow-hidden shadow-lg border border-transparent hover:border-primary transition-all transform hover:-translate-y-1 aspect-[4/5]"
          >
            <Image
              src={image}
              alt={`${title} - صورة ${index + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-lg font-bold text-sm">
              {category}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-lg font-bold">{title}</p>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">zoom_in</span>
                اضغط للتكبير والعرض
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 left-0 text-white hover:text-primary transition-colors flex items-center gap-2 font-bold"
            >
              <span className="material-symbols-outlined">close</span>
              إغلاق
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage}
                alt={title}
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
