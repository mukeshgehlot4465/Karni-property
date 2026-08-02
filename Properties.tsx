import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Grid, 
  List as ListIcon, 
  SlidersHorizontal, 
  RotateCcw, 
  Heart, 
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { Property, SearchFilters } from '../types';
import { PROPERTIES_DATA } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { AdvancedSearch } from '../components/AdvancedSearch';
import { SEOHead } from '../components/SEOHead';

interface PropertiesProps {
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  wishlist: string[];
  onToggleWishlist: (propertyId: string) => void;
  comparedProperties: Property[];
  onToggleCompare: (property: Property) => void;
  onOpenInquiry: () => void;
}

export const Properties: React.FC<PropertiesProps> = ({
  onSelectProperty,
  onScheduleVisit,
  filters,
  setFilters,
  wishlist,
  onToggleWishlist,
  comparedProperties,
  onToggleCompare,
  onOpenInquiry,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'area-desc'>('featured');
  const [onlySaved, setOnlySaved] = useState(false);

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES_DATA.filter((p) => {
      // Favorites filter
      if (onlySaved && !wishlist.includes(p.id)) return false;

      // Category filter
      if (filters.category !== 'All' && p.category !== filters.category) return false;

      // Location filter
      if (filters.location !== 'All' && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;

      // Property type filter
      if (filters.propertyType !== 'All' && p.propertyType !== filters.propertyType) return false;

      // Budget filter
      if (p.price < filters.budgetMin || p.price > filters.budgetMax) return false;

      // Search keyword filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(query);
        const locMatch = p.location.toLowerCase().includes(query);
        const descMatch = p.description.toLowerCase().includes(query);
        if (!titleMatch && !locMatch && !descMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'area-desc') return b.areaSqFt - a.areaSqFt;
      return 0; // Default featured
    });
  }, [filters, sortBy, onlySaved, wishlist]);

  const resetFilters = () => {
    setFilters({
      location: 'All',
      category: 'All',
      propertyType: 'All',
      status: 'All',
      budgetMin: 0,
      budgetMax: 500000,
      bedrooms: 'All',
      searchQuery: '',
    });
    setOnlySaved(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <SEOHead
        title="Verified Rental Properties in Jodhpur | Karni Property"
        description="Search luxury 2/3 BHK flats, villas in Sardarpura, commercial offices in Shastri Nagar, and warehouses in Basni. Direct phone and WhatsApp inquiry."
      />

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white p-8 rounded-3xl border border-[#D4AF37]/30 relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
            KP Verified Jodhpur Listings
          </span>
          <h1 className="text-3xl font-black font-serif">
            Properties for Rent & Lease in Jodhpur
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Browse 100% verified residential houses, commercial offices, and high-street showrooms with transparent pricing.
          </p>
        </div>
      </div>

      {/* Filter Component */}
      <AdvancedSearch
        filters={filters}
        setFilters={setFilters}
        onResetFilters={resetFilters}
      />

      {/* Toolbar (Count, Sort, Favorites Toggle, View Mode) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="text-xs font-extrabold text-[#0A192F]">
            Showing <span className="text-[#D4AF37] font-black">{filteredProperties.length}</span> Properties
          </p>

          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              onlySaved
                ? 'bg-red-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlySaved ? 'fill-white' : ''}`} />
            <span>Saved Favorites ({wishlist.length})</span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 text-xs">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area-desc">Area: Largest First</option>
            </select>
          </div>

          {/* Grid/List View Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-[#0A192F] text-[#D4AF37]' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-[#0A192F] text-[#D4AF37]' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Property Results List */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-xl font-bold font-serif text-[#0A192F]">No Matching Properties Found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We couldn't find any properties matching your current filters. Try resetting filters or request custom property matching from Karni Property.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={resetFilters}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
            <button
              onClick={onOpenInquiry}
              className="bg-[#0A192F] text-[#D4AF37] font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Request Custom Listing
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          }`}
        >
          {filteredProperties.map((property) => (
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
      )}

    </div>
  );
};
