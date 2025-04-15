import FolderDuotone from "@/components/icons/folder-duotone"
import { ArrowRight } from "lucide-react"

const Folders = ({workspaceId}: {workspaceId: any}) => {
    //getfolders
    //optimistic variable
    return <div className="felx flex-col gap-4">
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
    </div>
}

export default Folders