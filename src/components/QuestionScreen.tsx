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
    <div className="flex flex-col min-h-full justify-between pb-4 px-4 animate-fadeIn select-none">
      {/* Top Section: Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-emerald-200/90 font-medium mb-2 px-1">
          <span className="font-bold text-[#DFB06C] text-sm">{question.questionNumberText}</span>
          <span className="bg-[#0A2E1C] px-3 py-0.5 rounded-full border border-[#C58D38]/30 font-bold text-[#DFB06C]">
            {currentIndex + 1} من {totalQuestions}
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-2 rounded-full bg-[#0E3520] overflow-hidden border border-[#C58D38]/20">
          <div
            className="h-full bg-gradient-to-l from-[#E6B366] via-[#C58D38] to-[#166E40] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Card (Sand / Parchment aesthetic from mockup) */}
        <div className="mt-5 bg-[#FAF7F0] border-2 border-[#E3D7C1] rounded-3xl p-5 shadow-lg text-[#2B1B06]">
          <div className="inline-block px-3 py-0.5 rounded-full bg-[#EADCC5] text-[#7A4B13] text-xs font-bold mb-2">
            {question.questionNumberText}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-tajawal text-[#1C140C] leading-snug mb-5">
            {question.title}
          </h2>

          {/* Options List */}
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedOptionId === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option)}
                  className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-between transition-all duration-200 text-right border-2 ${
                    isSelected
                      ? "bg-[#0F4C2E] border-[#C58D38] text-white shadow-md scale-[1.01]"
                      : "bg-white border-[#E7DECD] text-[#2B1B06] hover:border-[#C58D38]/50 hover:bg-[#FDFBF7]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Option Icon / Emoji */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner ${
                        isSelected ? "bg-[#16633D]" : "bg-[#F5EFE4]"
                      }`}
                    >
                      {option.emoji || "✨"}
                    </div>

                    <span className="font-semibold text-base sm:text-lg">
                      {option.text}
                    </span>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? "border-[#DFB06C] bg-[#DFB06C] text-[#0F4C2E]"
                        : "border-[#D0C2AB] bg-transparent"
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-[#0F4C2E] fill-current" />
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

      {/* Bottom Section: CTA & Traditional Slogan */}
      <div className="mt-6 flex flex-col items-center gap-4">
        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!selectedOptionId || hasConfirmed}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
            selectedOptionId
              ? "bg-gradient-to-r from-[#DFB06C] via-[#C58D38] to-[#A36E20] text-[#2B1B06] cursor-pointer active:scale-[0.98] shadow-[#C58D38]/30"
              : "bg-[#133F27]/60 text-emerald-300/40 border border-[#C58D38]/20 cursor-not-allowed"
          }`}
        >
          <span>{currentIndex + 1 === totalQuestions ? "عرض النتيجة" : "السؤال التالي"}</span>
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Bottom Slogan matching mockups with palm decorations */}
        <div className="flex items-center justify-center gap-2 text-xs text-emerald-200/90 font-medium pb-2">
          <span className="text-base text-[#C58D38]">🌴</span>
          <span className="tracking-wide">{question.slogan}</span>
          <span className="text-base text-[#C58D38]">🌴</span>
        </div>
      </div>
    </div>
  );
};
