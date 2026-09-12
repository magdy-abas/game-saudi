import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { soundManager } from "../utils/soundEffects";
import confetti from "canvas-confetti";

interface MysteryBoxModalProps {
  isOpen: boolean;
  onReveal: () => void;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  isOpen,
  onReveal,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  if (!isOpen) return null;

  const handleOpenBox = () => {
    if (isOpening) return;
    setIsOpening(true);
    soundManager.playFanfare();

    // Multistage Confetti explosion
    const end = Date.now() + 1200;
    const colors = ["#C58D38", "#14613B", "#DFB06C", "#FFFFFF", "#F5D485"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setTimeout(() => {
      onReveal();
      setIsOpening(false);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#0F4C2E] via-[#09321E] to-[#041A0F] border-2 border-[#C58D38] rounded-3xl p-6 text-center shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#DFB06C_0%,transparent_70%)] opacity-15 pointer-events-none" />

        {/* Modal Header */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#185E3B] border border-[#C58D38]/40 text-[#DFB06C] text-xs font-bold mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>صندوق الحظ من رغفان</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h3 className="text-2xl font-extrabold text-white font-tajawal mb-1">
          هدية مشاركتك جاهزة!
        </h3>
        <p className="text-xs text-emerald-200 mb-6">
          انقر على الصندوق لكشف هديتك الفورية الخاصة بك
        </p>

        {/* Interactive 3D Gift Box Visual */}
        <div
          onClick={handleOpenBox}
          className={`relative cursor-pointer my-4 transform transition-all duration-300 ${
            isOpening
              ? "scale-110 rotate-3 filter brightness-125"
              : "hover:scale-105 animate-bounceSoft"
          }`}
        >
          {/* Glowing Aura behind box */}
          <div className="absolute -inset-4 bg-[#C58D38]/30 rounded-full blur-xl animate-pulse" />

          {/* SVG Gift Box with Ribbon & Saudi Palm Ornament */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
          >
            {/* Box Body */}
            <rect x="25" y="65" width="110" height="80" rx="12" fill="#0D462A" stroke="#C58D38" strokeWidth="2.5" />
            <rect x="27" y="67" width="106" height="76" rx="10" fill="url(#boxInnerGrad)" opacity="0.6" />

            {/* Vertical Golden Ribbon */}
            <rect x="70" y="65" width="20" height="80" fill="url(#goldRibbon)" stroke="#C58D38" strokeWidth="1" />

            {/* Box Lid */}
            <rect
              x="18"
              y={isOpening ? "30" : "50"}
              width="124"
              height="24"
              rx="8"
              fill="#145A36"
              stroke="#E6B366"
              strokeWidth="2.5"
              className="transition-all duration-500"
            />
            {/* Lid Vertical Ribbon */}
            <rect
              x="70"
              y={isOpening ? "30" : "50"}
              width="20"
              height="24"
              fill="url(#goldRibbon)"
              className="transition-all duration-500"
            />

            {/* Ribbon Bow on top */}
            <g
              transform={isOpening ? "translate(0, -25)" : "translate(0, 0)"}
              className="transition-all duration-500"
            >
              {/* Left Bow Loop */}
              <path
                d="M80 50 C55 30 50 15 68 22 C80 27 80 48 80 50 Z"
                fill="url(#goldRibbon)"
                stroke="#C58D38"
                strokeWidth="1.5"
              />
              {/* Right Bow Loop */}
              <path
                d="M80 50 C105 30 110 15 92 22 C80 27 80 48 80 50 Z"
                fill="url(#goldRibbon)"
                stroke="#C58D38"
                strokeWidth="1.5"
              />
              {/* Bow Center Gem with Palm motif */}
              <circle cx="80" cy="46" r="7" fill="#E6B366" stroke="#9A6B22" strokeWidth="1.5" />
            </g>

            {/* Gradients */}
            <defs>
              <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1D0" />
                <stop offset="45%" stopColor="#DFB06C" />
                <stop offset="100%" stopColor="#9A6B22" />
              </linearGradient>
              <linearGradient id="boxInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E7A4C" />
                <stop offset="100%" stopColor="#082A19" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenBox}
          disabled={isOpening}
          className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#9E6A1C] text-[#221504] font-bold text-base shadow-lg hover:from-[#E6B366] hover:to-[#B27924] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-[#221504]" />
          <span>{isOpening ? "جاري كشف الهدية..." : "اضغط لفتح الصندوق!"}</span>
        </button>
      </div>
    </div>
  );
};
