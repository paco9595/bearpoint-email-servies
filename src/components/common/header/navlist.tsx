import { navItems } from "@/constants/navItems";
import Link from "next/link";

export default function NavList() {
    return (
        <div className="my-auto">
            {navItems.map(({title}, index) =>(
                <Link key={index} href={'/'} className="px-5 text-lg">{title}</Link>
            ))}
        </div>
    )
}