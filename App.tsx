import React, { useState, useEffect } from 'react';
import { Property, SearchFilters } from './types';
import { PROPERTIES_DATA } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { InquiryModal } from './components/InquiryModal';
import { CompareDrawer } from './components/CompareDrawer';
import { RentCalculatorModal } from './components/RentCalculatorModal';
import { SitemapModal } from './components/SitemapModal';

// Pages
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { AreasWeServe } from './pages/AreasWeServe';
import { Testimonials } from './pages/Testimonials';
import { FAQ } from './pages/FAQ';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Search Filters
  const [filters, setFilters] = useState<SearchFilters>({
    location: 'All',
    category: 'All',
    propertyType: 'All',
    status: 'All',
    budgetMin: 0,
    budgetMax: 500000,
    bedrooms: 'All',
    searchQuery: '',
  });

  // Wishlist / Saved Favorites Persistent State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kp_wishlist');
      return saved ? JSON.parse(saved) : ['prop-1'];
    } catch {
      return ['prop-1'];
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem('kp_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const handleToggleWishlist = (propertyId: string) => {
    setWishlist((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  // Property Comparison State
  const [comparedProperties, setComparedProperties] = useState<Property[]>([]);
  const [compareDrawerOpen, setCompareDrawerOpen] = useState(false);

  const handleToggleCompare = (property: Property) => {
    setComparedProperties((prev) => {
      const exists = prev.some((p) => p.id === property.id);
      if (exists) {
        return prev.filter((p) => p.id !== property.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare a maximum of 3 properties at once.');
          return prev;
        }
        return [...prev, property];
      }
    });
  };

  const handleRemoveFromCompare = (propertyId: string) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  // Modals
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    mode: 'inquiry' | 'visit' | 'listProperty';
    property: Property | null;
  }>({
    isOpen: false,
    mode: 'inquiry',
    property: null,
  });

  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState(false);

  // Property Select Handler
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveTab('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Schedule Visit Handler
  const handleScheduleVisit = (property: Property) => {
    setInquiryModal({
      isOpen: true,
      mode: 'visit',
      property,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#D4AF37] selection:text-[#0A192F]">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'property-detail') setSelectedProperty(null);
        }}
        wishlistCount={wishlist.length}
        compareCount={comparedProperties.length}
        onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenCompare={() => setCompareDrawerOpen(true)}
        onOpenListPropertyModal={() => setInquiryModal({ isOpen: true, mode: 'listProperty', property: null })}
      />

      {/* Main View Router Content */}
      <main key={activeTab} className="flex-1 pb-16 sm:pb-0 page-fade-enter">
        {activeTab === 'home' && (
          <Home
            onSelectProperty={handleSelectProperty}
            onScheduleVisit={handleScheduleVisit}
            filters={filters}
            setFilters={setFilters}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            comparedProperties={comparedProperties}
            onToggleCompare={handleToggleCompare}
            setActiveTab={setActiveTab}
            onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })}
            onOpenCalculator={() => setCalculatorOpen(true)}
          />
        )}

        {activeTab === 'properties' && (
          <Properties
            onSelectProperty={handleSelectProperty}
            onScheduleVisit={handleScheduleVisit}
            filters={filters}
            setFilters={setFilters}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            comparedProperties={comparedProperties}
            onToggleCompare={handleToggleCompare}
            onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })}
          />
        )}

        {activeTab === 'property-detail' && selectedProperty && (
          <PropertyDetail
            property={selectedProperty}
            onBack={() => setActiveTab('properties')}
            onSelectProperty={handleSelectProperty}
            onScheduleVisit={handleScheduleVisit}
            isWishlisted={wishlist.includes(selectedProperty.id)}
            onToggleWishlist={handleToggleWishlist}
            isCompared={comparedProperties.some((p) => p.id === selectedProperty.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === 'services' && (
          <Services
            onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })}
            onOpenCalculator={() => setCalculatorOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <About onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })} />
        )}

        {activeTab === 'areas' && (
          <AreasWeServe
            setActiveTab={setActiveTab}
            setFilters={setFilters}
          />
        )}

        {activeTab === 'testimonials' && (
          <Testimonials onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })} />
        )}

        {activeTab === 'faq' && (
          <FAQ onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })} />
        )}

        {activeTab === 'blog' && <Blog />}

        {activeTab === 'contact' && <Contact />}
      </main>

      {/* Floating Action Buttons & Sticky Mobile Bar */}
      <FloatingActions
        onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })}
        onOpenScheduleVisit={() => setInquiryModal({ isOpen: true, mode: 'visit', property: selectedProperty || PROPERTIES_DATA[0] })}
      />

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'property-detail') setSelectedProperty(null);
        }}
        onOpenSitemapModal={() => setSitemapModalOpen(true)}
      />

      {/* Inquiry & Schedule Visit Modal */}
      <InquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal((prev) => ({ ...prev, isOpen: false }))}
        mode={inquiryModal.mode}
        property={inquiryModal.property}
      />

      {/* Property Compare Drawer */}
      <CompareDrawer
        isOpen={compareDrawerOpen}
        onClose={() => setCompareDrawerOpen(false)}
        comparedProperties={comparedProperties}
        onRemoveFromCompare={handleRemoveFromCompare}
        onSelectProperty={handleSelectProperty}
      />

      {/* Rent & Agreement Calculator Modal */}
      <RentCalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
        onOpenInquiry={() => setInquiryModal({ isOpen: true, mode: 'inquiry', property: null })}
      />

      {/* XML Sitemap Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
      />

    </div>
  );
}
