"use client";
import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/server-actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";

export type FolderProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[];
};

const Folders = ({ workspaceId }: { workspaceId: any }) => {
  //getfolders
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVaraibles } = useMutationDataState(["create-folder"]);

  const { status, data: folders } = data as FolderProps;

  //Add redux state
  // if (isFetched && folders) {
  // }
  //optimistic variable
  return (
    <div suppressHydrationWarning className="felx flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <section
        className={cn(
          status !== 200 && "justify-center",
          "flex items-center gap-4 overflow-x-auto w-full"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVaraibles && latestVaraibles.status === "pending" && (
              <Folder
                name={latestVaraibles.variables.name}
                id={latestVaraibles.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => {
              return (
                <Folder
                  name={folder.name}
                  count={folder._count.videos}
                  id={folder.id}
                  key={folder.id}
                />
              );
            })}
          </>
        )}
      </section>
    </div>
  );
};

export default Folders;
