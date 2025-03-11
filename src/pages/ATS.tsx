
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileDown, 
  Filter, 
  Plus, 
  RefreshCw, 
  Search,
  AlertCircle
} from "lucide-react";

const ATS = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data - in real app, this would come from your ATS integration
  const mockCandidates = [
    {
      id: "CAND-001",
      role: "Frontend Developer",
      yearsExperience: 5,
      skills: ["React", "TypeScript", "CSS"],
      stage: "Applied",
      matchScore: 85,
      demographicFlags: { gender: true, age: true }
    },
    {
      id: "CAND-002",
      role: "UX Designer",
      yearsExperience: 3,
      skills: ["Figma", "User Research", "Prototyping"],
      stage: "Screening",
      matchScore: 72,
      demographicFlags: { gender: true }
    },
    {
      id: "CAND-003",
      role: "Product Manager",
      yearsExperience: 7,
      skills: ["Agile", "Product Strategy", "Data Analysis"],
      stage: "Interview",
      matchScore: 91,
      demographicFlags: { ethnicity: true }
    },
    {
      id: "CAND-004",
      role: "Backend Developer",
      yearsExperience: 4,
      skills: ["Node.js", "Express", "MongoDB"],
      stage: "Applied",
      matchScore: 78
    },
    {
      id: "CAND-005",
      role: "Data Scientist",
      yearsExperience: 2,
      skills: ["Python", "Machine Learning", "SQL"],
      stage: "Screening",
      matchScore: 65
    },
    {
      id: "CAND-006",
      role: "DevOps Engineer",
      yearsExperience: 6,
      skills: ["Docker", "Kubernetes", "AWS"],
      stage: "Offer",
      matchScore: 88,
      demographicFlags: { age: true }
    }
  ];

  const handleSync = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "ATS Sync Complete",
        description: "Successfully synchronized with external ATS",
      });
    }, 1500);
  };

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesJob = selectedJob === "all" || 
      (selectedJob === "frontend" && candidate.role.toLowerCase().includes("frontend")) ||
      (selectedJob === "ux" && candidate.role.toLowerCase().includes("ux")) ||
      (selectedJob === "pm" && candidate.role.toLowerCase().includes("product"));
    
    const matchesStatus = selectedStatus === "all" || candidate.stage.toLowerCase() === selectedStatus.toLowerCase();
    
    const matchesSearch = searchTerm === "" || 
      candidate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesJob && matchesStatus && matchesSearch;
  });

  const stages = ["Applied", "Screening", "Interview", "Offer"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applicant Tracking System</h1>
          <p className="text-muted-foreground">
            Track and manage candidate applications through the hiring pipeline
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Sync with ATS
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Candidate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search candidates by ID, role, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="frontend">Frontend Developer</SelectItem>
              <SelectItem value="ux">UX Designer</SelectItem>
              <SelectItem value="pm">Product Manager</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="screening">Screening</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex gap-1 items-center">
            <Filter className="h-3 w-3" />
            Filters: {(selectedJob !== "all" ? 1 : 0) + (selectedStatus !== "all" ? 1 : 0) + (searchTerm !== "" ? 1 : 0)}
          </Badge>
          {filteredCandidates.length > 0 && (
            <span className="text-sm text-muted-foreground">
              Showing {filteredCandidates.length} candidates
            </span>
          )}
        </div>
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="kanban">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="kanban" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stages.map((stage) => {
              const stageCount = filteredCandidates.filter(c => c.stage === stage).length;
              return (
                <div key={stage} className="space-y-2">
                  <div className="p-2 bg-muted rounded-md font-medium flex items-center justify-between">
                    <span>{stage}</span>
                    <Badge variant="secondary">
                      {stageCount}
                    </Badge>
                  </div>
                  <div className="space-y-2 min-h-[200px]">
                    {stageCount === 0 ? (
                      <div className="flex items-center justify-center h-[100px] border border-dashed rounded-md">
                        <p className="text-sm text-muted-foreground">No candidates</p>
                      </div>
                    ) : (
                      filteredCandidates
                        .filter(candidate => candidate.stage === stage)
                        .map((candidate) => (
                          <AnonymizedProfile
                            key={candidate.id}
                            candidateId={candidate.id}
                            role={candidate.role}
                            yearsOfExperience={candidate.yearsExperience}
                            skills={candidate.skills}
                            matchScore={candidate.matchScore}
                            demographicFlags={candidate.demographicFlags}
                          />
                        ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardContent className="p-4">
              {filteredCandidates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">No candidates found</h3>
                  <p className="text-muted-foreground text-sm mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ID</th>
                      <th className="text-left py-2">Position</th>
                      <th className="text-left py-2">Skills</th>
                      <th className="text-left py-2">Match</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Bias Protection</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate) => (
                      <tr key={candidate.id} className="border-b last:border-0 hover:bg-muted/50">
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
                        <td>
                          {candidate.matchScore ? (
                            <Badge 
                              variant="outline" 
                              className={`bg-blue-50 text-blue-700 border-blue-200`}
                            >
                              {candidate.matchScore}%
                            </Badge>
                          ) : "—"}
                        </td>
                        <td>{candidate.stage}</td>
                        <td>
                          {candidate.demographicFlags ? (
                            <div className="flex gap-1">
                              {candidate.demographicFlags.gender && (
                                <Badge variant="outline" className="text-xs px-1.5">Gender</Badge>
                              )}
                              {candidate.demographicFlags.ethnicity && (
                                <Badge variant="outline" className="text-xs px-1.5">Ethnicity</Badge>
                              )}
                              {candidate.demographicFlags.age && (
                                <Badge variant="outline" className="text-xs px-1.5">Age</Badge>
                              )}
                            </div>
                          ) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ATS;
