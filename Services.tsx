import React, { useState } from 'react';
import { 
  Building2, 
  Home, 
  Store, 
  Warehouse, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users,
  Phone,
  BedDouble,
  ClipboardCheck,
  UserCheck,
  Car,
  Tv,
  GraduationCap,
  Briefcase,
  Globe,
  Sliders,
  Check
} from 'lucide-react';
import { SERVICES_DATA, RENTAL_SERVICE_OPTIONS, COMPANY_DETAILS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

interface ServicesProps {
  onOpenInquiry: () => void;
  onOpenCalculator: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry, onOpenCalculator }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0].id);
  const [activeCategoryTab, setActiveCategoryTab] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['opt-tenant-1', 'opt-legal-1']);

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const toggleOption = (id: string) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(item => item !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const handleCustomInquiry = () => {
    onOpenInquiry();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <SEOHead
        title="Real Estate & Rent Agreement Services in Jodhpur | Karni Property"
        description="Residential house rentals, commercial office leasing, PG/co-living options, tenant background verification, digital move-in audits, and 24-hr rent agreement e-stamping in Jodhpur."
      />

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 relative overflow-hidden text-center space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Real Estate & Rental Options in Jodhpur</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
          Our Specialist Property & Rental Service Options
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          From residential home searches & PG stays to NRI property care, tenant police verification, and 24-hour e-stamped rent agreement execution in Jodhpur.
        </p>
      </div>

      {/* RENTAL SERVICE OPTIONS CATEGORIZER (User Requested Expanded Options) */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0A192F] to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl space-y-8">
        
        <div className="space-y-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Customized Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-2.5">
              <Sliders className="w-6 h-6 text-[#D4AF37]" />
              <span>Rental Service Packages & Add-On Options</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Select tailored rental options for tenants, house owners, or legal agreement services.
            </p>
          </div>

          {/* Category Tabs Placed Directly Under Heading */}
          <div className="inline-flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 max-w-full overflow-x-auto scrollbar-none touch-scroll-x gap-1">
            {RENTAL_SERVICE_OPTIONS.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryTab(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 whitespace-nowrap flex items-center gap-2 ${
                  activeCategoryTab === idx
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>{cat.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Options Grid for Selected Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {RENTAL_SERVICE_OPTIONS[activeCategoryTab].options.map((opt) => {
            const isSelected = selectedOptions.includes(opt.id);
            return (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'bg-slate-800 border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-lg scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-700/80 hover:border-slate-500'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold px-2 py-0.5 rounded uppercase">
                      {opt.badge}
                    </span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-slate-950' : 'border-slate-600'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-sm font-serif">{opt.name}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{opt.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium text-[11px]">Pricing:</span>
                  <span className="font-black text-[#D4AF37] text-xs">{opt.price}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner below Options */}
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center font-bold text-sm shrink-0">
              {selectedOptions.length}
            </div>
            <div>
              <p className="text-xs font-bold text-white">
                {selectedOptions.length > 0 ? `${selectedOptions.length} Rental Options Selected` : 'Click options above to customize your package'}
              </p>
              <p className="text-[11px] text-slate-400">
                Karni Property advisors will review your selected options and contact you instantly on WhatsApp.
              </p>
            </div>
          </div>

          <button
            onClick={handleCustomInquiry}
            className="w-full sm:w-auto bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Selected Options</span>
          </button>
        </div>

      </div>

      {/* Services Navigation Pills */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[#0A192F] flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#D4AF37]" />
          <span>Core Property & Legal Service Breakdown</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {SERVICES_DATA.map((serv) => (
            <button
              key={serv.id}
              onClick={() => setSelectedServiceId(serv.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                selectedServiceId === serv.id
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {serv.title}
            </button>
          ))}
        </div>
      </div>

      {/* Service Detail Focus Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="bg-[#0A192F] text-[#D4AF37] text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider">
              {selectedService.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-[#0A192F]">
              {selectedService.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedService.fullDesc}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Client Benefits</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedService.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Execution Process</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {selectedService.processSteps.map((step, idx) => (
                <div key={idx} className="bg-[#0A192F] text-white p-3 rounded-xl border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase">Step 0{idx + 1}</span>
                  <p className="font-bold text-[11px] leading-tight">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Call to Action Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h3 className="font-bold text-base text-[#0A192F] font-serif">Targeted For</h3>
            <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 font-medium">
              {selectedService.targetAudience}
            </p>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-1">
              <span className="text-[10px] text-amber-800 font-bold uppercase">KP Quality Guarantee</span>
              <p className="text-xs font-bold text-amber-950">
                Transparent brokerage terms & 100% legal verification for every transaction.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={onOpenInquiry}
              className="w-full bg-[#0A192F] hover:bg-slate-900 text-[#D4AF37] font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Service Consultation</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 rounded-xl text-xs border border-slate-300"
            >
              Estimate Fees with Calculator
            </button>
          </div>
        </div>

      </div>

      {/* Grid of All Services Overview */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-serif text-[#0A192F]">
          All Services Provided by Karni Property
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((serv) => (
            <div
              key={serv.id}
              onClick={() => setSelectedServiceId(serv.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                selectedServiceId === serv.id
                  ? 'bg-white border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-[#0A192F] text-[#D4AF37] font-bold px-2.5 py-0.5 rounded uppercase">
                  {serv.badge}
                </span>
                <span className="text-xs font-bold text-[#D4AF37] hover:underline">Details →</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base font-serif">{serv.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{serv.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

