import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import Subtitles from "./subTitle";

export default async function ProjectDashboardLayout({
  idProject,
  children,
}: {
  children: ReactNode;
  idProject: string
}) {
  const supabase = await createServerComponentClient({ cookies });
  
  return (
    <div className="flex">
      <nav className="max-w-64 h-screen w-full border-r-2 border-r-border">
        <div className="h-12 flex items-center px-6 border-b border-b-border">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Templates
          </h4>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground mb-3">Projects</p>
          <Link href={"/dashboard/projects"} className="text-sm">
            All Projects
          </Link>
        </div>
        {/* account */}
        <div className="px-6 py-5 border-b border-b-border">
          <p className="text-sm text-muted-foreground mb-3">Project</p>
          <ul>
            <li>
              <Link href={`/dashboard/project/${idProject}/settings`} className="text-sm">
                Settings
              </Link>
            </li>
            <li>
              <Link href={"/dashboard/projects"} className="text-sm">
                Security
              </Link>
            </li>
          </ul>
        </div>
        <div className="px-6 py-5">
          <Link href={"/dashboard/projects"} className="text-sm">
            Log Out
          </Link>
        </div>
      </nav>
      <div className="w-full h-screen flex flex-col">
        <div className="h-12 flex items-center  px-5 border-b border-b-border">
          <Subtitles />
        </div>
        <div className="p-5 flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );
}
