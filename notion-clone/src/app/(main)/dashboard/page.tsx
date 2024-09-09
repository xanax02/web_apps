import db from "@/lib/supabase/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";

const DashboardPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  console.log(user);

  const workspace = await db.query.workspaces.findFirst();

  // if (!workspace)
  //   return (
  //     <div>
  //       <h2>hello</h2>
  //     </div>
  //   );

  // redirect(`/dashboard/${workspace.id}`);

  // return <h1>hello</h1>;
};

export default DashboardPage;
