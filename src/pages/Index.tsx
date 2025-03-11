
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/common/Spinner";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Index;
