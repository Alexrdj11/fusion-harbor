
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AnonymizedProfile } from "@/components/ats/AnonymizedProfile";
import { Badge } from "@/components/ui/badge";

const ATS = () => {
  const { toast } = useToast();

  // Mock data - in real app, this would come from your ATS integration
  const mockCandidates = [
    {
      id: "CAND-001",
      role: "Frontend Developer",
      yearsExperience: 5,
      skills: ["React", "TypeScript", "CSS"],
      stage: "Applied"
    },
    {
      id: "CAND-002",
      role: "UX Designer",
      yearsExperience: 3,
      skills: ["Figma", "User Research", "Prototyping"],
      stage: "Screening"
    },
    {
      id: "CAND-003",
      role: "Product Manager",
      yearsExperience: 7,
      skills: ["Agile", "Product Strategy", "Data Analysis"],
      stage: "Interview"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applicant Tracking System</h1>
        <p className="text-muted-foreground">
          Track and manage candidate applications through the hiring pipeline
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="frontend">Frontend Developer</SelectItem>
            <SelectItem value="ux">UX Designer</SelectItem>
            <SelectItem value="pm">Product Manager</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="screening">Screening</SelectItem>
            <SelectItem value="interview">Interview</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="kanban">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kanban" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Applied", "Screening", "Interview", "Offer"].map((stage) => (
              <div key={stage} className="space-y-2">
                <div className="p-2 bg-muted rounded-md font-medium flex items-center justify-between">
                  <span>{stage}</span>
                  <Badge variant="secondary">
                    {mockCandidates.filter(c => c.stage === stage).length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {mockCandidates
                    .filter(candidate => candidate.stage === stage)
                    .map((candidate) => (
                      <AnonymizedProfile
                        key={candidate.id}
                        candidateId={candidate.id}
                        role={candidate.role}
                        yearsOfExperience={candidate.yearsExperience}
                        skills={candidate.skills}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID</th>
                    <th className="text-left py-2">Position</th>
                    <th className="text-left py-2">Skills</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCandidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b last:border-0">
                      <td className="py-2">{candidate.id}</td>
                      <td>{candidate.role}</td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 2).map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{candidate.skills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>{candidate.stage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ATS;
