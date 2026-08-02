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
  ChevronLeft, 
  ChevronRight,
  Eye,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (property: Property) => void;
  isWishlisted: boolean;
  onToggleWishlist: (propertyId: string) => void;
  isCompared: boolean;
  onToggleCompare: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onScheduleVisit,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const cleanPhone = property.agent.phone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    `Hello Karni Property, I am interested in viewing "${property.title}" (${property.displayPrice}) in ${property.location}. Please share availability and visit schedule.`
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group relative">
      
      {/* Property Image Container */}
      <div className="relative h-60 sm:h-64 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectProperty(property)}>
        <img
          src={property.images[currentImageIndex] || property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-[#0A192F] text-[#D4AF37] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md border border-[#D4AF37]/40">
              {property.status}
            </span>
            {property.isExclusive && (
              <span className="bg-[#D4AF37] text-[#0A192F] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                EXCLUSIVE
              </span>
            )}
            {property.isHotDeal && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                HOT DEAL
              </span>
            )}
          </div>

          {/* Quick Actions (Wishlist & Compare) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(property);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isCompared
                  ? 'bg-[#0A192F] text-[#D4AF37]'
                  : 'bg-white/80 text-slate-800 hover:bg-white'
              }`}
              title="Compare Property"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-slate-800 hover:bg-white'
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image Carousel Navigation Arrows */}
        {property.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Price & Furnished Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <div>
            <p className="text-2xl font-black text-white drop-shadow-md font-serif">
              {property.displayPrice}
            </p>
            <p className="text-[11px] text-slate-200 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> Verified by KP Dealer
            </p>
          </div>

          <span className="bg-white/90 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
            {property.furnishedStatus}
          </span>
        </div>
      </div>

      {/* Property Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Category */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              onClick={() => onSelectProperty(property)}
              className="font-bold text-slate-900 text-base leading-snug line-clamp-1 hover:text-[#0A192F] cursor-pointer transition-colors"
            >
              {property.title}
            </h3>
            <span className="text-[10px] bg-blue-50 text-blue-900 px-2 py-0.5 rounded font-bold uppercase shrink-0 border border-blue-200">
              {property.propertyType}
            </span>
          </div>

          {/* Location */}
          <p className="text-xs text-slate-600 mb-3 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="line-clamp-1 font-medium">{property.location}</span>
          </p>

          {/* Spec Badges Grid (Area, Bed, Bath, Parking) */}
          <div className="grid grid-cols-4 gap-1 py-2.5 px-2 bg-slate-50 rounded-xl border border-slate-100 text-center mb-3">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Area</p>
              <p className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-0.5">
                <Maximize2 className="w-3 h-3 text-slate-400" />
                {property.areaSqFt} <span className="text-[9px] text-slate-500 font-normal">sqft</span>
              </p>
            </div>

            <div className="border-l border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Beds</p>
              <p className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-0.5">
                <Bed className="w-3 h-3 text-slate-400" />
                {property.bedrooms ? `${property.bedrooms} BHK` : 'N/A'}
              </p>
            </div>

            <div className="border-l border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Baths</p>
              <p className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-0.5">
                <Bath className="w-3 h-3 text-slate-400" />
                {property.bathrooms || '1+'}
              </p>
            </div>

            <div className="border-l border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Park</p>
              <p className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-0.5">
                <Car className="w-3 h-3 text-slate-400" />
                {property.parking || 1}
              </p>
            </div>
          </div>
        </div>

        {/* Card Action Buttons (View Details, WhatsApp, Call) */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectProperty(property)}
              className="w-full bg-[#0A192F] hover:bg-slate-900 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              View Details
            </button>

            <button
              onClick={() => onScheduleVisit(property)}
              className="w-full bg-[#D4AF37] hover:bg-amber-500 text-[#0A192F] font-extrabold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Visit Schedule
            </button>
          </div>

          {/* Quick Contact Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              WhatsApp
            </a>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-1.5 px-2 rounded-lg text-[11px] flex items-center justify-center gap-1 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              Call Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
