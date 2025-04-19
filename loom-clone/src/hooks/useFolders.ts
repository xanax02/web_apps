import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import {
  getWorkspaceFolders,
  moveVideoLocation,
} from "@/server-actions/workspace";
import useZodForm from "./useZodFrom";
import { moveVideoSchema } from "@/components/forms/change-video-location/schema";

export const useMoveVideos = (videoId: string, currentWorkspace: string) => {
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorksapceReducer);

  const [isFetching, setIsFetching] = useState(false);
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workspaceId: string | null;
      })[]
    | undefined
  >(undefined);

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    // @ts-ignore
    (data: { folder_id: string; workspaceId: string }) => {
      moveVideoLocation(videoId, data.folder_id, data.workspaceId);
    }
  );

  //form

  const { errors, onFormSubmit, watch, register } = useZodForm(
    moveVideoSchema,
    mutate,
    { folder_id: null, workspace_id: currentWorkspace }
  );

  const fetchFolders = async (workspace: string) => {
    setIsFetching(true);
    const folders = await getWorkspaceFolders(workspace);
    setIsFetching(false);
    // @ts-ignore
    setIsFolders(folders.data);
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
  }, []);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) fetchFolders(value.workspace_id);
    });
  }, [watch]);

  return {
    onFormSubmit,
    errors,
    register,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
  };
};
