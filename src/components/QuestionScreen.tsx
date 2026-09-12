import React, { useState } from "react";
import type { Question, QuizOption } from "../data/quizData";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { soundManager } from "../utils/soundEffects";

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswerSelected: (selectedOption: QuizOption) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSelected,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleSelect = (option: QuizOption) => {
    if (hasConfirmed) return;
    setSelectedOptionId(option.id);
    soundManager.playClick();
  };

  const handleNext = () => {
    if (!selectedOptionId) return;
    const selected = question.options.find((o) => o.id === selectedOptionId);
    if (!selected) return;

    setHasConfirmed(true);
    soundManager.playClick();

    setTimeout(() => {
      onAnswerSelected(selected);
      setSelectedOptionId(null);
      setHasConfirmed(false);
    }, 250);
  };

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col min-h-full justify-between pb-4 px-4 sm:px-5 animate-fadeIn select-none font-almarai">
      {/* Top Section: Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-emerald-200/90 font-medium mb-2 px-1">
          <span className="font-extrabold text-[#DFB06C] text-sm tracking-wide">
            {question.questionNumberText}
          </span>
          <span className="bg-[#082819] px-3.5 py-1 rounded-full border border-[#C58D38]/40 font-bold text-[#DFB06C] text-xs shadow-inner">
            {currentIndex + 1} من {totalQuestions}
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-2.5 rounded-full bg-[#072416] overflow-hidden border border-[#C58D38]/30 shadow-inner">
          <div
            className="h-full bg-gradient-to-l from-[#E6B366] via-[#C58D38] to-[#125433] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(230,179,102,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Card (Luxury desert parchment aesthetic) */}
        <div className="mt-4 bg-[#FAF7F0] border-2 border-[#E3D7C1] rounded-3xl p-4 sm:p-5 shadow-xl text-[#2B1B06] relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#125433_1px,transparent_1px)] [background-size:20px_20px] opacity-5 pointer-events-none" />

          <div className="inline-block px-3 py-1 rounded-full bg-[#EADCC5] text-[#5C370D] text-[11px] font-extrabold mb-2.5 shadow-sm">
            {question.questionNumberText}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#1C140C] leading-snug mb-4 tracking-tight">
            {question.title}
          </h2>

          {/* Options List with Real Food Photos */}
          <div className="space-y-2.5">
            {question.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between transition-all duration-200 text-right border-2 cursor-pointer ${
                    isSelected
                      ? "bg-[#0D3E25] border-[#C58D38] text-white shadow-lg scale-[1.01] ring-2 ring-[#C58D38]/40"
                      : "bg-white border-[#E7DECD] text-[#2B1B06] hover:border-[#C58D38]/60 hover:bg-[#FDFBF7]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Realistic Food Photography Thumbnail */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#C58D38]/30 shadow-md relative bg-[#EFE8DA]">
                      {option.image ? (
                        <img
                          src={option.image}
                          alt={option.text}
                          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#FAF7F0] flex items-center justify-center text-xs font-bold text-[#8A5A29]">
                          رغفان
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col text-right">
                      <span className={`font-extrabold text-base sm:text-lg leading-tight ${
                        isSelected ? "text-white" : "text-[#1C140C]"
                      }`}>
                        {option.text}
                      </span>
                      {option.subtitle && (
                        <span className={`text-[11px] sm:text-xs mt-0.5 font-medium ${
                          isSelected ? "text-emerald-200/90" : "text-[#7A6145]"
                        }`}>
                          {option.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? "border-[#DFB06C] bg-[#DFB06C] text-[#0D3E25]"
                        : "border-[#D0C2AB] bg-transparent"
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-[#0D3E25] fill-current" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-transparent" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: CTA & Slogan */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedOptionId || hasConfirmed}
          className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            selectedOptionId
              ? "bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#A36E20] hover:from-[#E6B366] hover:to-[#B57C26] text-[#2B1B06] cursor-pointer active:scale-[0.98] shadow-[#C58D38]/30"
              : "bg-[#0D3E25]/50 text-emerald-300/30 border border-[#C58D38]/20 cursor-not-allowed"
          }`}
        >
          <span>{currentIndex + 1 === totalQuestions ? "عرض النتيجة" : "السؤال التالي"}</span>
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Bottom Slogan */}
        <div className="flex items-center justify-center gap-2 text-xs text-emerald-200/90 font-medium pb-1">
          <span className="text-sm text-[#C58D38]">🌴</span>
          <span className="tracking-wide font-semibold">{question.slogan}</span>
          <span className="text-sm text-[#C58D38]">🌴</span>
        </div>
      </div>
    </div>
  );
};
