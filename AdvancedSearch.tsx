import React from 'react';
import { Search, MapPin, Building2, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { SearchFilters } from '../types';

interface AdvancedSearchProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearchSubmit?: () => void;
  onResetFilters: () => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filters,
  setFilters,
  onSearchSubmit,
  onResetFilters,
}) => {
  const handleChange = (field: keyof SearchFilters, value: unknown) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-200/90 relative z-20">
      
      {/* Category Tabs (Residential, Commercial, Rental, All) */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 max-w-full text-xs">
          {[
            { id: 'All', label: 'All Listings' },
            { id: 'Residential', label: 'Residential' },
            { id: 'Commercial', label: 'Commercial' },
            { id: 'Office Space', label: 'Office Spaces' },
            { id: 'Industrial', label: 'Warehouses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleChange('category', tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                filters.category === tab.id
                  ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-[#0A192F] font-semibold flex items-center gap-1 transition-colors shrink-0 py-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Main Search Filter Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        
        {/* Keyword Search Input */}
        <div className="relative">
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Search Keyword / Landmark
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="e.g. Sardarpura, AIIMS, Fort View..."
              value={filters.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
              className="w-full bg-slate-50 pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-slate-200 font-medium focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none min-h-[42px]"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Location in Jodhpur
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3 z-10" />
            <select
              value={filters.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full bg-slate-50 pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-slate-200 font-bold text-slate-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none appearance-none min-h-[42px]"
            >
              <option value="All">All Localities in Jodhpur</option>
              <option value="Sardarpura">Sardarpura (C-Road / B-Road)</option>
              <option value="Shastri Nagar">Shastri Nagar (Medical Hub)</option>
              <option value="Ratanada">Ratanada (Residency Road)</option>
              <option value="Pal Road">Pal Road (Main Corridor)</option>
              <option value="AIIMS Road">AIIMS Road / Basni</option>
              <option value="Paota">Paota & High Court Circle</option>
              <option value="Chopasni Housing Board">Chopasni Housing Board</option>
            </select>
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div>
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Property Type
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 z-10" />
            <select
              value={filters.propertyType}
              onChange={(e) => handleChange('propertyType', e.target.value)}
              className="w-full bg-slate-50 pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-slate-200 font-semibold text-slate-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none appearance-none min-h-[42px]"
            >
              <option value="All">All Types</option>
              <option value="Luxury Villa">Luxury Villa / House</option>
              <option value="Apartment">2/3/4 BHK Flat</option>
              <option value="Office Suite">Office Suite / IT Space</option>
              <option value="Retail Showroom">Retail Showroom / Shop</option>
              <option value="Warehouse">Industrial Warehouse</option>
            </select>
          </div>
        </div>

        {/* Budget Range Dropdown */}
        <div>
          <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Monthly Budget
          </label>
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3 top-3 z-10" />
            <select
              value={`${filters.budgetMin}-${filters.budgetMax}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                handleChange('budgetMin', min);
                handleChange('budgetMax', max);
              }}
              className="w-full bg-slate-50 pl-9 pr-3 py-2.5 text-base sm:text-xs rounded-xl border border-slate-200 font-semibold text-slate-800 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none appearance-none min-h-[42px]"
            >
              <option value="0-500000">Any Price Range</option>
              <option value="0-25000">Up to ₹25,000 / mo</option>
              <option value="25000-50000">₹25,000 - ₹50,000 / mo</option>
              <option value="50000-100000">₹50,000 - ₹1.0 Lakh / mo</option>
              <option value="100000-500000">₹1.0 Lakh+ / mo</option>
            </select>
          </div>
        </div>

        {/* Search CTA Button */}
        <div className="flex items-end pt-1 md:pt-0">
          <button
            onClick={onSearchSubmit}
            className="w-full bg-[#D4AF37] hover:bg-amber-500 text-[#0A192F] font-black py-3 sm:py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl min-h-[42px]"
          >
            <Search className="w-4 h-4 stroke-[3]" />
            <span>SEARCH PROPERTIES</span>
          </button>
        </div>

      </div>
    </div>
  );
};
