import { BarChart, LayoutDashboard, Pen, Users } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="bg-white shadow-md">
            <div >
                <Link href={'/dashboard'} className="flex my-8 px-5 ">
                    <LayoutDashboard className="mr-3"/>
                    Dashboard
                </Link>
                <Link href={'/dashboard'} className="flex my-8 px-5 ">
                    <Pen className="mr-3"/>
                    Write
                </Link>
                <Link href={'/dashboard'} className="flex my-8 px-5 ">
                    <BarChart className="mr-3"/>
                    
                    Grow
                </Link>
                <Link href={'/dashboard'} className="flex my-8 px-5 ">
                    <Users className="mr-3"/>
                    Audience
                </Link>
            </div>
        </aside>
    )
} 