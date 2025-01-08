import { getNotifications, onAuthenticateUser } from "@/server-actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAcessToWorkspace,
} from "@/server-actions/workspace";
import { redirect } from "next/navigation";
import React from "react";

import {
  QueryClient,
  HydrationBoundary,
  hydrate,
  dehydrate,
} from "@tanstack/react-query";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params, children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace) return redirect("/auth/sign-in");
  if (!auth.user?.workspace?.length) return redirect("/auth/sign-in");
  const { workspaceId } = params;
  const hasAccess = await verifyAcessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  /// react query client
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });

  await query.prefetchQuery({
    queryKey: ["user-workspace"],
    queryFn: () => getWorkSpaces(),
  });

  await query.prefetchQuery({
    queryKey: ["user-notification"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <div>HELLO</div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
