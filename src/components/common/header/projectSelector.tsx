"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/types/supabase";
import {
  getSessionStorage,
  SessionStorageEnum,
  setSessionStorage,
} from "@/utils/session-storage";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectSelector({
  projects,
}: {
  projects: Tables<"project">[];
}) {
  const [selected, setSelected] = useState<Tables<"project">>(projects[0]);

  useEffect(()=> {
    if(window) {
      setSelected(getSessionStorage(SessionStorageEnum.currentProject));
    }
  },[])

  const onClickHandler = (project: Tables<"project">) => {
    setSelected(project);
    setSessionStorage(SessionStorageEnum.currentProject, project);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-1 h-fit my-auto flex w-full max-w-48 justify-between rounded-sm border-2 border-black">
        <div className="truncate">{selected.name}</div>
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
        <DropdownMenuItem>New Project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
