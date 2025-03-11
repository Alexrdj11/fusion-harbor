
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AnonymizedProfileProps {
  candidateId: string;
  role: string;
  yearsOfExperience: number;
  skills: string[];
  matchScore?: number;
  demographicFlags?: {
    gender?: boolean;
    ethnicity?: boolean;
    age?: boolean;
  };
}

export const AnonymizedProfile = ({
  candidateId,
  role,
  yearsOfExperience,
  skills,
  matchScore,
  demographicFlags
}: AnonymizedProfileProps) => {
  const [isRedacted, setIsRedacted] = useState(true);

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">ID: {candidateId}</p>
              {demographicFlags && Object.values(demographicFlags).some(flag => flag) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help">
                        <Info size={16} className="text-blue-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Bias protection active</p>
                      <ul className="text-xs list-disc pl-4 mt-1">
                        {demographicFlags.gender && <li>Gender information redacted</li>}
                        {demographicFlags.ethnicity && <li>Ethnicity information redacted</li>}
                        {demographicFlags.age && <li>Age information redacted</li>}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <h3 className="font-medium">{role}</h3>
            <p className="text-sm text-muted-foreground">{yearsOfExperience} years experience</p>
            {matchScore !== undefined && (
              <div className="mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {matchScore}% match
                </Badge>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsRedacted(!isRedacted)}
            className="h-8 w-8 p-0"
          >
            {isRedacted ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
