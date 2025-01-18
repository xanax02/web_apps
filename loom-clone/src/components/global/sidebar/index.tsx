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
import { WorkSpaceProps, NotificationProps } from "@/types/index.types";
import Image from "next/image";
import React from "react";
import Modal from "../modal";
import { Menu, PlusCircle, WormIcon } from "lucide-react";
import Search from "../search";
import { usePathname, useRouter } from "next/navigation";
import { getNotifications } from "@/server-actions/user";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebarItem";
import WorkspacePlaceholder from "./workspacePlaceholder";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import InfoBar from "../infoBar";
import GlobalCard from "../globalCard";

type Props = {
  activeWorkspaceId: string;
};

const Sidbar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: notification } = useQueryData(
    ["user-notifications"],
    getNotifications
  );
  const { data: workspace } = (data as WorkSpaceProps) ?? {};
  const { data: count } = (notification as NotificationProps) ?? {};

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkspace = workspace?.workspace?.find(
    (space) => space.id === activeWorkspaceId
  );

  //menuItems
  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const SidebarSection = (
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
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90  hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                <PlusCircle
                  size={15}
                  className="text-neutral-800/90"
                  fill="rgb(115, 115, 115)"
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite To Workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems?.map((item) => {
            return (
              <SidebarItem
                href={item.href}
                icon={item.icon}
                title={item.title}
                key={item.title}
                selected={pathname === item.href}
                // notifications={
                //   item.title === "Notifications" && count?._count
                //     ? count?._count?.notification
                //     : 0
                // }               this needs to be fixed
              />
            );
          })}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      <p className="w-full text-[#9D9D9D] font-bold mt-4 ">Workspaces</p>

      {workspace?.workspace?.length === 1 &&
        workspace?.members?.length === 0 && (
          <div className="w-full mt-[-10px]">
            <p className="text-[#3c3c3c] font-medium text-sm">
              {workspace?.subscription?.plan === "FREE"
                ? "Upgrade to create workspace"
                : "No Workspaces"}
            </p>
          </div>
        )}

      {/* workspaces list display */}
      <nav>
        <ul>
          {workspace?.workspace?.length > 0 &&
            workspace?.workspace?.map((item) => {
              return (
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathname === `/dashboard/${item.id}`}
                    title={item.name}
                    notifications={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
              );
            })}
          {workspace?.members?.length > 0 &&
            workspace?.members?.map((item) => {
              return (
                <SidebarItem
                  href={`dashboard/${item.WorkSpace.id}`}
                  selected={pathname === `/dashboard/${item.WorkSpace.id}`}
                  title={item.WorkSpace.name}
                  notifications={0}
                  key={item.WorkSpace.name}
                  icon={
                    <WorkspacePlaceholder>
                      {item.WorkSpace.name.charAt(0)}
                    </WorkspacePlaceholder>
                  }
                />
              );
            })}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {workspace?.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description=" Unlock AI features like transcription, AI summary, and more."
          footer={<Button className="text-sm w-full">Upgrade</Button>}
        />
      )}
    </div>
  );

  return (
    <div className="">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidbar;
