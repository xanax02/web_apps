import { Move } from "lucide-react";
import Modal from "../modal";
import ChangeVideoLocation from "@/components/forms/change-video-location";

type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};

const CardMenu = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkspace,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new Workspace/Folder"
      description="This action cannot be undone. This will permanently delete your account"
      trigger={<Move size={20} fill="#4f4ff4f" className="text-[#4f4f4f]" />}
    >
      <ChangeVideoLocation
        currentFolder={currentFolder}
        currentWorkspace={currentWorkspace}
        videoId={videoId}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
};

export default CardMenu;
