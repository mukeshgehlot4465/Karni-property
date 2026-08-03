import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Building2,
  FileText,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS, AREA_PROFILES } from '../data/mockData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenSitemapModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSitemapModal }) => {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-8 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Contact Overview */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center text-[#0A192F] font-serif font-black text-2xl shadow-lg">
                KP
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-white tracking-tight">
                  KARNI PROPERTY
                </h3>
                <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Property Dealer in Jodhpur
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Jodhpur’s most trusted real estate dealership for residential villas, 2/3 BHK flats, commercial offices, retail showrooms, and rent agreements in Sardarpura, Shastri Nagar, Ratanada, and Pal Road.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.phone} / {COMPANY_DETAILS.secondaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{COMPANY_DETAILS.workingHours}</span>
              </div>
            </div>

            {/* Rating Highlight */}
            <div className="inline-flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-white">{COMPANY_DETAILS.googleRating} / 5.0</span>
                <span className="text-slate-400 text-[11px] ml-1">({COMPANY_DETAILS.googleReviewCount}+ Google Reviews)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#D4AF37]/30 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Home Page', id: 'home' },
                { label: 'All Properties', id: 'properties' },
                { label: 'Property Services', id: 'services' },
                { label: 'Areas We Serve', id: 'areas' },
                { label: 'About Karni Property', id: 'about' },
                { label: 'Client Testimonials', id: 'testimonials' },
                { label: 'FAQ & Guidance', id: 'faq' },
                { label: 'Real Estate Blog', id: 'blog' },
                { label: 'Contact Us', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-[#D4AF37] transition-colors" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Localities Directory */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#D4AF37]/30 pb-2">
              Top Jodhpur Areas
            </h4>
            <ul className="space-y-2.5 text-xs">
              {AREA_PROFILES.map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => handleNav('areas')}
                    className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span>{area.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-[#D4AF37]/30 pb-2">
              Services & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-[#D4AF37]" />
                  Residential House Rental
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-[#D4AF37]" />
                  Commercial Office Leasing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-[#D4AF37]" />
                  24-Hour Rent Agreement
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  NRI Property Care
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenSitemapModal}
                className="inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline font-semibold"
              >
                <ExternalLink className="w-3 h-3" />
                View XML Sitemap & SEO Schema
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Karni Property – Property Dealer in Jodhpur. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => handleNav('faq')} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handleNav('faq')} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-300 transition-colors">
              Sitemap
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
