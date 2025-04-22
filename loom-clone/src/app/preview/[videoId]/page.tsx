import VideoPreview from "@/components/global/videos/preview";
import { getPreviewVideo } from "@/server-actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: {
    videoId: string;
  };
};

const Preview = async ({ params: { videoId } }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
};

export default Preview;
