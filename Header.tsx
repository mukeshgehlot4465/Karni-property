import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Heart, 
  Layers, 
  Menu, 
  X, 
  MapPin, 
  Calculator, 
  PlusCircle, 
  Building2, 
  Clock,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/mockData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wishlistCount: number;
  compareCount: number;
  onOpenInquiry: () => void;
  onOpenCalculator: () => void;
  onOpenCompare: () => void;
  onOpenListPropertyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  wishlistCount,
  compareCount,
  onOpenInquiry,
  onOpenCalculator,
  onOpenCompare,
  onOpenListPropertyModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'properties', label: 'Properties' },
    { id: 'services', label: 'Services' },
    { id: 'areas', label: 'Areas We Serve' },
    { id: 'about', label: 'About Us' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-11 h-11 bg-[#0A192F] rounded-lg flex items-center justify-center border border-[#D4AF37]/40 shadow-md group-hover:border-[#D4AF37] transition-all">
            <span className="text-[#D4AF37] font-serif font-extrabold text-2xl tracking-tighter">KP</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold font-serif text-[#0A192F] leading-none tracking-tight">
                KARNI PROPERTY
              </h1>
              <span className="bg-[#D4AF37]/15 text-[#0A192F] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase border border-[#D4AF37]/30">
                JODHPUR
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-[#D4AF37] font-semibold uppercase mt-0.5">
              Property Dealer in Jodhpur
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`py-1 transition-colors relative font-semibold text-xs uppercase tracking-wide ${
                  isActive
                    ? 'text-[#0A192F] font-bold'
                    : 'hover:text-[#0A192F]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#D4AF37] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Triggers */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Compare Button */}
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              className="relative p-2 text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 rounded-lg transition-colors"
              title="Compare Properties"
            >
              <Layers className="w-5 h-5 text-[#0A192F]" />
              <span className="absolute -top-1 -right-1 bg-[#0A192F] text-[#D4AF37] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => handleNavClick('properties')}
            className="relative p-2 text-slate-700 hover:text-[#0A192F] hover:bg-slate-100 rounded-lg transition-colors"
            title="Saved Favorites"
          >
            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* List Property CTA */}
          <button
            onClick={onOpenListPropertyModal}
            className="hidden sm:flex items-center gap-1.5 bg-white text-[#0A192F] border-2 border-[#0A192F] hover:bg-slate-50 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            List Property
          </button>

          {/* Quick Inquiry CTA */}
          <button
            onClick={onOpenInquiry}
            className="bg-[#0A192F] hover:bg-slate-900 text-[#D4AF37] px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Inquire Now</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Feature Navigation for Mobile & Tablet */}
      <div className="lg:hidden bg-[#0A192F] text-white py-2 px-3 border-t border-slate-800 shadow-inner">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none touch-scroll-x text-xs py-0.5">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition-all active:scale-95 shrink-0 text-xs ${
                  isActive
                    ? 'bg-[#D4AF37] text-slate-950 shadow-sm font-extrabold'
                    : 'bg-slate-800/90 text-slate-200 hover:text-white hover:bg-slate-700'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <div className="w-[1px] h-5 bg-slate-700 shrink-0 mx-1" />

          <button
            onClick={onOpenListPropertyModal}
            className="px-3 py-1.5 rounded-xl font-bold bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] active:scale-95 shrink-0 flex items-center gap-1 text-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>List Property</span>
          </button>

          <button
            onClick={onOpenCalculator}
            className="px-3 py-1.5 rounded-xl font-bold bg-slate-800 text-slate-200 border border-slate-700 active:scale-95 shrink-0 flex items-center gap-1 text-xs"
          >
            <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Calculator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
