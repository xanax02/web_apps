import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Props = {
  currentFolder?: string;
  currentWorkspace?: string;
  videoId: string;
  currentFolderName?: string;
};

const ChangeVideoLocation = ({
  currentFolder,
  currentFolderName,
  currentWorkspace,
  videoId,
}: Props) => {
  return (
    <form className="flex flex-col gap-y-5">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current</h2>
        <p className="text-[#a4a4a4]">Worspace</p>
        <p className="text-[#a4a4a4] text-xs">This video has no folder.</p>
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <select className="rounded-xl text-base bg-transparent">
            <option
              className="text-[#a4a4a4] bg-transparent"
              value={"some value"}
            >
              Workspce
            </option>
          </select>
        </Label>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
