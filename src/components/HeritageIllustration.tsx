import React from "react";

interface HeritageIllustrationProps {
  className?: string;
  variant?: "hero" | "compact" | "subtle";
}

export const HeritageIllustration: React.FC<HeritageIllustrationProps> = ({
  className = "",
  variant = "hero",
}) => {
  if (variant === "subtle") {
    return (
      <div className={`relative w-full overflow-hidden opacity-25 pointer-events-none select-none ${className}`}>
        <svg viewBox="0 0 400 60" className="w-full h-auto fill-[#C58D38]">
          <path d="M0 60 L20 40 L40 60 L60 40 L80 60 L100 40 L120 60 L140 40 L160 60 L180 40 L200 60 L220 40 L240 60 L260 40 L280 60 L300 40 L320 60 L340 40 L360 60 L380 40 L400 60 Z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden select-none group ${className}`}>
      {/* Real Cinematic Saudi Heritage Fortress with Waving Flag & Glowing Rughfan Logo */}
      <div className="relative w-full h-44 sm:h-52 overflow-hidden">
        <img
          src="/assets/hero_fortress.jpg"
          alt="قصر المصمك والعلم السعودي - رغفان"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Soft Vignette & Bottom Gradient to blend seamlessly with the dark emerald frame */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3B24] via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>
    </div>
  );
};
