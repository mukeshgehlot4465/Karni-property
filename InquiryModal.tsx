import React, { useState } from 'react';
import { X, Calendar, Clock, Phone, Send, CheckCircle2, Building2, MapPin } from 'lucide-react';
import { Property } from '../types';
import { COMPANY_DETAILS } from '../data/mockData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'inquiry' | 'visit' | 'listProperty';
  property?: Property | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  mode = 'inquiry',
  property,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: property ? property.location : 'Sardarpura, Jodhpur',
    propertyType: property ? property.propertyType : 'Residential Apartment',
    serviceOption: 'House Rental Search',
    budget: property ? property.displayPrice : '₹25,000 - ₹50,000/mo',
    visitDate: new Date().toISOString().split('T')[0],
    visitTime: '11:00 AM',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Prepare WhatsApp Message Redirection
    const cleanPhone = COMPANY_DETAILS.whatsapp.replace(/[^0-9]/g, '');
    let msg = ``;

    if (mode === 'visit' && property) {
      msg = `Hello Karni Property, my name is ${formData.name} (${formData.phone}). I would like to schedule a property visit for "${property.title}" in ${property.location} on ${formData.visitDate} at ${formData.visitTime}. Notes: ${formData.notes}`;
    } else if (mode === 'listProperty') {
      msg = `Hello Karni Property, I am a property owner (${formData.name}, Phone: ${formData.phone}). I want to list my property in ${formData.preferredLocation} (${formData.propertyType}). Service Requested: ${formData.serviceOption}. Details: ${formData.notes}`;
    } else {
      msg = `Hello Karni Property, my name is ${formData.name} (${formData.phone}). Service Option Selected: ${formData.serviceOption}. Looking for a ${formData.propertyType} in ${formData.preferredLocation} within budget ${formData.budget}. Notes: ${formData.notes}`;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative">
        
        {/* Header Bar */}
        <div className="bg-[#0A192F] text-white p-5 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-0.5">
              {mode === 'visit' ? 'In-Person Property Tour' : mode === 'listProperty' ? 'For Property Landlords' : 'KP Lead Center'}
            </span>
            <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
              {mode === 'visit' ? 'Schedule a Property Visit' : mode === 'listProperty' ? 'List Your Property in Jodhpur' : 'Quick Rental Inquiry'}
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
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-[#0A192F] font-serif">Inquiry Submitted Successfully!</h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Redirecting you to WhatsApp to connect directly with senior Karni Property advisor in Jodhpur. You can also call us directly at <strong>{COMPANY_DETAILS.phone}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#0A192F] text-[#D4AF37] px-6 py-2.5 rounded-xl font-bold text-xs"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {property && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
                <img src={property.images[0]} alt={property.title} className="w-14 h-14 object-cover rounded-lg" />
                <div>
                  <h5 className="font-bold text-slate-900 line-clamp-1">{property.title}</h5>
                  <p className="text-[11px] text-[#0A192F] font-bold">{property.displayPrice}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" /> {property.location}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-bold mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765-43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>
            </div>

            {mode !== 'visit' && (
              <div>
                <label className="block text-slate-600 font-bold mb-1">Rental Service Option Needed *</label>
                <select
                  value={formData.serviceOption}
                  onChange={(e) => setFormData({ ...formData, serviceOption: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none text-xs font-semibold"
                >
                  <option value="House Rental Search">House / Flat Rental Search (Express Visits)</option>
                  <option value="PG / Co-Living Accommodation">PG / Student & Doctor Co-Living Stay</option>
                  <option value="Commercial Office / Showroom Leasing">Commercial Office or Showroom Leasing</option>
                  <option value="Industrial Warehouse Godown">Industrial Warehouse / Logistics Godown</option>
                  <option value="24-Hr Rent Agreement E-Stamping">24-Hr Rent Agreement & E-Stamping</option>
                  <option value="Tenant Police Verification Express">Tenant Police Verification & Identity Check</option>
                  <option value="Move-In Condition Digital Audit">Move-In Digital Condition Photo Audit</option>
                  <option value="Full NRI Property Management">NRI / Landlord End-to-End Property Management</option>
                </select>
              </div>
            )}

            {mode === 'visit' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Visit Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Visit Time
                  </label>
                  <select
                    value={formData.visitTime}
                    onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none"
                  >
                    <option>10:00 AM - Morning</option>
                    <option>12:00 PM - Afternoon</option>
                    <option>03:00 PM - Afternoon</option>
                    <option>05:30 PM - Evening</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Target Locality in Jodhpur</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    <option>Sardarpura</option>
                    <option>Shastri Nagar</option>
                    <option>Ratanada</option>
                    <option>Pal Road</option>
                    <option>AIIMS Road / Basni</option>
                    <option>Paota</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-bold mb-1">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none"
                  >
                    <option>2 BHK Flat</option>
                    <option>3 BHK Flat</option>
                    <option>Luxury Villa</option>
                    <option>Commercial Office</option>
                    <option>Retail Showroom</option>
                    <option>Industrial Warehouse</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-600 font-bold mb-1">Additional Requirements / Notes</label>
              <textarea
                rows={3}
                placeholder="Mention move-in date, furnished requirement, or family status..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#D4AF37] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0A192F] hover:bg-slate-900 text-[#D4AF37] font-black py-3 rounded-xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{mode === 'visit' ? 'Confirm Visit Request' : mode === 'listProperty' ? 'Submit Property Listing' : 'Submit & Connect on WhatsApp'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
