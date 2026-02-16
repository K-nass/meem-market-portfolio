import { Location, Branch } from '../types/branch';

export const locations: Location[] = [
  {
    id: 'saudi-arabia',
    code: 'SA',
    name: {
      en: 'Saudi Arabia',
      ar: 'المملكة العربية السعودية'
    },
    flag: '🇸🇦'
  },
  {
    id: 'kuwait',
    code: 'KW',
    name: {
      en: 'Kuwait',
      ar: 'الكويت'
    },
    flag: '🇰🇼'
  }
];

export const branches: Branch[] = [
  {
    id: 'riyadh-olaya',
    locationId: 'saudi-arabia',
    name: {
      en: 'Riyadh - Olaya',
      ar: 'الرياض - العليا'
    },
    address: {
      en: 'Olaya Street, Riyadh',
      ar: 'شارع العليا، الرياض'
    },
    city: {
      en: 'Riyadh',
      ar: 'الرياض'
    },
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    },
    phone: '+966 11 234 5678',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'riyadh-malaz',
    locationId: 'saudi-arabia',
    name: {
      en: 'Riyadh - Malaz',
      ar: 'الرياض - الملز'
    },
    address: {
      en: 'Malaz District, Riyadh',
      ar: 'حي الملز، الرياض'
    },
    city: {
      en: 'Riyadh',
      ar: 'الرياض'
    },
    phone: '+966 11 234 5679',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'jeddah-tahlia',
    locationId: 'saudi-arabia',
    name: {
      en: 'Jeddah - Tahlia',
      ar: 'جدة - التحلية'
    },
    address: {
      en: 'Tahlia Street, Jeddah',
      ar: 'شارع التحلية، جدة'
    },
    city: {
      en: 'Jeddah',
      ar: 'جدة'
    },
    phone: '+966 12 345 6789',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'jeddah-corniche',
    locationId: 'saudi-arabia',
    name: {
      en: 'Jeddah - Corniche',
      ar: 'جدة - الكورنيش'
    },
    address: {
      en: 'Corniche Road, Jeddah',
      ar: 'طريق الكورنيش، جدة'
    },
    city: {
      en: 'Jeddah',
      ar: 'جدة'
    },
    phone: '+966 12 345 6790',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'dammam-dhahran',
    locationId: 'saudi-arabia',
    name: {
      en: 'Dammam - Dhahran',
      ar: 'الدمام - الظهران'
    },
    address: {
      en: 'Dhahran Street, Dammam',
      ar: 'شارع الظهران، الدمام'
    },
    city: {
      en: 'Dammam',
      ar: 'الدمام'
    },
    phone: '+966 13 456 7890',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'mecca-aziziyah',
    locationId: 'saudi-arabia',
    name: {
      en: 'Mecca - Aziziyah',
      ar: 'مكة - العزيزية'
    },
    address: {
      en: 'Aziziyah District, Mecca',
      ar: 'حي العزيزية، مكة'
    },
    city: {
      en: 'Mecca',
      ar: 'مكة'
    },
    phone: '+966 12 567 8901',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'kuwait-city-salmiya',
    locationId: 'kuwait',
    name: {
      en: 'Kuwait City - Salmiya',
      ar: 'مدينة الكويت - السالمية'
    },
    address: {
      en: 'Salem Al Mubarak Street, Salmiya',
      ar: 'شارع سالم المبارك، السالمية'
    },
    city: {
      en: 'Kuwait City',
      ar: 'مدينة الكويت'
    },
    phone: '+965 2222 3333',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'kuwait-city-hawalli',
    locationId: 'kuwait',
    name: {
      en: 'Kuwait City - Hawalli',
      ar: 'مدينة الكويت - حولي'
    },
    address: {
      en: 'Hawalli District, Kuwait City',
      ar: 'منطقة حولي، مدينة الكويت'
    },
    city: {
      en: 'Kuwait City',
      ar: 'مدينة الكويت'
    },
    phone: '+965 2222 3334',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'kuwait-city-farwaniya',
    locationId: 'kuwait',
    name: {
      en: 'Kuwait City - Farwaniya',
      ar: 'مدينة الكويت - الفروانية'
    },
    address: {
      en: 'Farwaniya Area, Kuwait City',
      ar: 'منطقة الفروانية، مدينة الكويت'
    },
    city: {
      en: 'Kuwait City',
      ar: 'مدينة الكويت'
    },
    phone: '+965 2222 3335',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  },
  {
    id: 'kuwait-city-jahra',
    locationId: 'kuwait',
    name: {
      en: 'Kuwait City - Jahra',
      ar: 'مدينة الكويت - الجهراء'
    },
    address: {
      en: 'Jahra District, Kuwait City',
      ar: 'منطقة الجهراء، مدينة الكويت'
    },
    city: {
      en: 'Kuwait City',
      ar: 'مدينة الكويت'
    },
    phone: '+965 2222 3336',
    hours: {
      open: '08:00',
      close: '23:00'
    }
  }
];
