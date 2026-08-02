import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, DollarSign, FileText, ArrowRight } from 'lucide-react';

interface RentCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const RentCalculatorModal: React.FC<RentCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'affordability' | 'agreement'>('affordability');

  // Affordability state
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000);
  
  // Agreement fee state
  const [monthlyRentInput, setMonthlyRentInput] = useState<number>(30000);
  const [leaseDurationMonths, setLeaseDurationMonths] = useState<number>(11);
  const [securityDepositMonths, setSecurityDepositMonths] = useState<number>(2);

  if (!isOpen) return null;

  // Affordability calculations (Max recommended rent is 30% of gross income)
  const recommendedMaxRent = Math.round(monthlyIncome * 0.30);
  const comfortableRent = Math.round(monthlyIncome * 0.25);

  // Rajasthan Stamp duty calculation:
  // For 11 month agreement: E-Stamp Duty is ~₹500. Notary & Drafting: ~₹500. Total ~₹1000.
  // Security deposit total = monthlyRentInput * securityDepositMonths
  const securityDepositTotal = monthlyRentInput * securityDepositMonths;
  const estimatedStampDuty = monthlyRentInput > 50000 ? 1000 : 500;
  const estimatedDraftingNotaryFee = 500;
  const totalMoveInBudget = monthlyRentInput + securityDepositTotal + estimatedStampDuty + estimatedDraftingNotaryFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-[#0A192F] text-white p-5 border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#D4AF37] text-[#0A192F] rounded-lg flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
                KP Interactive Financial Tool
              </span>
              <h3 className="text-lg font-bold font-serif text-white">
                Rent & Agreement Calculator
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('affordability')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'affordability'
                ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Budget Affordability Calculator
          </button>

          <button
            onClick={() => setActiveTab('agreement')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'agreement'
                ? 'bg-[#0A192F] text-[#D4AF37] shadow-sm'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rent Agreement & Move-in Budget
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6">
          {activeTab === 'affordability' ? (
            <div className="space-y-5 text-xs">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-bold text-slate-700">Monthly Household / Business Income:</label>
                  <span className="font-extrabold text-[#0A192F] text-base font-serif">
                    ₹{monthlyIncome.toLocaleString('en-IN')} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={500000}
                  step={5000}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                  <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Recommended Ideal Rent (25%)</p>
                  <p className="text-xl font-black text-amber-900 font-serif mt-1">
                    ₹{comfortableRent.toLocaleString('en-IN')} <span className="text-xs font-normal">/mo</span>
                  </p>
                  <p className="text-[10px] text-amber-700 mt-1">Healthy savings margin</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                  <p className="text-[10px] text-blue-800 font-bold uppercase tracking-wider">Upper Limit Ceiling (30%)</p>
                  <p className="text-xl font-black text-[#0A192F] font-serif mt-1">
                    ₹{recommendedMaxRent.toLocaleString('en-IN')} <span className="text-xs font-normal">/mo</span>
                  </p>
                  <p className="text-[10px] text-blue-700 mt-1">Standard financial guideline</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Expert Karni Property Recommendation:
                </p>
                <p className="text-[11px] leading-relaxed">
                  In Jodhpur, for a monthly income of ₹{monthlyIncome.toLocaleString('en-IN')}, you can comfortably rent a spacious 2/3 BHK apartment in Shastri Nagar or Ratanada around ₹{comfortableRent.toLocaleString('en-IN')}/mo.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Monthly Rent Amount (₹)</label>
                  <input
                    type="number"
                    value={monthlyRentInput}
                    onChange={(e) => setMonthlyRentInput(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Security Deposit (Months)</label>
                  <select
                    value={securityDepositMonths}
                    onChange={(e) => setSecurityDepositMonths(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold outline-none"
                  >
                    <option value={1}>1 Month Deposit</option>
                    <option value={2}>2 Months Deposit (Standard)</option>
                    <option value={3}>3 Months Deposit</option>
                  </select>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                <h5 className="font-bold text-[#0A192F] border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#D4AF37]" /> Total Initial Move-in Budget Breakdown
                </h5>

                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">First Month Rent:</span>
                  <span className="font-bold text-slate-900">₹{monthlyRentInput.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Refundable Security Deposit ({securityDepositMonths} Mo):</span>
                  <span className="font-bold text-slate-900">₹{securityDepositTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Rajasthan Govt. E-Stamp Duty:</span>
                  <span className="font-bold text-slate-900">₹{estimatedStampDuty}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-600">Legal Drafting & Notary Delivery Fee:</span>
                  <span className="font-bold text-slate-900">₹{estimatedDraftingNotaryFee}</span>
                </div>

                <div className="flex justify-between pt-2 text-sm font-black text-[#0A192F] font-serif">
                  <span>Estimated Move-In Capital Needed:</span>
                  <span className="text-[#0A192F]">₹{totalMoveInBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-5 border-t border-slate-200 mt-4 flex items-center justify-between">
            <p className="text-[11px] text-slate-500">
              Need assistance with rent agreements or negotiations in Jodhpur?
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="bg-[#0A192F] text-[#D4AF37] px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1 hover:bg-slate-900 transition-colors shadow-md"
            >
              <span>Consult Karni Property</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
