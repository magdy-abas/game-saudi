import React from "react";
import { BrandLogo } from "./BrandLogo";
import { ChevronRight, Volume2, VolumeX } from "lucide-react";
import { soundManager } from "../utils/soundEffects";

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  variant?: "dark" | "light";
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  onBack,
  variant = "light",
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="relative w-full px-5 pt-3.5 pb-2 flex items-center justify-between z-20">
      {/* Back Button or placeholder */}
      <div className="w-9 flex items-center justify-start">
        {showBack ? (
          <button
            onClick={() => {
              soundManager.playClick();
              onBack?.();
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
              variant === "dark"
                ? "bg-black/30 border border-white/20 text-white hover:bg-black/50 active:scale-95"
                : "bg-black/5 text-[#2B231B] hover:bg-black/10 active:scale-95"
            }`}
            title="رجوع"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9 h-9"></div>
        )}
      </div>

      {/* Brand Logo */}
      <BrandLogo variant={variant === "dark" ? "light" : "dark"} size="sm" />

      {/* Sound Mute Toggle */}
      <div className="w-9 flex items-center justify-end">
        <button
          onClick={onToggleMute}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm ${
            variant === "dark"
              ? "bg-black/30 border border-white/20 text-white hover:bg-black/50 active:scale-95"
              : "bg-black/5 text-[#2B231B] hover:bg-black/10"
          }`}
          title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
