"use client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../loader";
import { cn } from "@/lib/utils";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useRef, useState } from "react";

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

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleFolderClick}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px] mt-4"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          <p
            className="text-neutral-300"
            onDoubleClick={(e) => handleNameDoubleClick(e)}
          >
            {name}
          </p>
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};

export default Folder;
