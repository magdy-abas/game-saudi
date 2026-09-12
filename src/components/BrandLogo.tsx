import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: "sm" | "md" | "lg";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const containerClasses = {
    sm: "w-14 h-14 sm:w-16 sm:h-16 p-1.5",
    md: "w-20 h-20 sm:w-24 sm:h-24 p-2",
    lg: "w-28 h-28 sm:w-32 sm:h-32 p-2.5",
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official Rughfan emblem seal */}
      <div
        className={`${containerClasses} rounded-full bg-[#FAF7F0] border-2 border-[#C58D38] ring-2 ring-[#DFB06C]/30 shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex items-center justify-center overflow-hidden transform hover:scale-105 transition-transform`}
      >
        <img
          src="/assets/logo.png"
          alt="رغفان - RUGHFAN"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};
