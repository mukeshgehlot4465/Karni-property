export type PropertyCategory = 'Residential' | 'Commercial' | 'Rental' | 'Office Space' | 'Industrial';
export type PropertyType = 'Luxury Villa' | 'Apartment' | 'Independent House' | 'Office Suite' | 'Retail Showroom' | 'Warehouse' | 'Plot / Land';
export type ListingStatus = 'For Rent' | 'For Sale';

export interface NearbyPlace {
  name: string;
  distance: string;
  category: 'School' | 'Hospital' | 'Market' | 'Transport' | 'Airport';
}

export interface Property {
  id: string;
  title: string;
  price: number;
  period?: '/mo' | 'total';
  displayPrice: string;
  category: PropertyCategory;
  propertyType: PropertyType;
  status: ListingStatus;
  location: string;
  address: string;
  areaSqFt: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  facing?: string;
  floor?: string;
  furnishedStatus: 'Furnished' | 'Semi-Furnished' | 'Unfurnished' | 'Bare Shell';
  isExclusive?: boolean;
  isHotDeal?: boolean;
  tag?: string;
  images: string[];
  description: string;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  agent: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
    email: string;
    image: string;
  };
  dateListed: string;
}

export interface AreaProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  popularFor: string[];
  avgRentResidential: string;
  avgRentCommercial: string;
  featuredPropertyCount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  location: string;
  comment: string;
  avatar: string;
  verifiedTag: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  processSteps: string[];
  targetAudience: string;
}

export interface FAQItem {
  id: string;
  category: 'Renting' | 'Commercial' | 'Agreement' | 'Owners' | 'General';
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface SearchFilters {
  location: string;
  category: string;
  propertyType: string;
  status: string;
  budgetMin: number;
  budgetMax: number;
  bedrooms: string;
  searchQuery: string;
}
