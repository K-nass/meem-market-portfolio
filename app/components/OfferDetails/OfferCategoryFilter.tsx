'use client';

import { useState } from 'react';

interface Category {
  id: string;
  label: string;
  icon: string | null;
}

interface OfferCategoryFilterProps {
  categories: Category[];
  activeCategory: string;
}

export default function OfferCategoryFilter({
  categories,
  activeCategory: initialActive,
}: OfferCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState(initialActive);

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                }`}
              >
                {category.icon && (
                  <span className="material-symbols-outlined text-lg">
                    {category.icon}
                  </span>
                )}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
