import { ReactNode } from "react";

export const metadata = {
  title: "Tabungan Saya",
  description: "Dashboard For Your Savings."
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className='min-h-screen w-full p-10'>{children}</div>;
}
