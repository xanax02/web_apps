import ChangeVideoLocation from "@/components/forms/change-video-location";
import Loader from "../loader";
import CardMenu from "./videoCardMenu";
import CopyLink from "./copyLink";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User } from "lucide-react";

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
      <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl">
        <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
          <CardMenu
            videoId={props.id}
            currentFolder={props.Folder?.id}
            currentFolderName={props.Folder?.name}
            currentWorkspace={props.workspaceId}
          />
          <CopyLink
            videoId={props.id}
            className="p-0 h-5 bg-hover:bg-transparent bg-[#252525]"
          />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-y-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD]">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className=" w-8 h-8">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-xs text-[#BDBDBD]">
                  {props.User?.firstname} {props.User?.lastName}
                </p>
                <p className="text-[#707070] text-xs flex items-center">
                  <Dot /> {dayAgo === 0 ? "Today" : `${dayAgo}d ago`}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share2 fill="#9D9D9D" className="text-[#9D9D9D]" size={12} />
                <p className="text-xs text-[#9D9D9D] capitalize">
                  {props.User?.firstname}'s Workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
