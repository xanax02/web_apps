'use client';
import FolderDuotone from "@/components/icons/folder-duotone"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Folder from "./folder"
import { useQueryData } from "@/hooks/useQueryData"
import { getWorkspaceFolders } from "@/server-actions/workspace";
import { useMutationDataState } from "@/hooks/useMutationData";

export type FolderProps = {
    status: number
    data: ({
        _count: {
            videos: number
        }
    } & {
        id: string
        name: string
        createdAt: Date
        workspaceId: string | null
    })[]
}

const Folders = ({workspaceId}: {workspaceId: any}) => {
    //getfolders
    const {data, isFetched} = useQueryData(
        ['workspace-folders'],
        () => getWorkspaceFolders(workspaceId)
    )

    const {latestVaraibles} = useMutationDataState(['create-folder'])

    const {status, data: folders} = data as FolderProps

    if(isFetched && folders) {

    }
    //optimistic variable
    return (
      <div className="felx flex-col gap-4">
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
          className={cn("flex items-center gap-4 overflow-x-auto w-full")}
        >
          <Folder id="12445" name="Folder Title" />
        </section>
      </div>
    );
}

export default Folders