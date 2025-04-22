"use client";

import { useQueryData } from "@/hooks/useQueryData";
import { getPreviewVideo } from "@/server-actions/workspace";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  return <div>VideoPreview</div>;
};

export default VideoPreview;
