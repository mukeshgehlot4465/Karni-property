import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const cleanPhone = COMPANY_DETAILS.whatsapp.replace(/[^0-9]/g, '');
    const msg = `Hello Karni Property, my name is ${formData.name} (${formData.phone}, Email: ${formData.email}). Subject: ${formData.subject}. Message: ${formData.message}`;

    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-12">
      <SEOHead
        title="Contact Karni Property | Property Dealer in Jodhpur"
        description="Visit Karni Property office at Sardarpura, Jodhpur. Call +91 98765-43210 or WhatsApp us for instant property assistance and rent agreements."
      />

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 text-center space-y-3">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
          Get in Touch with KP Dealership
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-serif">
          Contact Karni Property Jodhpur
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Visit our main office in Sardarpura or reach out via phone or WhatsApp for immediate property visits and rent agreements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info Cards Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#0A192F]">Office Address</h3>
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">{COMPANY_DETAILS.name}</p>
                <p>{COMPANY_DETAILS.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-serif text-[#0A192F]">Phone & WhatsApp</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Mobile Desk</p>
                  <a href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-[#D4AF37]">
                    {COMPANY_DETAILS.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 fill-emerald-500" />
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">WhatsApp Official</p>
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    {COMPANY_DETAILS.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <p className="text-slate-400 font-bold uppercase text-[10px]">Email Address</p>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-bold text-slate-900 hover:text-[#D4AF37]">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A192F] text-white p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-[#D4AF37] font-serif uppercase tracking-wider">Working Hours</h3>
            <div className="text-xs text-slate-300 space-y-1.5">
              <p className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span className="font-bold text-white">9:30 AM - 8:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-bold text-amber-400">By Appointment</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold font-serif text-[#0A192F]">Send Us a Direct Message</h3>
            <p className="text-xs text-slate-500">Fill in your requirements below for instant callback from KP team.</p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold text-emerald-950 font-serif">Message Sent!</h4>
              <p className="text-xs text-emerald-800">Redirecting you to WhatsApp to complete your message with our agent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765-43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none"
                  >
                    <option>House / Flat Rental</option>
                    <option>Commercial Office Space</option>
                    <option>Retail Showroom</option>
                    <option>Industrial Warehouse</option>
                    <option>Rent Agreement Service</option>
                    <option>List My Property</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Requirements / Message</label>
                <textarea
                  rows={4}
                  placeholder="Describe your preferred location in Jodhpur, budget, move-in date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0A192F] hover:bg-slate-900 text-[#D4AF37] font-black py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Connect on WhatsApp</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Map Embedded Visual */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-serif text-[#0A192F]">
            Karni Property Location Map in Sardarpura, Jodhpur
          </h3>
          <a
            href="https://maps.google.com/?q=Sardarpura+Jodhpur+Rajasthan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            Open Map Directions <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-72 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center text-center p-6">
          <div className="absolute inset-0 opacity-20 geometric-grid pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="w-12 h-12 bg-[#D4AF37] text-[#0A192F] rounded-full flex items-center justify-center mx-auto font-bold shadow-2xl">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white text-base">Plot 42, 1st B Road, Near Jaljog Circle</h4>
            <p className="text-xs text-slate-300">Sardarpura, Jodhpur, Rajasthan 342001</p>
          </div>
        </div>
      </div>

    </div>
  );
};
