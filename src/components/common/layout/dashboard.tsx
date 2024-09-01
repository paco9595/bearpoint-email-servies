import { ReactNode } from "react";
import Header from "../header/header";
import Sidebar from "../sidebar";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header/>
            <div className="flex bg-slate-100 flex-1 ">
                <Sidebar />
                <div className="pt-4 pl-5 pr-10 w-full flex flex-1">{children}</div>
            </div>
        </>
    )
}