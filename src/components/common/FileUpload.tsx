
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  className?: string;
  onUpload?: (files: File[]) => void;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = ".pdf,.doc,.docx",
  multiple = false,
  maxSize = 5, // 5MB default
  className,
  onUpload,
  label = "Upload Files",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const filesArray = Array.from(fileList);
    
    // Check file size
    const validFiles = filesArray.filter(file => {
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the ${maxSize}MB limit`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });
    
    if (multiple) {
      setFiles(prev => [...prev, ...validFiles]);
    } else {
      setFiles(validFiles.slice(0, 1));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      setUploadComplete(true);
      
      if (onUpload) {
        onUpload(files);
      }
      
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} file(s)`,
      });
    }, 3000);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setUploadComplete(false);
  };

  const clearAll = () => {
    setFiles([]);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          dragging ? "border-primary-blue bg-blue-50 dark:bg-blue-900/20" : "border-border",
          "hover:border-primary-blue"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">{label}</h3>
          <p className="text-sm text-muted-foreground">
            Drag & drop files here, or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: {accept.replace(/\./g, "")}
          </p>
          <p className="text-xs text-muted-foreground">
            Max size: {maxSize}MB
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Selected Files</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              disabled={uploading}
            >
              Clear All
            </Button>
          </div>
          
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between p-2 border rounded-md bg-background"
              >
                <div className="flex items-center space-x-2">
                  <File className="h-4 w-4" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Controls */}
      {files.length > 0 && (
        <div className="space-y-2">
          {uploading && (
            <Progress value={progress} className="h-2" />
          )}
          
          {!uploadComplete ? (
            <Button
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="w-full"
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-green-600 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
              <CheckCircle className="h-5 w-5" />
              <span>Upload complete</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
