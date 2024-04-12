'use client'
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Button({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <button className={cn("py-2 px-4 rounded text-slate-100", className)}>{children}</button>;
}
