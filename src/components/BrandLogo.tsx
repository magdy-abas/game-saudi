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
    sm: "w-11 h-11 p-1",
    md: "w-16 h-16 sm:w-20 sm:h-20 p-1.5",
    lg: "w-24 h-24 p-2",
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Official Rughfan emblem seal */}
      <div
        className={`${containerClasses} rounded-full bg-[#FAF7F0] border-2 border-[#C58D38]/60 shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex items-center justify-center overflow-hidden transform hover:scale-105 transition-transform`}
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
