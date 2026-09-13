import { useState, useEffect, useMemo } from "react";
import {
  FIXED_QUESTIONS,
  getScoreFeedback,
  drawPrize,
  generatePromoCode,
  type QuizOption,
  type Prize,
  type UserSavedSession,
} from "./data/quizData";
import { Header } from "./components/Header";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuestionScreen } from "./components/QuestionScreen";
import { ResultScreen } from "./components/ResultScreen";
import { PrizeScreen } from "./components/PrizeScreen";
import { MysteryBoxModal } from "./components/MysteryBoxModal";
import { StoryCardModal } from "./components/StoryCardModal";
import { soundManager } from "./utils/soundEffects";

type ScreenState = "welcome" | "question" | "result" | "prize";
const STORAGE_KEY = "rughfan_quiz_session_v1";

// ✅ مفتاح تفعيل حفظ الجلسة في localStorage مفعل للإنتاج (محاولة واحدة لكل جهاز)
export const ENABLE_LOCAL_STORAGE_LOCK = true;

export function App() {
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const initialScreen = (urlParams.get("screen") as ScreenState) || "welcome";

  // Navigation & Customer State
  const [screen, setScreen] = useState<ScreenState>(initialScreen);
  const [customerName, setCustomerName] = useState<string>(urlParams.get("name") || "عبد العزيز");
  const [phoneNumber, setPhoneNumber] = useState<string>(urlParams.get("phone") || urlParams.get("order") || "0501234567");
  const [questionIndex, setQuestionIndex] = useState<number>(() => Number(urlParams.get("q") || 0));
  const [selectedAnswers, setSelectedAnswers] = useState<QuizOption[]>([]);
  const [isExistingSession, setIsExistingSession] = useState<boolean>(
    () => urlParams.get("existing") === "1"
  );

  // Sound State
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.isMuted);

  // Modals
  const [isMysteryBoxOpen, setIsMysteryBoxOpen] = useState(false);
  const [isStoryCardOpen, setIsStoryCardOpen] = useState(false);

  // Result & Prize State
  const [drawnPrize, setDrawnPrize] = useState<Prize>(() => drawPrize());
  const [promoCode, setPromoCode] = useState<string>(() => generatePromoCode(drawnPrize));
  const [savedScorePercentage, setSavedScorePercentage] = useState<number>(100);

  // Check LocalStorage on initial load (Disabled while testing mode is active)
  useEffect(() => {
    if (!ENABLE_LOCAL_STORAGE_LOCK) {
      // وضع التجربة: حذف أي جلسة محفوظة سابقة لضمان بدء محاولة جديدة كل مرة
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return;
    }

    try {
      const existingData = localStorage.getItem(STORAGE_KEY);
      if (existingData) {
        const session: UserSavedSession = JSON.parse(existingData);
        if (session && session.promoCode && session.prize) {
          setCustomerName(session.customerName || "");
          setPhoneNumber(session.phoneNumber || session.orderNumber || "");
          setDrawnPrize(session.prize);
          setPromoCode(session.promoCode);
          setSavedScorePercentage(session.scorePercentage ?? 100);
          setIsExistingSession(true);
          setScreen("prize"); // Directly show their won prize!
        }
      }
    } catch {
      // Ignore local storage parse error
    }
  }, []);

  const currentQuestions = FIXED_QUESTIONS;
  const currentQuestion = currentQuestions[questionIndex] || currentQuestions[0];

  // Calculated Score
  const correctCount = useMemo(() => {
    return selectedAnswers.filter((a) => a.isCorrect).length;
  }, [selectedAnswers]);

  const scoreFeedback = useMemo(() => {
    return getScoreFeedback(correctCount, currentQuestions.length);
  }, [correctCount, currentQuestions.length]);

  // Handlers
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleStartGame = (name: string, phone: string) => {
    setCustomerName(name);
    setPhoneNumber(phone);
    setQuestionIndex(0);
    setSelectedAnswers([]);
    setScreen("question");
  };

  const handleAnswerSelected = (selectedOption: QuizOption) => {
    const updatedAnswers = [...selectedAnswers, selectedOption];
    setSelectedAnswers(updatedAnswers);

    if (questionIndex + 1 < currentQuestions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Finished all 3 questions!
      const finalPrize = drawPrize();
      const finalCode = generatePromoCode(finalPrize);
      const calculatedScore = Math.round(((updatedAnswers.filter((a) => a.isCorrect).length) / currentQuestions.length) * 100);

      setDrawnPrize(finalPrize);
      setPromoCode(finalCode);
      setSavedScorePercentage(calculatedScore);

      // Lock session to device (One attempt per device - active only when ENABLE_LOCAL_STORAGE_LOCK is true)
      if (ENABLE_LOCAL_STORAGE_LOCK) {
        const sessionData: UserSavedSession = {
          customerName: customerName,
          phoneNumber: phoneNumber,
          orderNumber: phoneNumber,
          prize: finalPrize,
          promoCode: finalCode,
          scorePercentage: calculatedScore,
          correctCount: updatedAnswers.filter((a) => a.isCorrect).length,
          completedAt: new Date().toISOString(),
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionData));
        } catch {
          // Storage fallback
        }
      }

      setScreen("result");
    }
  };

  const handlePlayAgain = () => {
    setQuestionIndex(0);
    setSelectedAnswers([]);
    setCustomerName("");
    setPhoneNumber("");
    setIsExistingSession(false);
    setScreen("welcome");
  };

  const handleBack = () => {
    if (screen === "question") {
      if (questionIndex > 0) {
        setQuestionIndex((prev) => prev - 1);
        setSelectedAnswers((prev) => prev.slice(0, -1));
      } else {
        setScreen("welcome");
      }
    }
  };

  const handleOpenMysteryBox = () => {
    setIsMysteryBoxOpen(true);
  };

  const handleMysteryBoxRevealed = () => {
    setIsMysteryBoxOpen(false);
    setScreen("prize");
  };

  return (
    <main className="min-h-screen bg-[#0A100C] py-0 sm:py-6 flex flex-col items-center justify-center font-almarai relative overflow-x-hidden">
      {/* Ambience Glow */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-[#14613B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-[#C58D38]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile Frame Container */}
      <div className="mobile-viewport bg-[#0F3823] text-white flex flex-col min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:rounded-[40px] sm:border-[5px] sm:border-[#C58D38]/40 overflow-hidden relative shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Sadu Motif */}
        <div className="absolute inset-0 bg-sadu-pattern opacity-10 pointer-events-none" />

        {/* Global Navigation Header (No dashboard icon) */}
        <Header
          showBack={screen === "question"}
          onBack={handleBack}
          variant="dark"
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Content Screens */}
        <div className="flex-1 overflow-y-auto relative z-10 flex flex-col">
          {screen === "welcome" && (
            <WelcomeScreen onStart={handleStartGame} />
          )}

          {screen === "question" && (
            <QuestionScreen
              question={currentQuestion}
              currentIndex={questionIndex}
              totalQuestions={currentQuestions.length}
              onAnswerSelected={handleAnswerSelected}
            />
          )}

          {screen === "result" && (
            <ResultScreen
              scoreFeedback={scoreFeedback}
              correctCount={correctCount}
              totalQuestions={currentQuestions.length}
              onOpenMysteryBox={handleOpenMysteryBox}
              onShareStory={() => setIsStoryCardOpen(true)}
            />
          )}

          {screen === "prize" && (
            <PrizeScreen
              prize={drawnPrize}
              promoCode={promoCode}
              scorePercentage={savedScorePercentage}
              customerName={customerName}
              phoneNumber={phoneNumber}
              isExistingSession={isExistingSession}
              onOpenStoryCard={() => setIsStoryCardOpen(true)}
              onPlayAgain={!ENABLE_LOCAL_STORAGE_LOCK ? handlePlayAgain : undefined}
            />
          )}
        </div>
      </div>

      {/* Mystery Box Unboxing Modal */}
      <MysteryBoxModal
        isOpen={isMysteryBoxOpen}
        onReveal={handleMysteryBoxRevealed}
      />

      {/* 9:16 Story Card Generator Modal */}
      <StoryCardModal
        isOpen={isStoryCardOpen}
        onClose={() => setIsStoryCardOpen(false)}
        scoreFeedback={scoreFeedback}
        prize={drawnPrize}
        promoCode={promoCode}
      />
    </main>
  );
}

export default App;
