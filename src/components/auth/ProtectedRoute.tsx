import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'applicant' | 'recruiter';
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-t-2 border-primary-blue border-r-2 border-b-2 border-gray-200 rounded-full"></div>
      </div>
    );
  }

  // If there's no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists but role is not set, show loading
  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-t-2 border-primary-blue border-r-2 border-b-2 border-gray-200 rounded-full"></div>
      </div>
    );
  }

  // If user role doesn't match allowed role, redirect to appropriate dashboard
  if (userRole !== allowedRole) {
    return <Navigate to={`/${userRole}`} replace />;
  }

  return <>{children}</>;
}; 