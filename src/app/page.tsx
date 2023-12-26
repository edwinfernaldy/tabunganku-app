"use client";

import { useLandingStore } from "@/store";
import LoginSection from "./_element/login";
import RegisterSection from "./_element/register";

export default function Home() {
  const { type } = useLandingStore();

  return (
    <main className='flex h-screen items-center overflow-hidden justify-between'>
      <div className='basis-1/2'></div>

      <div className='bg-blue-400 shadow-lg border-blue-800 h-full flex flex-col gap-8 justify-center basis-1/2 p-24'>
        {type === "login" ? <LoginSection /> : <RegisterSection />}
      </div>
    </main>
  );
}
