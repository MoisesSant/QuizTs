import { RotateCcw, Trophy } from "lucide-react";
import { motion } from "motion/react";

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function ResultScreen({ score, total, onRestart }: ResultScreenProps) {
  const porcentage = Math.round((score / total) * 100);

  let mensage = "";
  if (porcentage === 100) mensage = "Perfect Score!";
  else if (porcentage >= 80) mensage = "Great Job!";
  else if (porcentage >= 50) mensage = "Good Effort!";
  else {
    mensage = "Keep Practicing!";
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 w-full max-w-md mx-auto"
    >
      <div className=" w-20 h-20 bg-indigo-100 rounded-full flex items-center  justify-center mx-auto mb-6">
        <Trophy className="w-10 h-10 text-indigo-600" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800 mb-2">{mensage}</h2>
      <p className="text-slate-500 mb-8">
        You Scored <span className="font-semibold text-slate-800">{score}</span>{" "}
        out of{" "}
        <span className="font-semibold text-shadow-slate-800">{total}</span>
      </p>

      <div>
        <div className="text-5xl font-black text-indigo-600 mb-2">
          {porcentage}%
        </div>
        <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">
          Accuracy
        </div>
      </div>

      <button
        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg p-3"
        onClick={onRestart}
      >
        <RotateCcw className="w-5 h-5" />
        Restart Quiz
      </button>
    </motion.div>
  );
}
