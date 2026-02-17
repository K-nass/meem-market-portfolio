export interface Category {
  id: string;
  title: string;
  arabicTitle: string;
  description?: string;
  imagePath: string;
  badge?: string;
  discount?: string;
  icon?: string;
  isFeatured?: boolean;
  variant?: 'large' | 'tall' | 'wide' | 'small' | 'recipe';
}

export const categories: Category[] = [
  {
    id: 'beauty-tools',
    title: 'Beauty Tools',
    arabicTitle: 'أدوات التجميل',
    imagePath: '/categories/قسم-أدوات-التجميل.webp',
    isFeatured: true,
    variant: 'large'
  },
  {
    id: 'shoes-bags',
    title: 'Shoes & Bags',
    arabicTitle: 'الأحذية والشنط',
    imagePath: '/categories/قسم-الأحذية-والشنط.webp',
    isFeatured: true,
    variant: 'large',
    badge: 'New Arrivals'
  },
  {
    id: 'toys-entertainment',
    title: 'Toys & Entertainment',
    arabicTitle: 'الألعاب والترفية',
    imagePath: '/categories/قسم-الألعاب-والترفية.webp',
    isFeatured: true,
    variant: 'large'
  },
  {
    id: 'household-items',
    title: 'Household Items',
    arabicTitle: 'الأواني المنزلية',
    imagePath: '/categories/قسم-الأواني-المنزلية.webp',
    variant: 'wide',
    discount: '40%',
    icon: 'countertops'
  },
  {
    id: 'plastic-hardware',
    title: 'Plastic & Hardware',
    arabicTitle: 'البلاستك والخردوات',
    imagePath: '/categories/قسم-البلاستك-والخردوات.webp',
    variant: 'tall'
  },
  {
    id: 'gifts-collectibles',
    title: 'Gifts & Collectibles',
    arabicTitle: 'التحف والهدايا',
    imagePath: '/categories/قسم-التحف-والهدايا.webp',
    variant: 'small',
    badge: 'Premium'
  },
  {
    id: 'vegetables-fruits',
    title: 'Vegetables & Fruits',
    arabicTitle: 'الخضروات والفواكة',
    imagePath: '/categories/قسم-الخضروات-والفواكة.webp',
    variant: 'recipe',
    badge: 'Fresh Daily',
    description: 'Farm-fresh produce delivered daily'
  },
  {
    id: 'perfumes-incense',
    title: 'Perfumes & Incense',
    arabicTitle: 'العطور والبخور',
    imagePath: '/categories/قسم-العطور-والبخور.webp',
    isFeatured: true,
    variant: 'large'
  },
  {
    id: 'baby-care',
    title: 'Baby Care',
    arabicTitle: 'العناية بالطفل',
    imagePath: '/categories/قسم-العناية-بالطفل.webp'
  },
  {
    id: 'personal-care',
    title: 'Personal Care',
    arabicTitle: 'العناية',
    imagePath: '/categories/قسم-العناية.webp'
  },
  {
    id: 'tools-car-accessories',
    title: 'Tools & Car Accessories',
    arabicTitle: 'العِدد وزينة السيارات',
    imagePath: '/categories/قسم-العِدد-وزينة-السيارات.webp'
  },
  {
    id: 'towels',
    title: 'Towels',
    arabicTitle: 'الفوط',
    imagePath: '/categories/قسم-الفوط.webp'
  },
  {
    id: 'personal-supplies',
    title: 'Personal Supplies',
    arabicTitle: 'اللوازم الشخصية',
    imagePath: '/categories/قسم-اللوازم-الشخصية.webp'
  },
  {
    id: 'furnishings',
    title: 'Furnishings',
    arabicTitle: 'المفروشات',
    imagePath: '/categories/قسم-المفروشات.webp'
  },
  {
    id: 'cleaning-products',
    title: 'Cleaning Products',
    arabicTitle: 'المنظفات',
    imagePath: '/categories/قسم-المنظفات.webp'
  },
  {
    id: 'consumables',
    title: 'Consumables',
    arabicTitle: 'المواد الاستهلاكية',
    imagePath: '/categories/قسم-المواد-الاستهلاكية.webp'
  },
  {
    id: 'food-products',
    title: 'Food Products',
    arabicTitle: 'المواد الغذائية',
    imagePath: '/categories/قسم-المواد-الغذائية.webp'
  }
];

// Helper function to get featured categories
export function getFeaturedCategories(): Category[] {
  return categories.filter(cat => cat.isFeatured);
}

// Helper function to get category by ID
export function getCategoryById(id: string): Category | undefined {
  return categories.find(cat => cat.id === id);
}
