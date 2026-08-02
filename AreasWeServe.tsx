import React from 'react';
import { MapPin, Building2, Home, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { AREA_PROFILES } from '../data/mockData';
import { SearchFilters } from '../types';
import { SEOHead } from '../components/SEOHead';

interface AreasWeServeProps {
  setActiveTab: (tab: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

export const AreasWeServe: React.FC<AreasWeServeProps> = ({ setActiveTab, setFilters }) => {
  const handleAreaSelect = (areaName: string) => {
    setFilters((prev) => ({ ...prev, location: areaName }));
    setActiveTab('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <SEOHead
        title="Prime Localities Served in Jodhpur | Karni Property"
        description="Detailed guide to renting properties in Sardarpura, Shastri Nagar, Ratanada, Pal Road, Basni, and Paota in Jodhpur with rent rates and landmarks."
      />

      {/* Hero Banner */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 text-center space-y-3">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
          Jodhpur Neighborhood Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif">
          Areas We Serve Across Jodhpur
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Explore local insights, landmarks, and average rental rates for Jodhpur's most sought-after residential and commercial sectors.
        </p>
      </div>

      {/* Localities Directory Grid */}
      <div className="space-y-8">
        {AREA_PROFILES.map((area, idx) => (
          <div
            key={area.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="relative h-64 lg:h-auto bg-slate-900">
              <img src={area.image} alt={area.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] bg-[#D4AF37] text-[#0A192F] font-bold px-2.5 py-0.5 rounded uppercase">
                  Zone 0{idx + 1}
                </span>
                <h3 className="text-2xl font-bold font-serif mt-1">{area.name}</h3>
              </div>
            </div>

            <div className="p-6 lg:col-span-2 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider">{area.tagline}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{area.description}</p>
              </div>

              {/* Popular For Tags */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Popular For</h5>
                <div className="flex flex-wrap gap-2 text-xs">
                  {area.popularFor.map((item, i) => (
                    <span key={i} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-lg font-semibold border border-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rates Breakdown */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Avg Residential Rent</span>
                  <p className="text-sm font-black text-[#0A192F] font-serif mt-0.5">{area.avgRentResidential}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px]">Avg Commercial Rent</span>
                  <p className="text-sm font-black text-[#0A192F] font-serif mt-0.5">{area.avgRentCommercial}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleAreaSelect(area.name)}
                  className="bg-[#0A192F] hover:bg-slate-900 text-[#D4AF37] font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <span>Browse Available Properties in {area.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
