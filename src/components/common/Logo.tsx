
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "md" 
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center font-bold", sizeClasses[size], className)}>
      <span className="text-primary-blue">Talent</span>
      <span>Fusion</span>
    </div>
  );
};
