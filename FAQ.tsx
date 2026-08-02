import React, { useState } from 'react';
import { HelpCircle, Search, FileText, Building2, ShieldCheck, Phone } from 'lucide-react';
import { FAQ_DATA, COMPANY_DETAILS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

interface FAQProps {
  onOpenInquiry: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Karni Property Jodhpur"
        description="Get answers regarding Jodhpur rent agreements, tenant police verification, brokerage rates, security deposits, and commercial leases."
      />

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 text-center space-y-3">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
          Knowledge Base & Help Center
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Everything you need to know about renting homes, leasing offices, and drafting rent deeds in Jodhpur.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search questions e.g. agreement, police verification, deposit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['All', 'Renting', 'Commercial', 'Agreement', 'Owners', 'General'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#0A192F] text-[#D4AF37] shadow-md scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordions List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 space-y-2">
            <p className="text-sm font-bold text-slate-700">No matching questions found.</p>
            <p className="text-xs text-slate-500">Try searching with a different term or consult KP lead desk.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <details
              key={faq.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm group hover:border-slate-300 transition-colors"
            >
              <summary className="font-bold text-sm text-[#0A192F] cursor-pointer flex items-center justify-between list-none">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  {faq.question}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase">
                  {faq.category}
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.answer}
              </p>
            </details>
          ))
        )}
      </div>

      {/* Direct Contact CTA */}
      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-[#0A192F] text-sm font-serif">Have a Specific Question Not Listed Here?</h4>
          <p className="text-xs text-slate-600">Speak directly to our senior real estate advisor in Sardarpura Jodhpur.</p>
        </div>
        <button
          onClick={onOpenInquiry}
          className="bg-[#0A192F] text-[#D4AF37] font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shrink-0 shadow-md"
        >
          Ask Senior Advisor
        </button>
      </div>

    </div>
  );
};
