import "@/app/globals.css";
import MainDashboardLayout from "@/components/common/layout/mainDashboard";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainDashboardLayout>
      {children}
    </MainDashboardLayout>
  );
}
