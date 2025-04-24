import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import Loader from "../loader";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { FileDuoToneBlack } from "@/components/icons";
import { DownloadIcon } from "lucide-react";

type Props = {
  plan: "PRO" | "FREE";
  trial: boolean;
  videoId: string;
};

const AiTools = ({ plan, trial, videoId }: Props) => {
  return (
    <TabsContent
      value="Ai tools"
      className="p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-10"
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="w-8/12">
            <h2 className="text-2xl font-bold">Ai Tools</h2>
            <p>
              Taking your video to the next <br /> step with the power of AI!
            </p>
          </div>
          {/* {plan === "FREE" ? (
          !trial ? ( */}
          <div className="flex items-center justify-between gap-4">
            <Button className=" mt-2 text-sm">
              <Loader state={false} color="#000">
                Try now
              </Loader>
            </Button>
            <Button className=" mt-2 text-sm" variant={"secondary"}>
              <Loader state={false} color="#000">
                Pay Now
              </Loader>
            </Button>
            {/* <Button className=" mt-2 text-sm">
            <Loader state={false} color="#000">
              Generate now
            </Loader>
          </Button> */}
          </div>
          {/* ) : (
            ""
          )
        ) : (
          ""
        )} */}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center text-center text-[#BDBDBD] gap-y-2 text-sm">
            <VideoRecorderDuotone width="36" height="36" />
            Generate Video summary
          </div>
          <div className="flex flex-col items-center text-center text-[#BDBDBD] gap-y-2 text-sm">
            <FileDuoToneBlack width="36" height="36" />
            Generate Video summary
          </div>
          <div className="flex flex-col items-center text-center text-[#BDBDBD] gap-y-2 text-sm">
            <DownloadIcon width="36" height="36" />
            Generate Video summary
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
