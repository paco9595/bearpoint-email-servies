"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/types/supabase";
import { getSessionStorage, SessionStorageEnum, setSessionStorage } from "@/utils/session-storage";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ProjectSelector({
  projects,
}: {
  projects: Tables<"project">[];
}) {
  const [selected, setSelected] = useState(
    getSessionStorage(SessionStorageEnum.currentProject) ?? 
    projects[0].name
  );

  const onClickHandler = (name: string) => {
    setSelected(name);
    setSessionStorage(SessionStorageEnum.currentProject, name)
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-1 h-fit my-auto flex w-full max-w-48 justify-between rounded-sm border-2 border-black">
        <div className="truncate">{selected}</div>
        <ChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {projects?.map(({ id, name }) => (
          <DropdownMenuItem key={id} onClick={() => onClickHandler(name)}>
            {name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>New Project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
