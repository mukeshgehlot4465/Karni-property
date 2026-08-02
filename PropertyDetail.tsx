import React, { useState } from 'react';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  Phone, 
  MessageCircle, 
  Heart, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Building2, 
  Clock, 
  ArrowLeft,
  Sparkles,
  Compass,
  Layers3,
  ExternalLink
} from 'lucide-react';
import { Property } from '../types';
import { PROPERTIES_DATA, COMPANY_DETAILS } from '../data/mockData';
import { PropertyCard } from '../components/PropertyCard';
import { SEOHead } from '../components/SEOHead';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  isWishlisted: boolean;
  onToggleWishlist: (propertyId: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({
  property,
  onBack,
  onSelectProperty,
  onScheduleVisit,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submittedInquiry, setSubmittedInquiry] = useState(false);

  const cleanPhone = property.agent.phone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    `Hello Karni Property, I am interested in viewing "${property.title}" in ${property.location} (${property.displayPrice}). Please guide me with availability.`
  );

  const relatedProperties = PROPERTIES_DATA.filter(
    (p) => p.id !== property.id && (p.category === property.category || p.location.includes(property.location.split(',')[0]))
  ).slice(0, 3);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedInquiry(true);
    const msg = `Hello Karni Property, I am interested in property "${property.title}" (${property.displayPrice}). My name is ${inquiryName}, Phone: ${inquiryPhone}. Note: ${inquiryMessage}`;
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this rental property in Jodhpur: ${property.title} - ${property.displayPrice}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
      <SEOHead
        title={`${property.title} | Karni Property Jodhpur`}
        description={`${property.title} for rent in ${property.location}. ${property.displayPrice}, ${property.areaSqFt} Sq.Ft. Contact Ramesh Gehlot / Sunil Chouhan at Karni Property.`}
        breadcrumbs={[
          { label: 'Home', url: '#' },
          { label: 'Properties', url: '#' },
          { label: property.location, url: '#' },
          { label: property.title },
        ]}
      />

      {/* Top Back Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0A192F] hover:text-[#D4AF37] bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties List</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-700 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>Share Property</span>
          </button>

          <button
            onClick={() => onToggleCompare(property)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border transition-colors shadow-sm ${
              isCompared
                ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F]'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          <button
            onClick={() => onToggleWishlist(property.id)}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border transition-colors shadow-sm ${
              isWishlisted
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            <span>{isWishlisted ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Property Heading Header */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#0A192F] text-[#D4AF37] text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
            {property.status}
          </span>
          <span className="bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-md uppercase border border-blue-200">
            {property.propertyType}
          </span>
          <span className="bg-emerald-50 text-emerald-900 text-xs font-bold px-3 py-1 rounded-md uppercase border border-emerald-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> KP Verified Listing
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif text-[#0A192F] leading-tight">
          {property.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="text-sm text-slate-600 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-semibold">{property.address}</span>
          </p>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Monthly Rental</span>
            <p className="text-3xl font-black text-[#0A192F] font-serif">{property.displayPrice}</p>
          </div>
        </div>
      </div>

      {/* GALLERY SECTION (Large Image + Thumbnail Grid) */}
      <div className="space-y-3">
        <div className="relative h-[380px] sm:h-[480px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          <img
            src={property.images[activeImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-sm">
            Photo {activeImageIndex + 1} of {property.images.length}
          </span>
        </div>

        {/* Thumbnails */}
        {property.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-24 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MAIN TWO-COLUMN LAYOUT (Details on Left, Sticky Lead Form & Agent Card on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: SPECS, AMENITIES, DESCRIPTION, MAP, NEARBY PLACES */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Overview Specification Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#0A192F] border-b border-slate-100 pb-3">
              Property Overview & Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Super Built-Up Area</p>
                <p className="text-sm font-black text-slate-900 flex items-center gap-1 mt-0.5">
                  <Maximize2 className="w-4 h-4 text-[#D4AF37]" /> {property.areaSqFt} Sq.Ft
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Bedrooms</p>
                <p className="text-sm font-black text-slate-900 flex items-center gap-1 mt-0.5">
                  <Bed className="w-4 h-4 text-[#D4AF37]" /> {property.bedrooms ? `${property.bedrooms} Bedrooms` : 'N/A'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Bathrooms</p>
                <p className="text-sm font-black text-slate-900 flex items-center gap-1 mt-0.5">
                  <Bath className="w-4 h-4 text-[#D4AF37]" /> {property.bathrooms || 1} Bathrooms
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Parking Space</p>
                <p className="text-sm font-black text-slate-900 flex items-center gap-1 mt-0.5">
                  <Car className="w-4 h-4 text-[#D4AF37]" /> {property.parking || 1} Covered
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Furnishing Status</p>
                <p className="text-xs font-extrabold text-slate-900 mt-0.5">{property.furnishedStatus}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Vastu / Facing</p>
                <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Compass className="w-4 h-4 text-[#D4AF37]" /> {property.facing || 'East Facing'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Floor Position</p>
                <p className="text-xs font-extrabold text-slate-900 flex items-center gap-1 mt-0.5">
                  <Layers3 className="w-4 h-4 text-[#D4AF37]" /> {property.floor || 'Ground Floor'}
                </p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Listed Date</p>
                <p className="text-xs font-extrabold text-slate-900 mt-0.5">{property.dateListed}</p>
              </div>
            </div>
          </div>

          {/* Amenities Checklist */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#0A192F] border-b border-slate-100 pb-3">
              Key Features & Amenities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-lg font-bold font-serif text-[#0A192F] border-b border-slate-100 pb-3">
              Detailed Property Description
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Location Map & Nearby Highlights */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif text-[#0A192F]">
                Location & Nearby Landmarks in Jodhpur
              </h3>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title}, ${property.location}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Map Preview Graphic */}
            <div className="h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center text-center p-6 border border-slate-200">
              <div className="absolute inset-0 opacity-30 geometric-grid pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 bg-[#D4AF37] text-[#0A192F] rounded-full flex items-center justify-center mx-auto font-bold shadow-xl animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-sm">{property.address}</h4>
                <p className="text-xs text-slate-300">{property.location}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title}, ${property.location}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#D4AF37] text-[#0A192F] font-black text-xs px-4 py-2 rounded-xl shadow-md mt-2"
                >
                  View Route Directions
                </a>
              </div>
            </div>

            {/* Nearby Places Distance Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Distance to Key Destinations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {property.nearbyPlaces.map((place, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900">{place.name}</p>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">{place.category}</span>
                    </div>
                    <span className="font-extrabold text-[#0A192F] bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STICKY INQUIRY FORM & AGENT PROFILE */}
        <div className="space-y-6">
          
          {/* Quick Inquiry Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl sticky top-20 space-y-5">
            <div className="bg-[#0A192F] text-white p-4 rounded-xl space-y-1">
              <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest block">Direct KP Lead Desk</span>
              <h4 className="text-base font-bold font-serif">Inquire About This Property</h4>
              <p className="text-xs text-slate-300">Fast response via call or WhatsApp within 15 minutes.</p>
            </div>

            {submittedInquiry ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 text-xs">
                <p className="font-bold text-emerald-900">Inquiry Received!</p>
                <p className="text-emerald-700">Connecting you with property manager on WhatsApp...</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765-43210"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Message / Visit Request</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Is this available for immediate move-in?"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0A192F] hover:bg-slate-900 text-[#D4AF37] font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Inquire on WhatsApp
                </button>
              </form>
            )}

            <button
              onClick={() => onScheduleVisit(property)}
              className="w-full bg-[#D4AF37] hover:bg-amber-500 text-[#0A192F] font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Physical Visit</span>
            </button>

            {/* Agent Details Card */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned KP Agent</h5>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <img
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div>
                  <h6 className="font-bold text-slate-900 text-xs">{property.agent.name}</h6>
                  <p className="text-[10px] text-[#0A192F] font-semibold">{property.agent.role}</p>
                  <p className="text-[10px] text-slate-500">Karni Property Jodhpur Specialist</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${cleanPhone}`}
                  className="w-full bg-slate-800 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Call Agent
                </a>

                <a
                  href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" /> WhatsApp
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* RELATED PROPERTIES SECTION */}
      {relatedProperties.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-2xl font-bold font-serif text-[#0A192F]">
            Similar Rental Properties in {property.location.split(',')[0]}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProperties.map((relProp) => (
              <PropertyCard
                key={relProp.id}
                property={relProp}
                onSelectProperty={onSelectProperty}
                onScheduleVisit={onScheduleVisit}
                isWishlisted={isWishlisted}
                onToggleWishlist={onToggleWishlist}
                isCompared={isCompared}
                onToggleCompare={onToggleCompare}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
