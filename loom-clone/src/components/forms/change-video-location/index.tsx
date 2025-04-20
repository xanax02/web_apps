import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useFolders";

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
  const {
    register,
    errors,
    folders,
    isFetching,
    isFolders,
    isPending,
    onFormSubmit,
    workspaces,
  } = useMoveVideos(videoId, currentWorkspace!);

  const folder = folders.find((f) => f.id === currentFolder);
  const workspace = workspaces.find((f) => f.id === currentWorkspace);

  return (
    <form className="flex flex-col gap-y-5">
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs mb-5 text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p className="text-[#a4a4a4]">{workspace.name}</p>}
        <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
        <p className="text-[#a4a4a4] text-sm">This name will change</p>
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
