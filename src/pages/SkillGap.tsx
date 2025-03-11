
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkillGap = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h1>
        <p className="text-muted-foreground">
          Identify and bridge skill gaps between candidates and job requirements
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skill Matching</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium">Frontend Developer</h3>
                <div className="mt-2 space-y-2">
                  {[
                    { skill: "React", match: 90 },
                    { skill: "TypeScript", match: 75 },
                    { skill: "CSS/SCSS", match: 85 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">{item.skill}</span>
                        <span className="text-sm">{item.match}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-blue" 
                          style={{ width: `${item.match}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Advanced TypeScript Workshop",
                "GraphQL Fundamentals",
                "Performance Optimization Techniques",
              ].map((item, i) => (
                <div key={i} className="p-4 border rounded-md">
                  <h3 className="font-medium">{item}</h3>
                  <p className="text-sm text-muted-foreground">Recommended to bridge key skill gaps</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillGap;
