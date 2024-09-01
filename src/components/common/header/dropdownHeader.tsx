"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/types/supabase";
import { ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const getSelectedProject = (id: string | string[], projects: Tables<"project">[] | null) => {
  return 

}


export default function DropDownHeader({
  projects,
}: {
  projects: Tables<"project">[] | null;
}) {
  const router = useRouter()
  const {projectId} = useParams()
  
  const selectedProject = projects?.filter(p=> p.id === projectId)[0]
  

  const onClickHandler = (project: Tables<"project">) => {
    router.replace(`/dashboard/${project.id}`)
  };

  const onClickNewProject = ()=> {
    router.push('/dashboard/newProject')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-1 h-fit my-auto flex w-full max-w-48 justify-between rounded-sm border-2 border-black">
        <div className="truncate">{selectedProject?.name}</div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {projects?.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => onClickHandler(project)}
          >
            {project.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={onClickNewProject}>New Project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
