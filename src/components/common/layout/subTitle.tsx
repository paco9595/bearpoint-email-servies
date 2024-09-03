'use client'
import { usePathname } from "next/navigation"

export default function Subtitles() {
  const pathName = usePathname() 
  return (
    <small className="text-sm text-muted-foreground font-medium leading-none capitalize">{pathName.split('/')[2]}</small>
  )
} 