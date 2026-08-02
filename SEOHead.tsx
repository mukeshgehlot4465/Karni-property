import React, { useEffect } from 'react';
import { COMPANY_DETAILS } from '../data/mockData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  breadcrumbs?: { label: string; url?: string }[];
  schemaType?: 'RealEstateAgent' | 'SingleFamilyResidence' | 'Apartment' | 'WebPage';
  schemaData?: Record<string, unknown>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = `${COMPANY_DETAILS.name} – ${COMPANY_DETAILS.tagline} | Premium Property Rentals`,
  description = `Karni Property is Jodhpur's premier property dealer for luxury residential villas, 2/3 BHK flats, commercial office spaces, showrooms, and rent agreement services in Sardarpura, Shastri Nagar, Ratanada, and Pal Road.`,
  keywords = `Karni Property Jodhpur, Property Dealer Jodhpur, House for Rent in Jodhpur, Commercial Office Jodhpur, Flat for Rent Sardarpura, Rent Agreement Jodhpur, Basni Warehouse`,
  breadcrumbs,
  schemaType = 'RealEstateAgent',
  schemaData,
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Dynamic Schema.org JSON-LD injection
    const existingSchema = document.getElementById('seo-json-ld');
    if (existingSchema) {
      existingSchema.remove();
    }

    const script = document.createElement('script');
    script.id = 'seo-json-ld';
    script.type = 'application/ld+json';

    let jsonLdObject: Record<string, unknown> = {};

    if (schemaType === 'RealEstateAgent') {
      jsonLdObject = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        'name': COMPANY_DETAILS.name,
        'image': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        '@id': 'https://karnipropertyjodhpur.com',
        'url': 'https://karnipropertyjodhpur.com',
        'telephone': COMPANY_DETAILS.phone,
        'email': COMPANY_DETAILS.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Plot 42, 1st B Road, Near Jaljog Circle, Sardarpura',
          'addressLocality': 'Jodhpur',
          'addressRegion': 'Rajasthan',
          'postalCode': '342001',
          'addressCountry': 'IN',
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 26.273,
          'longitude': 73.012,
        },
        'openingHoursSpecification': {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          'opens': '09:30',
          'closes': '20:30',
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': COMPANY_DETAILS.googleRating.toString(),
          'reviewCount': COMPANY_DETAILS.googleReviewCount.toString(),
        },
        'priceRange': '₹12,000 - ₹2.5 Lakhs per month',
        'areaServed': ['Sardarpura', 'Shastri Nagar', 'Ratanada', 'Pal Road', 'Basni', 'Paota', 'Chopasni Housing Board'],
      };
    } else if (schemaData) {
      jsonLdObject = schemaData;
    }

    script.text = JSON.stringify(jsonLdObject);
    document.head.appendChild(script);

  }, [title, description, keywords, schemaType, schemaData]);

  return (
    <div className="sr-only">
      {/* Visual Breadcrumb helper for SEO & Accessibility */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="my-2 text-xs text-slate-500">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="inline-flex items-center">
                {idx > 0 && <span className="mx-1 text-slate-400">/</span>}
                {crumb.url ? (
                  <span className="hover:text-[#D4AF37]">{crumb.label}</span>
                ) : (
                  <span className="font-semibold text-slate-800">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
};
