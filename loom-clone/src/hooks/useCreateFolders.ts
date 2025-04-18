import { createFolder } from "@/server-actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    // @ts-ignore
    () => createFolder(workspaceId),
    "workspace-folders"
  );

  const onCreateNewFolder = () =>
    //@ts-ignore
    mutate({ name: "Untitled", id: "optimistic--id" });

  return { onCreateNewFolder };
};
