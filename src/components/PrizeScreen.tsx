import React, { useState, useEffect } from "react";
import type { Prize } from "../data/quizData";
import { Copy, Check, Share2, Download, QrCode, User, Receipt, ShieldCheck } from "lucide-react";
import { soundManager } from "../utils/soundEffects";
import QRCode from "qrcode";

interface PrizeScreenProps {
  prize: Prize;
  promoCode: string;
  scorePercentage: number;
  customerName?: string;
  orderNumber?: string;
  isExistingSession?: boolean;
  onOpenStoryCard: () => void;
}

export const PrizeScreen: React.FC<PrizeScreenProps> = ({
  prize,
  promoCode,
  scorePercentage,
  customerName = "",
  orderNumber = "",
  isExistingSession = false,
  onOpenStoryCard,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    // Generate QR Code data URL for cashier scanning
    QRCode.toDataURL(
      `RUGHFAN-VOUCHER:${promoCode}|ORDER:${orderNumber}|NAME:${customerName}|PRIZE:${prize.id}`,
      {
        width: 160,
        margin: 1,
        color: {
          dark: "#0F4C2E",
          light: "#FFFFFF",
        },
      }
    )
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch(() => {});
  }, [promoCode, prize.id, orderNumber, customerName]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    soundManager.playClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    soundManager.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "اختبر سعوديتك مع رغفان 🇸🇦",
          text: `حققت ${scorePercentage}% في اختبار سعوديتك وربحت ${prize.title} من رغفان بمناسبة اليوم الوطني! 🎁`,
          url: window.location.href,
        });
      } catch {
        onOpenStoryCard();
      }
    } else {
      onOpenStoryCard();
    }
  };

  return (
    <div className="flex flex-col min-h-full justify-between pb-3 px-5 animate-fadeIn select-none">
      {/* Top Section */}
      <div className="flex flex-col items-center">
        {/* Existing device session banner */}
        {isExistingSession && (
          <div className="w-full bg-[#124B2C]/90 border border-[#C58D38]/50 rounded-xl py-1.5 px-3 mb-2 flex items-center justify-center gap-1.5 text-xs text-[#E6B366] shadow">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>هديتك محفوظة لهذا الجهاز ومتاحة للاستلام 🎁</span>
          </div>
        )}

        {/* Celebration Title */}
        <div className="text-center my-1.5">
          <h2 className="text-3xl font-extrabold text-[#E6B366] font-tajawal drop-shadow-md flex items-center justify-center gap-2">
            <span>مبروك {customerName || "يا بطل"}!</span>
            <span className="text-2xl">🎉</span>
          </h2>
          <p className="text-xs text-emerald-200/90 mt-0.5">
            تستاهل الهدية والعلوم الغانمة من رغفان
          </p>
        </div>

        {/* Prize Card */}
        <div className="w-full bg-[#FAF7F0] border-2 border-[#E3D7C1] rounded-3xl p-4 sm:p-5 shadow-xl text-center relative overflow-hidden mt-1">
          {/* Visual Showcase Box */}
          <div className="w-full h-32 rounded-2xl bg-gradient-to-b from-[#EFE8DA] to-[#DFD3BE] border border-[#D5C6AC] flex flex-col items-center justify-center relative overflow-hidden shadow-inner mb-2.5">
            <div className="text-5xl drop-shadow-md transform hover:scale-110 transition-transform duration-300">
              {prize.icon}
            </div>

            {prize.isRare && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                جائزة كبرى 👑
              </div>
            )}
          </div>

          {/* Customer & Order Badge info */}
          {(customerName || orderNumber) && (
            <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-[#6D4C28] mb-1.5 bg-[#F2EADA] py-1 px-2.5 rounded-lg">
              {customerName && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3 text-[#C58D38]" />
                  <span>{customerName}</span>
                </span>
              )}
              {orderNumber && (
                <span className="flex items-center gap-1">
                  <Receipt className="w-3 h-3 text-[#C58D38]" />
                  <span>طلب #{orderNumber}</span>
                </span>
              )}
            </div>
          )}

          {/* Prize Texts */}
          <div className="text-[11px] text-[#8A5A29] font-bold">ربحت:</div>
          <h3 className="text-xl sm:text-2xl font-black font-tajawal text-[#15462C] mt-0.5 leading-snug">
            {prize.title}
          </h3>

          <div className="inline-block px-3 py-0.5 rounded-full bg-[#EADCC5] text-[#7A4B13] text-[10px] font-bold my-1">
            {prize.badge}
          </div>

          <p className="text-xs text-[#523A1D] mt-0.5 leading-relaxed max-w-xs mx-auto">
            {prize.description}
          </p>

          {/* Unique Coupon Voucher Section */}
          <div className="mt-3.5 pt-3 border-t border-[#E0D3BC] flex flex-col items-center">
            <span className="text-[11px] font-bold text-[#7C6348] mb-1">
              كود هديتك الحصري (أظهره للكاشير):
            </span>

            {/* Coupon Code Pill */}
            <div className="w-full bg-white border-2 border-dashed border-[#C58D38] rounded-xl p-2 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[#0F4C2E] shrink-0" />
                <span className="font-mono font-black text-base tracking-wider text-[#0F4C2E]">
                  {promoCode}
                </span>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1 rounded-lg bg-[#0F4C2E] hover:bg-[#14613B] text-[#DFB06C] text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span>تم!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>

            {/* Cashier QR code */}
            {qrDataUrl && (
              <div className="mt-2 flex items-center gap-2 bg-white/80 px-2.5 py-1 rounded-lg border border-[#E3D7C1]">
                <img src={qrDataUrl} alt="Cashier QR" className="w-9 h-9 rounded" />
                <span className="text-[10px] text-[#5C452C] text-right leading-tight">
                  مسح سريع للكاشير عند المحاسبة داخل الفرع
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="mt-3 space-y-2">
        <button
          onClick={handleNativeShare}
          className="w-full py-3 px-6 rounded-2xl bg-[#0F4C2E] hover:bg-[#155C39] border border-[#C58D38]/50 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#DFB06C]" />
          <span>شارك نتيجتك 📤</span>
        </button>

        <button
          onClick={onOpenStoryCard}
          className="w-full py-3 px-6 rounded-2xl bg-white/95 hover:bg-white text-[#2B1B06] font-bold text-sm shadow flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[#D5C6AC] cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#C58D38]" />
          <span>حفظ كرت الستوري 📥</span>
        </button>

        {/* Notice */}
        <div className="text-center pt-0.5">
          <p className="text-[10px] text-emerald-200/80 font-medium flex items-center justify-center gap-1">
            <span>🛍️</span>
            <span>{prize.terms}</span>
          </p>
        </div>

        {/* Footer: Powered by hbbah.com */}
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
