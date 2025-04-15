import CreateFolders from "@/components/global/createFolders";
import CreateWorkspace from "@/components/global/createWorkspace";
import Folders from "@/components/global/folders";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";

const Page = ({params}: {params: any}) => {

  // const params = useParams();

  return (
    <div>
      <Tabs defaultValue="videos" className="mt-6">
        <div className="flex w-full justify-between items-center">
          <TabsList className="bg-transparent gap-2 pl-0">
            <TabsTrigger
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              value="videos"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className="p-[13px] px-6 rounded-full data-[state=active]:bg-[#252525]"
              value="archive"
            >
              Archive
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-x-3">
            <CreateWorkspace />
            <CreateFolders workspaceId={params.workspaceId}  />
          </div>
        </div>
        <section className="py-9">
          <TabsContent value="videos">
            <Folders workspaceId={params.workspaceId} />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default Page;
