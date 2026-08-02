import React, { useState } from 'react';
import { Star, ShieldCheck, MessageCircle, Sparkles, User, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA, COMPANY_DETAILS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

interface TestimonialsProps {
  onOpenInquiry: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenInquiry }) => {
  const [filterRole, setFilterRole] = useState<'All' | 'Tenant' | 'Owner' | 'Commercial'>('All');

  const filteredTestimonials = TESTIMONIALS_DATA.filter((t) => {
    if (filterRole === 'Tenant' && !t.verifiedTag.includes('Tenant')) return false;
    if (filterRole === 'Owner' && !t.verifiedTag.includes('Owner')) return false;
    if (filterRole === 'Commercial' && !t.verifiedTag.includes('Commercial') && !t.verifiedTag.includes('Retail')) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <SEOHead
        title="Client Reviews & Testimonials | Karni Property Jodhpur"
        description="Read authentic Google reviews from doctors, corporate tenants, and NRI landlords who trust Karni Property for property leasing in Jodhpur."
      />

      {/* Hero Header */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
          <span>4.9 Star Rating from 480+ Verified Clients</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif">
          What Our Clients Say About Karni Property
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Real feedback from resident doctors, corporate executives, retail brand managers, and NRI property owners in Jodhpur.
        </p>
      </div>

      {/* Role Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'All', label: 'All Reviews' },
          { id: 'Tenant', label: 'Verified Tenants & Doctors' },
          { id: 'Owner', label: 'NRI & Landlord Owners' },
          { id: 'Commercial', label: 'Commercial & Retail Clients' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterRole(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterRole === tab.id
                ? 'bg-[#0A192F] text-[#D4AF37] shadow-md scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {review.verifiedTag}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-xs font-serif">{review.author}</h4>
                <p className="text-[11px] text-[#0A192F] font-semibold">{review.role}</p>
                <p className="text-[10px] text-slate-400">{review.location} • {review.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Feedback Banner */}
      <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 text-center space-y-3">
        <h3 className="text-xl font-bold font-serif text-[#0A192F]">Have You Rented with Karni Property?</h3>
        <p className="text-xs text-slate-600 max-w-lg mx-auto">
          We value your feedback. Share your experience to help future tenants and landlords in Jodhpur.
        </p>
        <button
          onClick={onOpenInquiry}
          className="bg-[#0A192F] text-[#D4AF37] font-bold px-6 py-2.5 rounded-xl text-xs shadow-md"
        >
          Submit Client Feedback
        </button>
      </div>

    </div>
  );
};
