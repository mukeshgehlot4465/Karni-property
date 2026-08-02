import React from 'react';
import { 
  Award, 
  Users, 
  Home, 
  Building2, 
  ShieldCheck, 
  Star, 
  MapPin, 
  CheckCircle2, 
  Phone, 
  Mail,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

interface AboutProps {
  onOpenInquiry: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-16">
      <SEOHead
        title="About Karni Property | Top Property Dealer in Jodhpur"
        description="Learn about Karni Property's 14-year legacy in Jodhpur real estate, our leadership team, and our commitment to transparent rentals and legal precision."
      />

      {/* Hero Header */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-14 rounded-3xl border border-[#D4AF37]/30 relative overflow-hidden text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          <Award className="w-3.5 h-3.5" />
          <span>14+ Years of Real Estate Excellence in Jodhpur</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
          About <span className="gold-gradient-text">Karni Property</span> Jodhpur
        </h1>
        <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
          Founded in Jodhpur with a single vision: to eliminate brokerage opacity and provide seamless, transparent, legally verified rental solutions for families, doctors, corporate entities, and property owners.
        </p>
      </div>

      {/* Story & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Our Heritage</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0A192F]">
            Building Trust Across the Sun City Since 2012
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Karni Property started as a dedicated rental consultancy in Sardarpura, Jodhpur. Over the past 14 years, we have expanded our footprint across Shastri Nagar, Ratanada, Pal Road, Basni, and Paota, facilitating over 1,850 successful tenancy agreements.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Whether you are a resident doctor at AIIMS searching for a furnished 2 BHK apartment, an IT company requiring a plug-and-play office tower, or an NRI property owner in Dubai seeking hassle-free rental management, Karni Property delivers unmatched reliability.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-bold text-[#0A192F]">
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Verified Properties</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>24-Hour E-Stamp Deed</span>
            </div>
          </div>
        </div>

        <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Karni Property Office Jodhpur"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">Main Headquarters</p>
            <p className="font-bold text-sm">Plot 42, 1st B Road, Near Jaljog Circle, Sardarpura, Jodhpur</p>
          </div>
        </div>
      </div>

      {/* Key Leadership Team */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Expert Real Estate Advisors</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0A192F]">Meet the KP Leadership Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Ramesh Gehlot',
              role: 'Founder & Managing Director',
              exp: '14+ Years in Jodhpur Real Estate',
              image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
              phone: COMPANY_DETAILS.phone,
              email: 'ramesh.kp@gmail.com',
            },
            {
              name: 'Sunil Chouhan',
              role: 'Commercial Leasing Head',
              exp: '10+ Years in Office & Showroom Deals',
              image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
              phone: COMPANY_DETAILS.phone,
              email: 'sunil.kp@gmail.com',
            },
            {
              name: 'Pooja Sharma',
              role: 'Residential & NRI Property Manager',
              exp: '8+ Years in Tenant Verification & Agreements',
              image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
              phone: COMPANY_DETAILS.phone,
              email: 'pooja.kp@gmail.com',
            },
          ].map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-[#D4AF37] shadow-md"
              />
              <div>
                <h3 className="font-bold text-[#0A192F] text-base font-serif">{member.name}</h3>
                <p className="text-xs font-bold text-[#D4AF37]">{member.role}</p>
                <p className="text-[11px] text-slate-500 mt-1">{member.exp}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-center gap-3 text-xs">
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="bg-[#0A192F] text-[#D4AF37] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
                <button
                  onClick={onOpenInquiry}
                  className="bg-slate-100 text-slate-800 font-bold px-3 py-1.5 rounded-lg"
                >
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
