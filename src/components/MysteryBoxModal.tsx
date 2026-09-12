import React, { useState } from "react";
import { Sparkles, Gift } from "lucide-react";
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
    const colors = ["#C58D38", "#125433", "#DFB06C", "#FFFFFF", "#F5D485"];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn font-almarai">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#082416] via-[#0D3E25] to-[#04160C] border-2 border-[#C58D38] rounded-3xl p-5 text-center shadow-2xl overflow-hidden flex flex-col items-center">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#DFB06C_0%,transparent_70%)] opacity-20 pointer-events-none" />

        {/* Modal Header Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#125433] border border-[#C58D38]/50 text-[#DFB06C] text-xs font-bold mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#E6B366]" />
          <span>صندوق الحظ من رغفان</span>
          <Sparkles className="w-3.5 h-3.5 text-[#E6B366]" />
        </div>

        <h3 className="text-2xl font-black text-white mb-1 tracking-tight">
          هديتك الفورية جاهزة!
        </h3>
        <p className="text-xs text-emerald-200/90 mb-4 font-medium">
          المكافأة مضمونة للجميع.. انقر لفتح الصندوق
        </p>

        {/* Realistic Saudi Royal Chest Image */}
        <div
          onClick={handleOpenBox}
          className={`relative cursor-pointer my-2 rounded-2xl overflow-hidden border-2 border-[#C58D38] shadow-[0_15px_35px_rgba(0,0,0,0.7)] transform transition-all duration-500 ${
            isOpening
              ? "scale-105 filter brightness-125 shadow-[0_0_40px_rgba(230,179,102,0.8)]"
              : "hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          <div className="w-64 h-56 relative bg-black">
            <img
              src="/assets/box_luxury.jpg"
              alt="صندوق هدايا رغفان الفاخر"
              className="w-full h-full object-cover object-center"
            />
            {/* Pulsing Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-1.5 text-xs font-black text-[#DFB06C] drop-shadow-md">
              <Gift className="w-4 h-4 text-[#E6B366] animate-bounce" />
              <span>انقر لفتح الصندوق 🎁</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenBox}
          disabled={isOpening}
          className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#A36E20] hover:from-[#E6B366] hover:to-[#B57C26] text-[#2B1B06] font-black text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <Sparkles className="w-5 h-5 text-[#2B1B06]" />
          <span>{isOpening ? "جاري كشف الهدية..." : "افتح حظك الآن"}</span>
        </button>
      </div>
    </div>
  );
};
