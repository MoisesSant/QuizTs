import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";
import type { Question } from "./type";
import quizData from "./data/quiz.json";
import { ProgressBar } from "./components/ProgressBar";
import { QuestionCard } from "./components/QuestionCard";
function App() {
  const [question, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //  const [score, setScore] = useState(0);
  //  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setQuestions(quizData);
  }, []);

  const handleAnswer = (isCorrent: boolean) => {};

  if (question.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BrainCircuit className="w-12 h-12 text-indigo-300 mb-4" />
          <div className="text-slate-400 font-medium">Loading quiz...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="flex items-center justify-center gap-3 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            QuizMaster
          </h1>
        </header>

        {/* Main Content */}
        <main>
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={question.length}
          />
          <QuestionCard
            question={question[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
