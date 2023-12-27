import { ReactNode } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";

export const metadata = {
  title: "Tabungan Saya",
  description: "Dashboard For Your Savings."
};

const MobileNavbar = () => {
  return (
    <div className='md:hidden flex fixed w-full bottom-0 h-14 shadow-md bg-blue-400 text-white items-center justify-between px-10'>
      <a href='#'>
        <FaChartLine className='text-2xl' />
      </a>
      <a href='#'>
        <GrMoney className='text-2xl' />
      </a>
      <a href='#'>
        <GrTransaction className='text-2xl' />
      </a>
      <a href='#'>
        <LuUserCircle2 className='text-2xl' />
      </a>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen w-full flex '>
      <div className='basis-1/5 bg-blue-400 hidden md:flex flex-col'>
        <div className='p-4 flex items-center gap-4'>
          <LuUserCircle2 className='text-5xl text-white' />
          <h1 className='font-bold text-white tracking-tight'>Edwin</h1>
        </div>

        <div className='text-white flex flex-col gap-3 p-4'>
          <a
            href='/dashboard'
            className='shadow-md p-3 bg-white/10 cursor-pointer hover:scale-105 transition-all'
          >
            <p className='flex items-center gap-5'>
              <FaChartLine className='text-xl' />
              Tracker
            </p>
          </a>

          <a
            href='#'
            className='shadow-md p-3 bg-white/10 cursor-pointer hover:scale-105 transition-all'
          >
            <p className='flex items-center gap-5'>
              <GrTransaction className='text-xl' />
              Transaction
            </p>
          </a>

          <a
            href='#'
            className='shadow-md p-3 bg-white/10 cursor-pointer hover:scale-105 transition-all'
          >
            <p className='flex items-center gap-5'>
              <GrMoney className='text-xl' />
              Balance
            </p>
          </a>
        </div>
      </div>

      <div className='basis-4/5 p-4 md:p-10'>{children}</div>

      <MobileNavbar />
    </div>
  );
}
