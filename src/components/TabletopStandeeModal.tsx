import React, { useState, useEffect, useRef } from "react";
import { BrandLogo } from "./BrandLogo";
import { Printer, Download, X, QrCode as QrIcon } from "lucide-react";
import QRCode from "qrcode";
import { toPng } from "html-to-image";
import { soundManager } from "../utils/soundEffects";

interface TabletopStandeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TabletopStandeeModal: React.FC<TabletopStandeeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const standeeRef = useRef<HTMLDivElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    setTargetUrl(currentUrl);

    QRCode.toDataURL(currentUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: "#3B2513",
        light: "#FFFFFF",
      },
    }).then((url) => {
      setQrDataUrl(url);
    }).catch(() => {});
  }, []);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownloadStandee = async () => {
    if (!standeeRef.current || isPrinting) return;
    setIsPrinting(true);
    soundManager.playClick();

    try {
      const dataUrl = await toPng(standeeRef.current, {
        quality: 0.95,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `ستاند-طاولة-اختبر-سعوديتك-رغفان.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#1A221E] border border-[#C58D38]/40 rounded-3xl p-5 my-auto text-white shadow-2xl flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-3">
          <QrIcon className="w-5 h-5 text-[#DFB06C]" />
          <h3 className="text-lg font-bold font-tajawal text-[#DFB06C]">
            تصميم ستاند الطاولة المطبوع (Tabletop Tent)
          </h3>
        </div>

        <p className="text-xs text-emerald-200/80 mb-4 text-center">
          هذا التصميم مطابق للوحة الطاولات داخل فروع رغفان مع رمز QR حقيقي يوجه للعبة مباشرة.
        </p>

        {/* Printable Standee Preview Container (Matching Image 1) */}
        <div
          ref={standeeRef}
          className="w-full bg-[#FAF7F0] border-4 border-[#D8C7AA] rounded-2xl p-6 text-[#2B1B06] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Left: Tabletop Standee Card */}
          <div className="w-full md:w-1/2 bg-white border-2 border-[#DFD4C0] rounded-2xl p-5 text-center shadow-md flex flex-col items-center">
            {/* Header */}
            <div className="flex items-center justify-center gap-1 text-[#C58D38] text-sm font-bold mb-1">
              <span>✨</span>
              <span>☕</span>
            </div>
            <h4 className="text-2xl font-black font-tajawal text-[#3B2513] mb-3">
              اختبر سعوديتك!
            </h4>

            {/* QR Code Container */}
            <div className="relative p-3 bg-white rounded-2xl border-2 border-[#C58D38]/60 shadow-inner">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Standee QR" className="w-44 h-44 object-contain mx-auto" />
              ) : (
                <div className="w-44 h-44 bg-[#F2ECE1] flex items-center justify-center text-xs text-[#7A5832]">
                  جاري توليد الـ QR...
                </div>
              )}
            </div>

            {/* Description under QR */}
            <p className="text-xs font-bold text-[#3B2513] mt-3">
              امسح الكود وشارك في اللعبة!
            </p>
            <p className="text-[11px] text-[#6B4B27] mt-0.5 flex items-center justify-center gap-1">
              <span>فوازير وألغاز عن أكلاتنا وتراثنا!</span>
              <span>🇸🇦</span>
            </p>
            {targetUrl && (
              <p className="text-[9px] text-[#805F38]/70 font-mono mt-1 break-all max-w-[200px] truncate">
                {targetUrl}
              </p>
            )}

            {/* Brand in card */}
            <div className="mt-4 pt-3 border-t border-[#E8DFCF] w-full flex flex-col items-center">
              <BrandLogo variant="dark" size="sm" />
              <span className="text-[10px] text-[#805F38] mt-1 font-medium">
                رغفان أصيل وطعم لا يقاوم
              </span>
            </div>
          </div>

          {/* Right: How to play steps (From Image 1) */}
          <div className="w-full md:w-1/2 space-y-3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#523318] text-[#F7E6D0] text-xs font-black shadow mb-1">
              طريقة اللعبة 👇
            </div>

            {/* Step 1 */}
            <div className="bg-white/90 border border-[#E0D4C1] rounded-xl p-3 flex items-start gap-3 shadow-sm">
              <span className="text-2xl shrink-0">📱</span>
              <div className="text-right">
                <div className="text-xs font-black text-[#3B2513]">الخطوة ١:</div>
                <div className="text-xs text-[#593E20] leading-snug">
                  امسح الـ QR كود باستخدام كاميرا جوالك.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/90 border border-[#E0D4C1] rounded-xl p-3 flex items-start gap-3 shadow-sm">
              <span className="text-2xl shrink-0">❓</span>
              <div className="text-right">
                <div className="text-xs font-black text-[#3B2513]">الخطوة ٢:</div>
                <div className="text-xs text-[#593E20] leading-snug">
                  أجب على أسئلة ممتعة عن تراث الأكل السعودي (مثال: وش الحلى الوطني؟).
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/90 border border-[#E0D4C1] rounded-xl p-3 flex items-start gap-3 shadow-sm">
              <span className="text-2xl shrink-0">🎁</span>
              <div className="text-right">
                <div className="text-xs font-black text-[#3B2513]">الخطوة ٣:</div>
                <div className="text-xs text-[#593E20] leading-snug">
                  ستحصل على نقاط وخصومات وهدايا حصرية من <strong className="text-[#0F4C2E]">رغفان</strong>!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Standee Action Controls */}
        <div className="flex items-center gap-3 mt-4 w-full">
          <button
            onClick={handleDownloadStandee}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFB06C] to-[#C58D38] text-[#221504] font-bold text-xs flex items-center justify-center gap-2 shadow hover:opacity-95"
          >
            <Download className="w-4 h-4" />
            <span>تحميل تصميم الستاند (PNG)</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
