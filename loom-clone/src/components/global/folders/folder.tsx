"use client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../loader";
import { cn } from "@/lib/utils";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useRef, useState } from "react";
import { useMutationData } from "@/hooks/useMutationData";
import { renameFolders } from "@/server-actions/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  //foldername mutaiton
  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    // @ts-ignore
    (data: { name: string }) => renameFolders(id, data.name),
    "workspace-folders",
    Renamed
  );

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
  };

  const updateFolderName = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key && e.key == "Enter") {
      if (inputRef.current?.value) {
        //@ts-ignore
        mutate({ name: inputRef.current.value });
      } else {
        Renamed();
      }
    }
  };

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-50",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px] mt-4"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => Renamed()}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                updateFolderName(e)
              }
              onClick={(e) => e.stopPropagation()}
              autoFocus
              placeholder={name}
              ref={inputRef}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
            />
          ) : (
            ""
          )}
          {!onRename && (
            <p
              className="text-neutral-300"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => handleNameDoubleClick(e)}
            >
              {name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};

export default Folder;
