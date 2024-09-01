import Card from "@/components/common/card";
import CreateProject from "@/components/write/CreateProject";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Write() {
  const supabase = await createServerComponentClient({ cookies });
  const { data: templates } = await supabase.from("project").select("*");
  return (
    <>
      <div className="w-full flex flex-wrap   gap-5">
        {templates?.map(({ id, name, description }) => (
          <Card className="h-[200px] w-1/5 flex-[1_1_30%]" key={id}>
            <h4>{name}</h4>
            <p>{description}</p>
          </Card>
        ))}
        <CreateProject />
      </div>
      {/* <Modal /> */}
    </>
  );
}
