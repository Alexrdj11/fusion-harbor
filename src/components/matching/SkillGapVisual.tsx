
import React from "react";
import { Progress } from "@/components/ui/progress";

interface SkillGap {
  skill: string;
  candidate: number;
  required: number;
}

interface SkillGapVisualProps {
  skillGaps: SkillGap[];
}

export const SkillGapVisual: React.FC<SkillGapVisualProps> = ({ skillGaps }) => {
  const getGapStatus = (candidate: number, required: number) => {
    const diff = candidate - required;
    if (diff >= 10) return "text-green-500";
    if (diff >= 0) return "text-blue-500";
    if (diff >= -15) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      {skillGaps.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{item.skill}</span>
            <span className={getGapStatus(item.candidate, item.required)}>
              {item.candidate >= item.required ? "Meets" : "Gap"} 
              {" "}({item.candidate - item.required}%)
            </span>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-100 text-blue-600">
                  Candidate
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {item.candidate}%
                </span>
              </div>
            </div>
            <Progress value={item.candidate} className="h-2 bg-blue-200" />
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-100 text-gray-600">
                  Required
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {item.required}%
                </span>
              </div>
            </div>
            <Progress value={item.required} className="h-2 bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
};
