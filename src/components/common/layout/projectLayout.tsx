import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import Subtitles from "./subTitle";

export default async function ProjectDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerComponentClient({ cookies });
  const { data: organizations } = await supabase
    .from("organization")
    .select("name, id");
  return (
    <div className="flex">
      <nav className="max-w-64 h-screen w-full border-r-2 border-r-border">
        <div className="h-12 flex items-center px-6 border-b border-b-border">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Dashboard
          </h4>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground mb-3">Projects</p>
          <Link href={"/dashboard/projects"} className="text-sm">
            All Projects
          </Link>
        </div>
        <div className="px-6 py-5 border-y border-y-border">
          <p className="text-sm text-muted-foreground mb-3">Organization</p>
          <ul>
            {organizations?.map(({ id, name }) => (
              <li className={"my-2"} key={id}>
                <Link href={"/dashboard/projects"} className="text-sm">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-5 border-b border-b-border">
          <p className="text-sm text-muted-foreground mb-3">Account</p>
          <ul>
            <li>
              <Link href={"/dashboard/projects"} className="text-sm">
                Preferences
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
