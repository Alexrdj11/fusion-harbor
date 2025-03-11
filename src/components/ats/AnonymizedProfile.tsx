
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnonymizedProfileProps {
  candidateId: string;
  role: string;
  yearsOfExperience: number;
  skills: string[];
}

export const AnonymizedProfile = ({
  candidateId,
  role,
  yearsOfExperience,
  skills
}: AnonymizedProfileProps) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">ID: {candidateId}</p>
            <h3 className="font-medium">{role}</h3>
            <p className="text-sm text-muted-foreground">{yearsOfExperience} years experience</p>
          </div>
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
