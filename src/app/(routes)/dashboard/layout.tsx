"use client";

import { ReactNode } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { useSessionStore } from "@/store";
import { IoMdExit } from "react-icons/io";
import { RxExit } from "react-icons/rx";

const MobileNavbar = ({ logOut }: { logOut: () => void }) => {
  return (
    <div className='md:hidden flex fixed w-full bottom-0 h-14 shadow-md bg-blue-400 text-white items-center justify-between px-10'>
      <a href='/dashboard'>
        <FaChartLine className='text-2xl' />
      </a>
      <a href='/dashboard/balance'>
        <GrMoney className='text-2xl' />
      </a>
      <a href='/dashboard/transaction'>
        <GrTransaction className='text-2xl' />
      </a>
      <a onClick={logOut}>
        <IoMdExit className='text-2xl' />
      </a>
    </div>
  );
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const username = useSessionStore((state) => state.username);

  const { setUserId, setUsername } = useSessionStore();

  return (
    <ProtectedRoutes>
      <div className='min-h-screen w-full flex '>
        <div className='basis-1/5 bg-blue-400 hidden md:flex flex-col'>
          <div className='p-4 flex items-center gap-4'>
            <LuUserCircle2 className='text-5xl text-white' />
            <h1 className='font-bold text-white tracking-tight'>{username}</h1>
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
              href='/dashboard/transaction'
              className='shadow-md p-3 bg-white/10 cursor-pointer hover:scale-105 transition-all'
            >
              <p className='flex items-center gap-5'>
                <GrTransaction className='text-xl' />
                Transaction
              </p>
            </a>

            <a
              href='/dashboard/balance'
              className='shadow-md p-3 bg-white/10 cursor-pointer hover:scale-105 transition-all'
            >
              <p className='flex items-center gap-5'>
                <GrMoney className='text-xl' />
                Balance
              </p>
            </a>
          </div>

          <div className='p-4'>
            <button
              onClick={() => {
                setUserId("");
                setUsername("");
              }}
              type='button'
              className='flex items-center text-white gap-2 p-3 hover:bg-white transition-all hover:text-black rounded-md'
            >
              <RxExit className='text-2xl' /> Log Out
            </button>
          </div>
        </div>

        <div className='w-full md:basis-4/5 p-4 bg-gradient-to-br from-blue-300 md:p-10'>
          {children}
        </div>

        <MobileNavbar
          logOut={() => {
            setUserId("");
            setUsername("");
          }}
        />
      </div>
    </ProtectedRoutes>
  );
}
