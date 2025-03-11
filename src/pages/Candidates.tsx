
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/common/FileUpload";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Candidates = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Candidates</h1>
          <p className="text-muted-foreground">
            Manage candidate profiles and resumes
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Candidate
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Sarah Johnson", "Michael Chen", "Priya Patel"].map((candidate, i) => (
                <div key={i} className="p-4 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <h3 className="font-medium">{candidate}</h3>
                  <p className="text-sm text-muted-foreground">Frontend Developer • 5 years exp.</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Resumes</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept=".pdf,.doc,.docx"
              multiple={true}
              label="Upload Candidate Resumes"
              onUpload={(files) => console.log("Uploaded files:", files)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Candidates;
