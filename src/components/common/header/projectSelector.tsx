import { Tables } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { SupabaseResponse } from "@/types/supabase/SupabaseReponse";
import DropDownHeader from "./dropdownHeader";

export default async function ProjectSelector() {

  const selectedProject = cookies().get('selectedProject');
  const supabase = await createServerComponentClient({cookies}) 

  const { data: projects }: SupabaseResponse<Tables<"project">> = await supabase
  .from("project")
  .select("name,id");

  
  return (
    <DropDownHeader projects={projects} selectedProject={selectedProject}/>
  );
}
