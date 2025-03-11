
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/common/FileUpload";
import { Plus } from "lucide-react";

const Jobs = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">
            Manage and create job listings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Job
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Frontend Developer", "UX Designer", "Product Manager"].map((job, i) => (
                <div key={i} className="p-4 border rounded-md hover:bg-accent transition-colors cursor-pointer">
                  <h3 className="font-medium">{job}</h3>
                  <p className="text-sm text-muted-foreground">New York, NY • Full-time</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept=".pdf,.doc,.docx"
              label="Upload Job Description"
              onUpload={(files) => console.log("Uploaded files:", files)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Jobs;
