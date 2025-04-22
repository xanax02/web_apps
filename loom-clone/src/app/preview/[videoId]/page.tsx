import { QueryClient } from "@tanstack/react-query";

type Props = {
  params: {
    videoId: string;
  };
};

const Preview = async ({ params: { videoId } }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo(),
  });

  return <h1> Preview</h1>;
};

export default Preview;
