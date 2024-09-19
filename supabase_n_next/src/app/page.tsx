import { supabase } from "@/lib/supabase";

export default function Home() {
  const setNewView = async () => {
    const { data, error } = await supabase
      .from("views")
      .insert({ name: "random name" });

    if (data) console.log("data", data);
    if (error) console.log("error", error);
  };

  setNewView();

  return <div>Hello</div>;
}
