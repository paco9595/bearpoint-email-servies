import { RefObject, useEffect } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement>, handleOneClickOutside: () => void) {
  useEffect(()=> {
    const listener = (event: MouseEvent | TouchEvent)=> {
      if(!ref.current || ref.current.contains(event?.target as Node)) {
        return;
      }
      handleOneClickOutside()
    }
    document.addEventListener("touchstart", listener)
    document.addEventListener("mousedown", listener)

    return ()=> {
      document.removeEventListener('touchstart', listener)
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handleOneClickOutside]);
}