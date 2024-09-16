import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Card({children, className, onClick}: {children: ReactNode, className?: string, onClick?: ()=> void}) {
    return (
        <div className={cn("bg-white border-slate-200 border rounded lg:py-3 px-3 ", className)} onClick={onClick}>
            {children}
        </div>
    )
}