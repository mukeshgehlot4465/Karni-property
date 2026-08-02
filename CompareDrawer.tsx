import React from 'react';
import { X, Bed, Bath, Car, Maximize2, MapPin, Trash2, MessageCircle, Eye } from 'lucide-react';
import { Property } from '../types';

interface CompareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProperties: Property[];
  onRemoveFromCompare: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  isOpen,
  onClose,
  comparedProperties,
  onRemoveFromCompare,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0A192F] text-white p-4 sm:p-5 border-b border-[#D4AF37]/30 flex items-center justify-between sticky top-0 z-10">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
              KP Real Estate Comparison Tool
            </span>
            <h3 className="text-lg font-bold font-serif text-white">
              Compare Selected Properties ({comparedProperties.length}/3)
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {comparedProperties.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm text-slate-600 font-semibold">No properties selected for comparison yet.</p>
            <p className="text-xs text-slate-400">Click the comparison icon on any property card to compare specs side-by-side.</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className={`grid grid-cols-1 ${comparedProperties.length === 2 ? 'md:grid-cols-2' : comparedProperties.length >= 3 ? 'md:grid-cols-3' : 'grid-cols-1'} gap-4 min-w-[600px]`}>
              
              {comparedProperties.map((prop) => (
                <div key={prop.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-4 relative">
                  
                  <button
                    onClick={() => onRemoveFromCompare(prop.id)}
                    className="absolute top-2 right-2 bg-red-100 hover:bg-red-200 text-red-600 p-1.5 rounded-full transition-colors z-10"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-40 object-cover rounded-xl mb-3" />
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</h4>
                    <p className="text-lg font-black text-[#0A192F] font-serif">{prop.displayPrice}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {prop.location}
                    </p>
                  </div>

                  {/* Comparison Metrics */}
                  <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Property Type</span>
                      <span className="font-bold text-slate-800">{prop.propertyType}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Built-Up Area</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-slate-400" /> {prop.areaSqFt} sq.ft
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Bedrooms</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Bed className="w-3 h-3 text-slate-400" /> {prop.bedrooms ? `${prop.bedrooms} BHK` : 'N/A'}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Bathrooms</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Bath className="w-3 h-3 text-slate-400" /> {prop.bathrooms || 1}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Car Parking</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Car className="w-3 h-3 text-slate-400" /> {prop.parking || 1}
                      </span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Furnishing</span>
                      <span className="font-bold text-slate-800">{prop.furnishedStatus}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Facing</span>
                      <span className="font-bold text-slate-800">{prop.facing || 'East'}</span>
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        onSelectProperty(prop);
                        onClose();
                      }}
                      className="w-full bg-[#0A192F] text-[#D4AF37] font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>

                    <a
                      href={`https://wa.me/${prop.agent.phone.replace(/[^0-9]/g, '')}?text=Inquiring%20about%20${encodeURIComponent(prop.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" /> WhatsApp
                    </a>
                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
