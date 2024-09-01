import { Tables } from "@/types/supabase";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import DropDownHeader from "./dropdownHeader";
import { Usable, use } from "react";
import { SupabaseResponse } from "@/types/supabase/SupabaseResponse";
import { cookies } from "next/headers";

export default async function ProjectSelector() {
  const supabase = createServerComponentClient({ cookies });

  const { data: projects }: SupabaseResponse<Tables<"project">> = await supabase
    .from("project")
    .select("name, id")
    
  return (
    <DropDownHeader projects={projects} />
  );
}
