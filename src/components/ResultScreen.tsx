import React, { useEffect } from "react";
import type { ScoreFeedback } from "../data/quizData";
import { Gift, Sparkles, Trophy, Music } from "lucide-react";
import { soundManager } from "../utils/soundEffects";
import { SaudiFlag } from "./SaudiFlag";
import confetti from "canvas-confetti";

interface ResultScreenProps {
  scoreFeedback: ScoreFeedback;
  correctCount: number;
  totalQuestions: number;
  onOpenMysteryBox: () => void;
  onShareStory: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  scoreFeedback,
  correctCount,
  totalQuestions,
  onOpenMysteryBox,
  onShareStory,
}) => {
  useEffect(() => {
    // Play national celebration anthem "عاش السعودي فوق فوق" starting from second 26
    soundManager.playAnthem();

    // Fire celebratory confetti!
    if (scoreFeedback.percentage === 100) {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#14613B", "#C58D38", "#FFFFFF", "#E6B366"],
      });
    } else {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#14613B", "#C58D38", "#FFFFFF"],
      });
    }
  }, [scoreFeedback.percentage]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreFeedback.percentage / 100) * circumference;

  return (
    <div className="flex flex-col min-h-full justify-between pb-3 px-4 sm:px-5 animate-fadeIn select-none font-almarai">
      {/* Top Card Area */}
      <div className="flex flex-col items-center">
        {/* Main Result Card (Parchment & Emerald Theme) */}
        <div className="w-full bg-[#FAF7F0] border-2 border-[#E3D7C1] rounded-3xl p-5 shadow-xl text-center relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#14613B_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC5] text-[#5C370D] text-xs font-extrabold mb-3 shadow-sm">
            <span>{scoreFeedback.badge}</span>
            <SaudiFlag size="sm" />
          </div>

          {/* Circular Percentage Gauge */}
          <div className="relative w-36 h-36 mx-auto my-1 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="#E2D7C5"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="url(#ringGoldGrad)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out drop-shadow"
              />
              <defs>
                <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFB06C" />
                  <stop offset="50%" stopColor="#C58D38" />
                  <stop offset="100%" stopColor="#0F4C2E" />
                </linearGradient>
              </defs>
            </svg>

            {/* Content inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#0F4C2E] tracking-tight">
                {scoreFeedback.percentage}%
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-extrabold text-[#7A4B13]">
                  {correctCount}/{totalQuestions} إجابات صحيحة
                </span>
              </div>
            </div>
          </div>

          {/* Result Title & Humorous / Proud Commentary */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#1B140B] mt-1 flex items-center justify-center gap-2">
            <span>سعوديتك {scoreFeedback.percentage}%</span>
            <SaudiFlag size="md" />
          </h2>

          <p className="text-sm sm:text-base font-extrabold text-[#C58D38] mt-1">
            {scoreFeedback.subtitle}
          </p>

          <p className="text-xs text-[#5C452C] mt-2 leading-relaxed max-w-xs mx-auto font-medium">
            {scoreFeedback.description}
          </p>

          {/* Celebratory Anthem Tag */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EADCC5]/60 border border-[#C58D38]/40 text-[#7A4C1A] text-[11px] font-bold shadow-sm">
            <Music className="w-3.5 h-3.5 text-[#C58D38] animate-bounce" />
            <span>«هذا السعودي فوق .. فوق 🇸🇦»</span>
          </div>

          {/* Special 100% VIP Grand Raffle Entry Ribbon */}
          {scoreFeedback.percentage === 100 && (
            <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-[#082416] to-[#0D3E25] border border-[#E6B366]/40 text-white shadow-md">
              <div className="flex items-center justify-center gap-2 font-black text-xs text-[#DFB06C]">
                <Trophy className="w-4 h-4 text-[#FFD700]" />
                <span>فرصة ذهبية إضافية في سحب اليوم الوطني! 🏆</span>
              </div>
              <p className="text-[10px] text-emerald-100/90 mt-0.5 font-medium">
                تم تسجيلك تلقائياً لفرصة الفوز بالجائزة الكبرى لرغفان
              </p>
            </div>
          )}
        </div>

        {/* Commercial Assurance Notice */}
        <div className="mt-3.5 px-4 py-2 rounded-xl bg-[#092E1B]/80 border border-[#C58D38]/30 text-center">
          <p className="text-xs text-[#F2D7A5] font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B366]" />
            <span>«اختبر سعوديتك… وكل نتيجة فيها هدية مضمونة!»</span>
          </p>
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="mt-4 flex flex-col items-center gap-2.5">
        {/* The Big Glowing Mystery Button: افتح حظك 🎁 */}
        <button
          onClick={() => {
            soundManager.playFanfare();
            onOpenMysteryBox();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#9E6A1C] hover:from-[#E6B366] hover:to-[#B27924] text-[#221504] font-black text-xl shadow-[0_6px_25px_rgba(197,141,56,0.5)] flex items-center justify-center gap-3 transform active:scale-[0.98] transition-all animate-pulse cursor-pointer"
        >
          <Gift className="w-7 h-7 text-[#221504]" />
          <span>افتح حظك 🎁</span>
        </button>

        {/* Share Story Option for 100% pride */}
        {scoreFeedback.percentage === 100 && (
          <button
            onClick={onShareStory}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>مشاركة كرت فخر بالستوري (100%) 📸</span>
          </button>
        )}

        {/* Powered by hbbah.com footer */}
        <footer className="pt-2 border-t border-[#C58D38]/20 w-full flex items-center justify-center">
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
        </footer>
      </div>
    </div>
  );
};
