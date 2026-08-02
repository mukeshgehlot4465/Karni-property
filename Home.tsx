import React from 'react';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  Award, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Star, 
  ArrowRight, 
  Clock, 
  FileText, 
  Home as HomeIcon, 
  Key,
  MessageCircle,
  HelpCircle,
  Phone
} from 'lucide-react';
import { Property, SearchFilters } from '../types';
import { PROPERTIES_DATA, COMPANY_DETAILS, AREA_PROFILES, TESTIMONIALS_DATA, FAQ_DATA } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { SEOHead } from '../components/SEOHead';

const heroBgImg = '/src/assets/images/jodhpur_hero_bg_1785567662944.jpg';

interface HomeProps {
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  wishlist: string[];
  onToggleWishlist: (propertyId: string) => void;
  comparedProperties: Property[];
  onToggleCompare: (property: Property) => void;
  setActiveTab: (tab: string) => void;
  onOpenInquiry: () => void;
  onOpenCalculator: () => void;
}

export const Home: React.FC<HomeProps> = ({
  onSelectProperty,
  onScheduleVisit,
  filters,
  setFilters,
  wishlist,
  onToggleWishlist,
  comparedProperties,
  onToggleCompare,
  setActiveTab,
  onOpenInquiry,
  onOpenCalculator,
}) => {
  const featuredProperties = PROPERTIES_DATA.slice(0, 6);

  const stats = [
    { value: `${COMPANY_DETAILS.propertiesRentedCount}+`, label: 'Properties Rented', icon: HomeIcon },
    { value: `${COMPANY_DETAILS.happyClientsCount}+`, label: 'Happy Clients', icon: Users },
    { value: `${COMPANY_DETAILS.yearsOfExperience}+ Yrs`, label: 'Jodhpur Market Leadership', icon: Award },
    { value: `${COMPANY_DETAILS.googleRating} ★`, label: 'Google Rating (480+ Reviews)', icon: Star },
  ];

  return (
    <div className="space-y-16 pb-12">
      <SEOHead
        title="Karni Property – Property Dealer in Jodhpur | Luxury Houses & Offices"
        description="Jodhpur's #1 real estate agency for 2/3 BHK flats, luxury villas in Sardarpura, commercial offices in Shastri Nagar, and 24-hr rent agreement assistance."
      />

      {/* 1. LUXURY HERO SECTION WITH BACKGROUND IMAGE & GEOMETRIC BALANCE */}
      <section className="relative text-white pt-12 pb-24 px-4 sm:px-8 overflow-hidden bg-slate-950">
        {/* Background Image with Dark Overlay for High Text Contrast */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={heroBgImg}
            alt="Jodhpur Luxury Real Estate"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/85 to-[#0A192F]/95" />
        </div>

        {/* Background Radial Pattern & Glow */}
        <div className="absolute inset-0 opacity-15 geometric-grid pointer-events-none z-1" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jodhpur's Premier Real Estate Dealership</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight leading-tight">
              Find Your Luxury <span className="gold-gradient-text">Dream Space</span> in Jodhpur
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
              Exclusive residential villas, 2/3 BHK flats, corporate office suites, and retail showrooms across Sardarpura, Shastri Nagar, Ratanada, and Pal Road.
            </p>
          </div>

          {/* ADVANCED PROPERTY SEARCH BAR */}
          <div className="max-w-5xl mx-auto">
            <AdvancedSearch
              filters={filters}
              setFilters={setFilters}
              onSearchSubmit={() => setActiveTab('properties')}
              onResetFilters={() => setFilters({
                location: 'All',
                category: 'All',
                propertyType: 'All',
                status: 'All',
                budgetMin: 0,
                budgetMax: 500000,
                bedrooms: 'All',
                searchQuery: '',
              })}
            />
          </div>
        </div>
      </section>

      {/* 2. STATISTICS COUNTER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex items-center gap-4 pt-4 lg:pt-0 pl-0 lg:pl-4 first:pt-0 first:pl-0">
                <div className="w-12 h-12 bg-[#0A192F] text-[#D4AF37] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#0A192F]">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">
              <span className="w-8 h-[2px] bg-[#D4AF37]" />
              <span>Handpicked Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0A192F]">
              Featured Properties in Jodhpur
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('properties')}
            className="inline-flex items-center gap-2 text-xs font-black text-[#0A192F] hover:text-[#D4AF37] uppercase tracking-wider group transition-colors"
          >
            <span>View All Properties ({PROPERTIES_DATA.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelectProperty={onSelectProperty}
              onScheduleVisit={onScheduleVisit}
              isWishlisted={wishlist.includes(property.id)}
              onToggleWishlist={onToggleWishlist}
              isCompared={comparedProperties.some((p) => p.id === property.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>

      {/* 4. PROPERTY CATEGORIES & LOCALITIES */}
      <section className="bg-slate-100 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Explore Jodhpur Neighborhoods
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0A192F]">
              Areas & Localities We Serve
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Discover prime commercial corridors and peaceful family residential hubs across the Sun City.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREA_PROFILES.map((area) => (
              <div
                key={area.id}
                onClick={() => setActiveTab('areas')}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-44 bg-slate-800 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold font-serif">{area.name}</h3>
                    <p className="text-[11px] text-slate-300">{area.tagline}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {area.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Residential Rent:</span>
                      <span className="font-bold text-[#0A192F]">{area.avgRentResidential}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Commercial Rent:</span>
                      <span className="font-bold text-[#0A192F]">{area.avgRentCommercial}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#0A192F] font-bold group-hover:text-[#D4AF37]">
                    <span>Explore Properties in {area.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION (HOW RENTING WORKS WITH KP) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            Seamless 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0A192F]">
            How Renting Works with Karni Property
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Requirement Brief',
              desc: 'Share your budget, family/business headcount, and target locality in Jodhpur.',
              icon: Search,
            },
            {
              step: '02',
              title: 'Curated Visits',
              desc: 'Schedule guided physical property tours with our dedicated rental advisors.',
              icon: MapPin,
            },
            {
              step: '03',
              title: 'Owner Negotiation',
              desc: 'We secure the best monthly rent, security deposit terms, and maintenance conditions.',
              icon: Key,
            },
            {
              step: '04',
              title: '24-Hr Rent Deed',
              desc: 'Get government e-stamping, police verification, and doorstep key handover.',
              icon: FileText,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-[#0A192F] text-[#D4AF37] rounded-xl flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-serif text-slate-200">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[#0A192F] text-base mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. GOOGLE REVIEWS & TESTIMONIALS */}
      <section className="bg-[#0A192F] text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-800 pb-8">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-1">
                <Star className="w-4 h-4 fill-[#D4AF37]" />
                <span>Verified Client Reviews</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif">
                Trusted by 2,400+ Families & Corporates
              </h2>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-[#D4AF37]/30">
              <div className="text-center pr-4 border-r border-slate-800">
                <p className="text-3xl font-black text-[#D4AF37] font-serif">4.9</p>
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-bold text-sm text-white">Google Verified Reviews</p>
                <p className="text-xs text-slate-400">Based on 480+ authentic local feedback</p>
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{item.author}</h4>
                    <p className="text-[10px] text-[#D4AF37] font-medium">{item.role}</p>
                    <p className="text-[9px] text-slate-500">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ PREVIEW */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0A192F]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.slice(0, 4).map((faq) => (
            <details key={faq.id} className="bg-white rounded-xl border border-slate-200 p-4 group">
              <summary className="font-bold text-xs sm:text-sm text-[#0A192F] cursor-pointer flex items-center justify-between list-none">
                <span>{faq.question}</span>
                <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
              </summary>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('faq')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A192F] hover:text-[#D4AF37] underline"
          >
            <span>View All Rental FAQs ({FAQ_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 8. LUXURY CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-[#0A192F] to-[#112240] rounded-3xl p-8 sm:p-12 text-white border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl text-center md:text-left z-10">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              Ready to Rent or List in Jodhpur?
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Consult Jodhpur's Most Experienced Property Advisor
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Call us directly or schedule a visit. We promise 100% verified properties and 24-hour rent agreement execution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 z-10 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenInquiry}
              className="bg-[#D4AF37] hover:bg-amber-500 text-[#0A192F] font-black py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Schedule Quick Consultation</span>
            </button>

            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 border border-white/20"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call +91 98765-43210</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
