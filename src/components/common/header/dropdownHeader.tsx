"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tables } from "@/types/supabase";
import { ChevronDown } from "lucide-react";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function DropDownHeader({
  projects,
}: {
  projects: Tables<"project">[] | null;
  selectedProject: RequestCookie | undefined;
}) {
  const [cookies, setCookie] = useCookies(['selectedProject']);
  const router = useRouter()
  const onClickHandler = (project: Tables<"project">) => {
    setCookie('selectedProject', project)
    router.refresh()
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-1 h-fit my-auto flex w-full max-w-48 justify-between rounded-sm border-2 border-black">
        <div className="truncate">{cookies.selectedProject.name}</div>
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
