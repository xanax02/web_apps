import { getAllUserVideos, getFolderInfo } from "@/server-actions/workspace";
import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: {
    folderId: string;
    workspaceId: string;
  };
};

const Page = async ({ params: { folderId, workspaceId } }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["folder-videos"],
    queryFn: () => getAllUserVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFolderInfo(folderId),
  });
};

export default Page;
