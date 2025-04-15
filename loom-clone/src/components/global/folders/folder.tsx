"use client";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../loader";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
};

const Folder = ({ name, id, optimistic, count }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-6 px-4 rounded-lg border-[1px]"
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
            <p className="text-neutral-300">{name}</p>
        </div>
      </Loader>
    </div>
  );
};

export default Folder;
