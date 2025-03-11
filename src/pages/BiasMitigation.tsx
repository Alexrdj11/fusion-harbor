
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const BiasMitigation = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bias Mitigation</h1>
        <p className="text-muted-foreground">
          Tools and settings to reduce bias in the recruitment process
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bias Detection Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="name-blind">Name-blind Screening</Label>
                <p className="text-sm text-muted-foreground">
                  Hide candidate names during initial screening
                </p>
              </div>
              <Switch id="name-blind" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="gender-neutral">Gender-neutral Language</Label>
                <p className="text-sm text-muted-foreground">
                  Detect and suggest alternatives for gender-biased language
                </p>
              </div>
              <Switch id="gender-neutral" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="education-bias">Education Bias Protection</Label>
                <p className="text-sm text-muted-foreground">
                  Reduce bias toward specific educational institutions
                </p>
              </div>
              <Switch id="education-bias" />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="age-bias">Age Bias Protection</Label>
                <p className="text-sm text-muted-foreground">
                  Hide age-related information from screening process
                </p>
              </div>
              <Switch id="age-bias" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bias Detection Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center border rounded-md">
            <p className="text-muted-foreground">Bias detection reports will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiasMitigation;
