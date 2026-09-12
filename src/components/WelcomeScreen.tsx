import React, { useState } from "react";
import { HeritageIllustration } from "./HeritageIllustration";
import { Sparkles, Gift, ChevronLeft, User, Receipt, AlertCircle } from "lucide-react";
import { soundManager } from "../utils/soundEffects";
import { SaudiFlag } from "./SaudiFlag";

interface WelcomeScreenProps {
  onStart: (customerName: string, orderNumber: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [customerName, setCustomerName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !orderNumber.trim()) {
      setError("فضلاً اكتب اسمك ورقم الأوردر لبدء اللعبة ✍️");
      soundManager.playClick();
      return;
    }
    setError(null);
    soundManager.playClick();
    onStart(customerName.trim(), orderNumber.trim());
  };

  return (
    <div className="flex flex-col min-h-full justify-between pb-4 px-5 animate-fadeIn">
      {/* Top Section */}
      <div className="flex flex-col items-center">
        {/* Saudi National Day 95 Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#125332]/50 border border-[#C58D38]/40 text-[#DFB06C] text-xs font-semibold mb-3 shadow-sm backdrop-blur-sm">
          <SaudiFlag size="sm" />
          <span>اليوم الوطني السعودي 95</span>
          <span className="opacity-40">•</span>
          <span className="text-[11px] font-normal text-emerald-200">فخر .. جذور .. واثقة</span>
        </div>

        {/* Hero Card Frame */}
        <div className="w-full rounded-2xl overflow-hidden border border-[#C58D38]/30 shadow-xl bg-gradient-to-b from-[#0B3B24] to-[#082819] relative">
          {/* Heritage Illustration */}
          <HeritageIllustration variant="hero" />

          {/* Overlay Title Box */}
          <div className="px-4 pt-3 pb-4 text-center flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide font-tajawal drop-shadow-md flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E6B366] animate-pulse" />
              اختبر سعوديتك!
              <Sparkles className="w-5 h-5 text-[#E6B366] animate-pulse" />
            </h2>

            <p className="text-emerald-100 text-xs sm:text-sm mt-1 font-medium">
              3 أسئلة فقط... وبعدها افتح حظك 🎁
            </p>

            {/* Smart Marketing Promise Ribbon */}
            <div className="mt-2.5 w-full bg-[#051C10]/80 border border-[#C58D38]/40 rounded-xl py-1.5 px-3 flex items-center justify-center gap-1.5 text-[#F7F3EB] shadow-inner">
              <Gift className="w-3.5 h-3.5 text-[#E6B366] shrink-0" />
              <p className="text-[11px] sm:text-xs font-bold text-[#DFB06C]">
                «اختبر سعوديتك… وكل نتيجة فيها هدية!»
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Name & Order Number Registration Form */}
      <form onSubmit={handleStart} className="my-3 space-y-2.5">
        <div className="bg-[#FAF7F0] border-2 border-[#E3D7C1] rounded-2xl p-4 shadow-md text-[#2B1B06]">
          <div className="text-xs font-bold text-[#14452B] mb-2.5 flex items-center gap-1.5">
            <span>بيانات الطلب لبدء الاختبار:</span>
          </div>

          {/* Input 1: Customer Name */}
          <div className="space-y-1 mb-2.5">
            <label className="text-[11px] font-bold text-[#63492F] flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#C58D38]" />
              <span>الاسم الكريم:</span>
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (error) setError(null);
              }}
              placeholder="مثال: عبد العزيز / سارة"
              className="w-full bg-white border border-[#D5C6AC] rounded-xl px-3.5 py-2.5 text-xs text-[#2B1B06] placeholder-[#A08E77] focus:outline-none focus:border-[#0F4C2E] focus:ring-1 focus:ring-[#0F4C2E] transition-all"
            />
          </div>

          {/* Input 2: Order Number */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#63492F] flex items-center gap-1">
              <Receipt className="w-3.5 h-3.5 text-[#C58D38]" />
              <span>رقم الأوردر (من الفاتورة):</span>
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => {
                setOrderNumber(e.target.value);
                if (error) setError(null);
              }}
              placeholder="مثال: 104 أو 582"
              className="w-full bg-white border border-[#D5C6AC] rounded-xl px-3.5 py-2.5 text-xs text-[#2B1B06] placeholder-[#A08E77] focus:outline-none focus:border-[#0F4C2E] focus:ring-1 focus:ring-[#0F4C2E] transition-all"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-red-600 font-bold animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Start Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#A36E20] hover:from-[#E6B366] hover:to-[#B57C26] text-[#2B1B06] font-extrabold text-base shadow-[0_4px_20px_rgba(197,141,56,0.4)] flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all group cursor-pointer"
        >
          <span>ابدأ اللعبة الآن</span>
          <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
        </button>
      </form>

      {/* Footer & Powered by hbbah.com */}
      <footer className="flex flex-col items-center gap-1 pt-1">
        <div className="text-[11px] text-emerald-200/80 flex items-center gap-1 font-medium">
          <span>🛍️</span>
          <span>لعملاء الطلب المباشر • استلم هديتك مع طلبك</span>
        </div>

        {/* Powered by hbbah.com */}
        <div className="mt-1 pt-1.5 border-t border-[#C58D38]/20 w-full flex items-center justify-center">
          <a
            href="https://hbbah.com"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="text-[11px] text-[#DFB06C]/90 hover:text-[#FFF1D0] font-semibold tracking-wide transition-colors flex items-center gap-1 opacity-90 hover:opacity-100"
          >
            <span>Powered by</span>
            <span className="underline font-bold">hbbah.com</span>
          </a>
        </div>
      </footer>
    </div>
  );
};
