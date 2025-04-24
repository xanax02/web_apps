import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  triggers: string[];
  children: React.ReactNode;
  defaultValue: string;
};

const TabMenu = ({ children, defaultValue, triggers }: Props) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="flex justify-center">
        {triggers.map((trigger) => (
          <TabsTrigger
            key={trigger}
            value={trigger}
            className="capitalize text-base data-[state=active]:bg-[#1D1D1D]"
          >
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabMenu;
