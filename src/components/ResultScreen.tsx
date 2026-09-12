import React, { useEffect } from "react";
import type { ScoreFeedback } from "../data/quizData";
import { Gift, Sparkles, Trophy } from "lucide-react";
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
    // If 100%, fire celebratory confetti!
    if (scoreFeedback.percentage === 100) {
      soundManager.playFanfare();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#14613B", "#C58D38", "#FFFFFF", "#E6B366"],
      });
    } else {
      soundManager.playCorrect();
    }
  }, [scoreFeedback.percentage]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreFeedback.percentage / 100) * circumference;

  return (
    <div className="flex flex-col min-h-full justify-between pb-4 px-4 animate-fadeIn select-none">
      {/* Top Card Area */}
      <div className="flex flex-col items-center">
        {/* Main Result Card (Parchment & Emerald Theme) */}
        <div className="w-full bg-[#FAF7F0] border-2 border-[#E3D7C1] rounded-3xl p-6 shadow-xl text-center relative overflow-hidden">
          {/* Subtle Background Sadu Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#14613B_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADCC5] text-[#7A4B13] text-xs font-bold mb-4 shadow-sm">
            <span>{scoreFeedback.badge}</span>
            <SaudiFlag size="sm" />
          </div>

          {/* Circular Percentage Gauge (Matching Mockup Screen 5) */}
          <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E2D7C5"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#0F4C2E"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Content inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-tajawal text-[#0F4C2E] tracking-tight">
                {scoreFeedback.percentage}%
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-xs font-bold text-[#8A5A29]">
                  {correctCount}/{totalQuestions} إجابات
                </span>
              </div>
            </div>
          </div>

          {/* Result Title & Humorous / Proud Commentary */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B140B] font-tajawal mt-2 flex items-center justify-center gap-2">
            <span>سعوديتك {scoreFeedback.percentage}%</span>
            <SaudiFlag size="md" />
          </h2>

          <p className="text-base font-bold text-[#C58D38] mt-1 font-tajawal">
            {scoreFeedback.subtitle}
          </p>

          <p className="text-xs text-[#5C452C] mt-2.5 leading-relaxed max-w-xs mx-auto">
            {scoreFeedback.description}
          </p>

          {/* Special 100% VIP Grand Raffle Entry Ribbon */}
          {scoreFeedback.percentage === 100 && (
            <div className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-[#0F4C2E] to-[#17663F] border border-[#E6B366]/40 text-white shadow-md animate-bounceSoft">
              <div className="flex items-center justify-center gap-2 font-bold text-xs text-[#DFB06C]">
                <Trophy className="w-4 h-4 text-[#FFD700]" />
                <span>فرصة ذهبية إضافية في سحب اليوم الوطني! 🏆</span>
              </div>
              <p className="text-[10px] text-emerald-100/90 mt-0.5">
                تم تسجيلك تلقائياً لفرصة الفوز بالجائزة الكبرى لرغفان
              </p>
            </div>
          )}
        </div>

        {/* Commercial Assurance Notice */}
        <div className="mt-4 px-4 py-2 rounded-xl bg-[#092E1B]/80 border border-[#C58D38]/30 text-center">
          <p className="text-xs text-[#F2D7A5] font-medium flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E6B366]" />
            <span>«اختبر سعوديتك… وكل نتيجة فيها هدية مضمونة!»</span>
          </p>
        </div>
      </div>

      {/* Bottom CTA Action Button */}
      <div className="mt-5 flex flex-col items-center gap-3">
        {/* The Big Glowing Mystery Button: افتح حظك 🎁 */}
        <button
          onClick={() => {
            soundManager.playFanfare();
            onOpenMysteryBox();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#9E6A1C] hover:from-[#E6B366] hover:to-[#B27924] text-[#221504] font-black text-xl shadow-[0_6px_25px_rgba(197,141,56,0.5)] flex items-center justify-center gap-3 transform active:scale-[0.98] transition-all animate-pulse"
        >
          <Gift className="w-7 h-7 text-[#221504]" />
          <span>افتح حظك 🎁</span>
        </button>

        {/* Share Story Option for 100% pride */}
        {scoreFeedback.percentage === 100 && (
          <button
            onClick={onShareStory}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <span>مشاركة كرت فخر بالستوري (100%) 📸</span>
          </button>
        )}

        {/* Bottom Slogan matching mockup Screen 5 */}
        <div className="flex items-center justify-center gap-3 text-xs text-emerald-200/90 font-medium pt-1">
          <span className="text-sm">❖</span>
          <span>كل زيارة .. نكهة وطن</span>
          <span className="text-sm">❖</span>
        </div>
      </div>
    </div>
  );
};
