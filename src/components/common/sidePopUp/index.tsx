import useClickOutside from "@/hooks/useClickOutside";
import { X } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";

export default function SidePopUp({ children, clickOutside, title }: { title: string, children: ReactNode, clickOutside: () => void }) {
  const sideRef = useRef(null);
  useEffect(() => {
    document.body.style.setProperty('overflow', 'hidden');
    return ()=> {
      document.body.style.setProperty('overflow', 'auto');
    }
  },[])
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-background/80">
      <div ref={sideRef} className="shadow-lg border-l border-border absolute top-0 right-0 lg:w-asideWidth w-full md:w-[50vw] h-screen bg-background animate-fade-left animate-once animate-duration-1000 p-5">
        <div className="flex  justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-3">
            {title}
          </h4>
          <X onClick={clickOutside} />
        </div>
        {children}
      </div>
    </div>
  )
} 