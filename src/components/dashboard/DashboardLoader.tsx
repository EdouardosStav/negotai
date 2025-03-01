
import React from "react";
import { Loader2 } from "lucide-react";

const DashboardLoader = () => {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 text-cyan animate-spin mb-4" />
        <p className="text-white">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardLoader;
