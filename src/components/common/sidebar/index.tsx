'use client'
import { BarChart, LayoutDashboard, Pen, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Sidebar() {
  const {projectId} = useParams();
  
  return (
    <aside className="bg-white shadow-md lg:min-w-64">
      <div>
        <Link href={`/dashboard/${projectId}`} className="flex my-8 px-5 ">
          <LayoutDashboard className="mr-3" />
          <span className="hidden lg:block">Dashboard</span>
        </Link>
        <Link href={`/write/${projectId}`} className="flex my-8 px-5 ">
          <Pen className="mr-3" />
          <span className="hidden lg:block">Write</span>
        </Link>
        <Link href={"/dashboard"} className="flex my-8 px-5 ">
          <BarChart className="mr-3" />
          <span className="hidden lg:block">Grow</span>
        </Link>
        <Link href={"/dashboard"} className="flex my-8 px-5 ">
          <Users className="mr-3" />
          <span className="hidden lg:block">Audience</span>
        </Link>
      </div>
    </aside>
  );
}
