import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { UnifiedRegister } from "@/components/auth/UnifiedRegister";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Analytics from "./pages/Analytics";
import SkillGap from "./pages/SkillGap";
import BiasMitigation from "./pages/BiasMitigation";
import ATS from "./pages/ATS";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<UnifiedRegister />} />
              
              {/* Protected Recruiter Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute allowedRole="recruiter">
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="skill-gap" element={<SkillGap />} />
                <Route path="bias-mitigation" element={<BiasMitigation />} />
                <Route path="ats" element={<ATS />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* Redirect applicants */}
              <Route
                path="/applicant"
                element={<Navigate to="http://localhost:3000/applicant" replace />}
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
