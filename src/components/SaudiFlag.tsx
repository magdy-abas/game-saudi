import React from "react";

interface SaudiFlagProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const SaudiFlag: React.FC<SaudiFlagProps> = ({
  className = "",
  size = "md",
}) => {
  const dimensions = {
    sm: "w-5 h-3.5",
    md: "w-7 h-5",
    lg: "w-10 h-7",
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center rounded overflow-hidden shadow-sm border border-emerald-700/40 select-none ${dimensions} ${className}`}
      title="المملكة العربية السعودية"
    >
      <svg
        viewBox="0 0 30 20"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Saudi Emerald Green Base */}
        <rect width="30" height="20" fill="#0E773E" />

        {/* Stylized White Shahada Calligraphy Bar */}
        <path
          d="M6 8.5 Q15 7.5 24 8.5"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line x1="8" y1="6.8" x2="22" y2="6.8" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" />

        {/* Saudi Ceremonial Sword */}
        <g transform="translate(0, 1.5)">
          {/* Blade */}
          <line x1="8" y1="11.5" x2="22" y2="11.5" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" />
          {/* Hilt and Crossguard */}
          <line x1="21.5" y1="10" x2="21.5" y2="13" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="23" y1="11.5" x2="21.5" y2="11.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </span>
  );
};

export const SaudiEmblem: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <span className={`inline-flex items-center justify-center text-[#C58D38] select-none ${className}`}>
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        {/* Palm Tree */}
        <path d="M12 2C12 5 10 7 7 8C10 8.5 11.5 10 12 12C12.5 10 14 8.5 17 8C14 7 12 5 12 2Z" />
        <path d="M12 7C12 9 9 10 6 10.5C9 11.5 11 13 11.5 15C12 15 12 16 12 17H12.5V15C13 13 15 11.5 18 10.5C15 10 12 9 12 7Z" />
        <path d="M11.5 16H12.5V22H11.5V16Z" />
        {/* Crossed Swords Base */}
        <path d="M5 21L19 15M19 21L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
};
