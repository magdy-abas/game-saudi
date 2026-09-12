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
    sm: "w-6 h-4",
    md: "w-8 h-5.5",
    lg: "w-11 h-7.5",
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center rounded overflow-hidden shadow-sm border border-emerald-600/40 select-none shrink-0 ${dimensions} ${className}`}
      title="علم المملكة العربية السعودية"
    >
      <img
        src="/assets/saudi_flag.svg"
        alt="علم المملكة العربية السعودية"
        className="w-full h-full object-cover object-center"
      />
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
