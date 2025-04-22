"use client";

import { useQueryData } from "@/hooks/useQueryData";
import { getPreviewVideo } from "@/server-actions/workspace";
import { videoProps } from "@/types/index.types";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  const { data: video, status, author } = data as videoProps;

  return <div>VideoPreview</div>;
};

export default VideoPreview;
