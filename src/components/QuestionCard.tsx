import { useEffect, useState } from "react";
import type { Question } from "../type";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, XCircleIcon, XSquareIcon } from "lucide-react";

interface QuestionCardProps {
  // tipar as propriedades da QuestionCard
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]); // Acontece toda vez que... (uma questão for selecionada)

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === question.answer;

    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 w-full max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">
          {question.question}
        </h2>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === question.answer;

            let buttonClass =
              "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group";

            if (!isAnswered) {
              buttonClass +=
                "border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-700";
            } else {
              if (isCorrect) {
                buttonClass +=
                  "border-emerald-500 bg-emerald-50 text-emerald-800";
              } else if (isSelected && !isCorrect) {
                buttonClass += "border-rose-500 bg-rose-50 text-rose-800";
              } else {
                buttonClass += "border-slate-500 text-slate-400 opacity-50";
              }
            }

            return (
              <button
                className={buttonClass}
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
              >
                <span className="font-medium text-lg">{option}</span>
                {isAnswered && isCorrect && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </motion.div>
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <XCircleIcon className="w-6 h-6 text-rose-500" />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
