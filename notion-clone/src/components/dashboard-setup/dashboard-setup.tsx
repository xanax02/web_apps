import { AuthUser } from "@supabase/supabase-js";
import React from "react";

interface DashboardSetupProps {
  user: AuthUser;
  subscription: {} | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = () => {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
};

export default DashboardSetup;
