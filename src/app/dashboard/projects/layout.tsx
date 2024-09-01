import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import MainDashboardLayout from "@/components/common/layout/mainDashboard";

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
      <body className={cn(inter.className, "h-screen flex flex-col bg-foreground text-white")}>
        <MainDashboardLayout>
          {children}
        </MainDashboardLayout>
      </body>
    </html>
  );
}