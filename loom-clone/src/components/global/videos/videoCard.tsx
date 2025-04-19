import ChangeVideoLocation from "@/components/forms/change-video-location";
import Loader from "../loader";
import CardMenu from "./videoCardMenu";

type Props = {
  User: {
    firstname: string | null;
    lastName: string | null;
    image: string | null;
  } | null;
  id: string;
  processing: boolean;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title: string | null;
  source: string;
  workspaceId: string;
};

const VideoCard = (props: Props) => {
  // WIP: time ago data
  const dayAgo = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl"
      state={props.processing}
    >
      {/* to show the move modal overflow-hidden should be removed */}
      <div className="overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 flex flex-col gap-y-3">
          <CardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            currentWorkspace={props.workspaceId}
          />
        </div>
      </div>
    </Loader>
  );
};

export default VideoCard;
