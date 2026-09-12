import React, { useRef, useState } from "react";
import type { ScoreFeedback, Prize } from "../data/quizData";
import { BrandLogo } from "./BrandLogo";
import { HeritageIllustration } from "./HeritageIllustration";
import { Download, X, Check, Sparkles } from "lucide-react";
import { toPng } from "html-to-image";
import { soundManager } from "../utils/soundEffects";
import { SaudiFlag } from "./SaudiFlag";

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  scoreFeedback: ScoreFeedback;
  prize?: Prize;
  promoCode?: string;
}

export const StoryCardModal: React.FC<StoryCardModalProps> = ({
  isOpen,
  onClose,
  scoreFeedback,
  prize,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [playerName, setPlayerName] = useState("بطل التراث");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    if (!cardRef.current || isDownloading) return;
    setIsDownloading(true);
    soundManager.playClick();

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `اختبر-سعوديتك-رغفان-${scoreFeedback.percentage}.png`;
      link.href = dataUrl;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-sm flex flex-col items-center my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 left-0 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Customization input */}
        <div className="w-full bg-[#14452B] border border-[#C58D38]/40 rounded-2xl p-2.5 mb-3 flex items-center gap-2">
          <span className="text-xs text-[#DFB06C] shrink-0 font-medium">اسمك بالكرت:</span>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={25}
            className="flex-1 bg-black/30 border border-white/20 rounded-lg px-2.5 py-1 text-white text-xs font-semibold focus:outline-none focus:border-[#DFB06C]"
            placeholder="اكتب اسمك للمشاركة..."
          />
        </div>

        {/* The 9:16 Vertical Story Card (To be exported as image) */}
        <div
          ref={cardRef}
          className="w-full aspect-[9/16] bg-gradient-to-b from-[#072416] via-[#0E3D25] to-[#061A10] border-2 border-[#C58D38] rounded-3xl p-5 flex flex-col justify-between text-center relative overflow-hidden shadow-2xl"
          style={{ minHeight: "560px" }}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#DFB06C_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          {/* Top Brand & National Header */}
          <div className="relative z-10 flex flex-col items-center">
            {/* National Day Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#165A37]/80 border border-[#C58D38]/40 text-[#DFB06C] text-[11px] font-bold mb-2 shadow">
              <SaudiFlag size="sm" />
              <span>اليوم الوطني السعودي 96</span>
              <span className="opacity-50">•</span>
              <span>فخر .. جذور .. واثقة</span>
            </div>

            {/* Brand Logo */}
            <BrandLogo variant="light" size="md" />
          </div>

          {/* Centerpiece: Masmak, Gauge & Score */}
          <div className="relative z-10 my-auto flex flex-col items-center">
            <div className="w-full max-w-[240px] rounded-2xl overflow-hidden border border-[#C58D38]/30 shadow-lg mb-3">
              <HeritageIllustration variant="hero" />
            </div>

            {/* Player Name Banner */}
            <div className="inline-block px-4 py-1 rounded-full bg-[#DFB06C] text-[#1E3E2B] text-xs font-black shadow-md mb-2">
              {playerName || "مشارك أصيل"}
            </div>

            {/* Score Big Title */}
            <h2 className="text-3xl font-black font-tajawal text-white tracking-wide drop-shadow-md flex items-center justify-center gap-2">
              <span>سعوديتك {scoreFeedback.percentage}%</span>
              <SaudiFlag size="md" />
            </h2>

            {/* Proud / Funny Subtitle */}
            <p className="text-sm font-bold text-[#E6B366] mt-1 font-tajawal">
              {scoreFeedback.subtitle}
            </p>

            {/* Won Prize mention if available */}
            {prize && (
              <div className="mt-3 px-4 py-2 rounded-xl bg-[#092B19]/90 border border-[#C58D38]/40 inline-flex items-center gap-2.5 text-xs text-white shadow-md">
                {prize.image && (
                  <img src={prize.image} alt="" className="w-7 h-7 rounded-lg object-cover border border-[#DFB06C] shadow" />
                )}
                <span>هدية رغفان:</span>
                <span className="font-bold text-[#DFB06C]">{prize.title}</span>
              </div>
            )}
          </div>

          {/* Bottom Card Footer: Slogan & QR Prompt */}
          <div className="relative z-10 pt-3 border-t border-[#C58D38]/30 flex flex-col items-center gap-1">
            <p className="text-[11px] font-bold text-[#DFB06C]">
              «اختبر سعوديتك… وكل نتيجة فيها هدية!»
            </p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-200/80">
              <span>مذاق من أرضنا لكل يوم</span>
              <span>•</span>
              <span>رغفان RUGHFAN</span>
            </div>
          </div>
        </div>

        {/* Download Button Action */}
        <button
          onClick={handleDownloadImage}
          disabled={isDownloading}
          className="mt-3.5 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#9E6A1C] text-[#221504] font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-5 h-5 text-[#0F4C2E]" />
              <span>تم حفظ الصورة بنجاح! 📸</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>{isDownloading ? "جاري تجهيز الصورة..." : "تحميل كرت الستوري بجودة عالية"}</span>
              <Sparkles className="w-4 h-4 text-[#221504]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
