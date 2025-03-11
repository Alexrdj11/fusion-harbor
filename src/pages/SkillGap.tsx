
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileUpload } from "@/components/common/FileUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/common/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { Save, Download, FileText, FileUp, BarChart3 } from "lucide-react";
import { MatchScoreChart } from "@/components/matching/MatchScoreChart";
import { SkillGapVisual } from "@/components/matching/SkillGapVisual";
import { ComparisonPanel } from "@/components/matching/ComparisonPanel";

const SkillGap = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescFile, setJobDescFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleMatchAnalysis = () => {
    if (!resumeFile || !jobDescFile) {
      toast({
        title: "Missing files",
        description: "Please upload both resume and job description",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for match analysis
    setTimeout(() => {
      // Mock data - in a real app, this would come from the API
      const mockMatchData: MatchData = {
        overallScore: 78,
        categories: {
          skills: 85,
          experience: 70,
          education: 80,
        },
        skillGaps: [
          { skill: "React", candidate: 90, required: 80 },
          { skill: "TypeScript", candidate: 75, required: 85 },
          { skill: "CSS/SCSS", candidate: 85, required: 70 },
          { skill: "GraphQL", candidate: 50, required: 80 },
          { skill: "Node.js", candidate: 65, required: 75 },
        ],
        candidateName: "John Doe",
        position: "Frontend Developer",
      };
      
      setMatchData(mockMatchData);
      setIsLoading(false);
      
      toast({
        title: "Analysis complete",
        description: "Match analysis has been completed successfully",
      });
    }, 2000);
  };

  const handleSaveMatch = () => {
    if (!matchData) return;
    
    // In a real app, this would save to a database
    toast({
      title: "Match saved",
      description: "Match data and notes have been saved successfully",
    });
  };

  const handleGenerateReport = () => {
    if (!matchData) return;
    
    // In a real app, this would generate a PDF
    toast({
      title: "Report generated",
      description: "PDF report has been generated and downloaded",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skill Gap Analysis</h1>
        <p className="text-muted-foreground">
          Identify and bridge skill gaps between candidates and job requirements
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="analysis" disabled={!matchData}>Analysis</TabsTrigger>
          <TabsTrigger value="report" disabled={!matchData}>Report</TabsTrigger>
        </TabsList>
        
        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>Upload candidate's resume for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept=".pdf,.doc,.docx"
                  label="Upload Resume"
                  onUpload={(files) => {
                    setResumeFile(files[0]);
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Description Upload</CardTitle>
                <CardDescription>Upload job description for matching</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  accept=".pdf,.doc,.docx"
                  label="Upload Job Description"
                  onUpload={(files) => {
                    setJobDescFile(files[0]);
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleMatchAnalysis} 
              disabled={isLoading || !resumeFile || !jobDescFile}
              className="gap-2"
            >
              {isLoading ? <Spinner size="sm" /> : <BarChart3 className="h-4 w-4" />}
              {isLoading ? "Analyzing..." : "Run Match Analysis"}
            </Button>
          </div>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {matchData && (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Match Score</CardTitle>
                    <CardDescription>Overall compatibility score</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <MatchScoreChart score={matchData.overallScore} />
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 bg-muted rounded-md">
                        <p className="text-sm font-medium">Skills</p>
                        <p className="text-2xl font-bold">{matchData.categories.skills}%</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-md">
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-2xl font-bold">{matchData.categories.experience}%</p>
                      </div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-md">
                      <p className="text-sm font-medium">Education</p>
                      <p className="text-2xl font-bold">{matchData.categories.education}%</p>
                    </div>
                  </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Skill Gap Analysis</CardTitle>
                    <CardDescription>Comparison of candidate skills vs. requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillGapVisual skillGaps={matchData.skillGaps} />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Side-by-Side Comparison</CardTitle>
                  <CardDescription>Detailed comparison of candidate profile and job requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComparisonPanel 
                    candidateName={matchData.candidateName} 
                    position={matchData.position} 
                    skillGaps={matchData.skillGaps} 
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notes & Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="notes">Analysis Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Add notes about this match..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={handleSaveMatch}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Match
                      </Button>
                      <Button variant="outline" onClick={handleGenerateReport}>
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Report Tab */}
        <TabsContent value="report" className="space-y-6">
          {matchData && (
            <Card>
              <CardHeader>
                <CardTitle>Match Report</CardTitle>
                <CardDescription>Generate and download detailed PDF report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium">Report Preview</h3>
                    <p className="text-muted-foreground">
                      This report includes the skill gap analysis, match scores, and your notes.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Candidate</p>
                        <p className="text-sm text-muted-foreground">{matchData.candidateName}</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Position</p>
                        <p className="text-sm text-muted-foreground">{matchData.position}</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Overall Match</p>
                        <p className="text-sm text-muted-foreground">{matchData.overallScore}%</p>
                      </div>
                      <div className="border rounded-md p-3">
                        <p className="font-medium">Recommendation</p>
                        <p className="text-sm text-muted-foreground">
                          {matchData.overallScore >= 75 
                            ? "Strong Match - Proceed to Interview" 
                            : matchData.overallScore >= 60 
                              ? "Potential Match - Consider Additional Screening" 
                              : "Not Recommended - Significant Skill Gaps"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleGenerateReport}>
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Type definitions
interface MatchData {
  overallScore: number;
  categories: {
    skills: number;
    experience: number;
    education: number;
  };
  skillGaps: {
    skill: string;
    candidate: number;
    required: number;
  }[];
  candidateName: string;
  position: string;
}

export default SkillGap;
