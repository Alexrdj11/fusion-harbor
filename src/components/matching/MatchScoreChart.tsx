
import React from "react";
import { Progress } from "@/components/ui/progress";

interface MatchScoreChartProps {
  score: number;
}

export const MatchScoreChart: React.FC<MatchScoreChartProps> = ({ score }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-36 h-36 flex items-center justify-center mb-4">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="10"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={`${2 * Math.PI * 45 * score / 100} ${2 * Math.PI * 45 * (100 - score) / 100}`}
            className={getScoreColor(score)}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground">Match Score</span>
        </div>
      </div>
      
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm">
          <span>0%</span>
          <span>Match Score</span>
          <span>100%</span>
        </div>
        <Progress value={score} className={`h-2 ${getProgressColor(score)}`} />
      </div>
    </div>
  );
};
