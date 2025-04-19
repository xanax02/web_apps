"use client";

import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { getAllUserVideos } from "@/server-actions/workspace";
import { VideosProps } from "@/types/index.types";
import VideoCard from "./videoCard";

type Props = {
  folderId: string;
  videosKey: string;
  workspaceId: string;
};

const video = {
  User: {
    firstname: "John",
    lastName: "Doe",
    image: "https://example.com/profile-image.jpg",
  },
  id: "video123",
  processing: false,
  Folder: {
    id: "folder456",
    name: "Marketing Videos",
  },
  createdAt: new Date("2023-05-15T10:30:00Z"),
  title: "Product Demo: New Features",
  source: "https://example.com/videos/product-demo.mp4",
};

export const Videos = ({ folderId, videosKey, workspaceId }: Props) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId)
  );

  const { status: videoStatus, data: videos } = videoData as VideosProps;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grig grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {/* {videoStatus === 200 ? (
          videos.map((video) => <h1>hello</h1>)
        ) : (
          <p className="text[#BdBdBd]">No Videos in workspace</p>
        )} */}
        <VideoCard workspaceId={workspaceId} {...video} />
      </section>
    </div>
  );
};

export default Videos;
