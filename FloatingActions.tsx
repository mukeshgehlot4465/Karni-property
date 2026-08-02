import React from 'react';
import { Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/mockData';

interface FloatingActionsProps {
  onOpenInquiry: () => void;
  onOpenScheduleVisit: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenInquiry,
  onOpenScheduleVisit,
}) => {
  const cleanPhone = COMPANY_DETAILS.phone.replace(/[^0-9]/g, '');
  const whatsappMsg = encodeURIComponent(
    'Hello Karni Property, I am visiting your website and would like assistance finding a property in Jodhpur.'
  );

  return (
    <>
      {/* Floating Buttons on Desktop & Mobile (Bottom Right) */}
      <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-6 z-40 flex flex-col gap-3">
        
        {/* Floating Call Button */}
        <a
          href={`tel:${cleanPhone}`}
          className="w-12 h-12 sm:w-13 sm:h-13 bg-[#0A192F] hover:bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-[#D4AF37] hover:scale-110 transition-all duration-300 group"
          title="Call Karni Property Jodhpur"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
        </a>

      </div>

      {/* Sticky Mobile Contact Bar at Screen Bottom */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A192F] text-white border-t border-[#D4AF37]/30 p-2.5 shadow-2xl flex items-center justify-around gap-2">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 border border-slate-700"
        >
          <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Call Agent</span>
        </a>

        <a
          href={`https://wa.me/${cleanPhone}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-emerald-600 text-white py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenScheduleVisit}
          className="flex-1 bg-[#D4AF37] hover:bg-amber-500 text-[#0A192F] py-2 rounded-xl text-[11px] font-black flex items-center justify-center gap-1"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Tour</span>
        </button>
      </div>
    </>
  );
};
