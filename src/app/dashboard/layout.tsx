import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Sidebar from "@/components/common/sidebar";
import { cn } from "@/lib/utils";
import Header from "@/components/common/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'h-screen flex flex-col')}>
        <Header />
        <div className="grid grid-cols-[300px_1fr]  bg-slate-100 flex-1 ">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
