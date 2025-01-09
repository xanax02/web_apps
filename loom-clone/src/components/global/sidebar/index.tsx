"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkSpaces } from "@/server-actions/workspace";
import { WorkSpaceProps } from "@/types/index.types";
import Image from "next/image";
import React from "react";

type Props = {
  activeWorkspaceId: string;
};

const Sidbar = ({ activeWorkspaceId }: Props) => {
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workspace } = (data as WorkSpaceProps) ?? {};

  const onChangeActiveWorkspace = () => {};

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden border-r-2 border-r-white/15">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src="/opal-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace?.workspace?.map((workspace) => (
              <SelectItem value={workspace?.id} key={workspace?.id}>
                {workspace?.name}
              </SelectItem>
            ))}
            {workspace?.members?.length > 0 &&
              workspace?.members?.map(
                (workspace) =>
                  workspace?.WorkSpace && (
                    <SelectItem
                      value={workspace?.WorkSpace.id}
                      key={workspace?.WorkSpace.id}
                    >
                      {workspace?.WorkSpace.name}
                    </SelectItem>
                  )
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sidbar;
