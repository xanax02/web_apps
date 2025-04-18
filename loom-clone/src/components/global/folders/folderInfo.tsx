"use client";
import { useQueryData } from "@/hooks/useQueryData";
import { getFolderInfo } from "@/server-actions/workspace";
import { FolderProp } from "@/types/index.types";

type Props = {
  folderId: string;
};

const FolderInfo = ({ folderId }: Props) => {
  const { data } = useQueryData(["folder-info"], () => getFolderInfo(folderId));

  const { data: folder } = data as FolderProp;

  return (
    <div className="flex items-center">
      <h2 className="text-[#BdBdBd] text-2xl">{folder.name}</h2>
    </div>
  );
};

export default FolderInfo;
