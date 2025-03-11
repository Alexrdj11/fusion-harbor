
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

const ATS = () => {
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
                <div className="p-2 bg-muted rounded-md font-medium">
                  {stage}
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-medium">Candidate {i}</h3>
                        <p className="text-sm text-muted-foreground">Frontend Developer</p>
                      </CardContent>
                    </Card>
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
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Position</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2">Candidate {i+1}</td>
                      <td>Frontend Developer</td>
                      <td>Screening</td>
                      <td>Feb 28, 2023</td>
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
