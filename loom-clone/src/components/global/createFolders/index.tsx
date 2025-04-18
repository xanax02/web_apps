"use client";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/useCreateFolders";

const CreateFolders = ({ workspaceId }: { workspaceId: string }) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);
  // add create
  return (
    <Button
      onClick={onCreateNewFolder}
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
    >
      <FolderPlusDuotine />
      Create folder
    </Button>
  );
};

export default CreateFolders;
