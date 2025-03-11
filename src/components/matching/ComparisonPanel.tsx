
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface SkillGap {
  skill: string;
  candidate: number;
  required: number;
}

interface ComparisonPanelProps {
  candidateName: string;
  position: string;
  skillGaps: SkillGap[];
}

export const ComparisonPanel: React.FC<ComparisonPanelProps> = ({
  candidateName,
  position,
  skillGaps,
}) => {
  // Group skills by status
  const matchedSkills = skillGaps.filter(skill => skill.candidate >= skill.required);
  const gapSkills = skillGaps.filter(skill => skill.candidate < skill.required);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">{candidateName}</h3>
          <p className="text-sm text-muted-foreground">Candidate</p>
        </div>
        <div className="text-center">
          <Badge variant="outline" className="text-lg px-4 py-1">VS</Badge>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-medium">{position}</h3>
          <p className="text-sm text-muted-foreground">Position Requirements</p>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Skills</TabsTrigger>
          <TabsTrigger value="matched">Matched ({matchedSkills.length})</TabsTrigger>
          <TabsTrigger value="gaps">Gaps ({gapSkills.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillGaps.map((skill, index) => (
              <div key={index} className="border rounded-md p-4 hover:bg-accent transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{skill.skill}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="bg-blue-50">Candidate: {skill.candidate}%</Badge>
                      <Badge variant="outline" className="bg-gray-50">Required: {skill.required}%</Badge>
                    </div>
                  </div>
                  <Badge className={
                    skill.candidate >= skill.required ? 
                    "bg-green-100 text-green-800 hover:bg-green-100" : 
                    "bg-red-100 text-red-800 hover:bg-red-100"
                  }>
                    {skill.candidate >= skill.required ? "Match" : "Gap"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="matched" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedSkills.map((skill, index) => (
              <div key={index} className="border rounded-md p-4 hover:bg-accent transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{skill.skill}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="bg-blue-50">Candidate: {skill.candidate}%</Badge>
                      <Badge variant="outline" className="bg-gray-50">Required: {skill.required}%</Badge>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Match
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="gaps" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gapSkills.map((skill, index) => (
              <div key={index} className="border rounded-md p-4 hover:bg-accent transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{skill.skill}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="bg-blue-50">Candidate: {skill.candidate}%</Badge>
                      <Badge variant="outline" className="bg-gray-50">Required: {skill.required}%</Badge>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                    Gap ({skill.required - skill.candidate}%)
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Recommendation: Additional training or experience needed in {skill.skill}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
