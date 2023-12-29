"use client";

import { useLandingStore } from "@/store";
import LoginSection from "./_element/login";
import RegisterSection from "./_element/register";
import animation from "../../../public/assets/lottie-animation.json";
import Lottie from "lottie-react";
import AppTitle from "./_element/app.title";

export default function Home() {
  const { type } = useLandingStore();

  return (
    <main className='flex h-screen items-center overflow-hidden justify-between'>
      <div className='lg:basis-1/2 hidden lg:flex justify-center items-center'>
        <Lottie animationData={animation} loop />
      </div>

      <div className='bg-blue-400 shadow-lg w-full border-blue-800 h-full flex flex-col gap-8 justify-center lg:basis-1/2 p-8 lg:p-24'>
        <AppTitle />
        {type === "login" ? <LoginSection /> : <RegisterSection />}
      </div>
    </main>
  );
}
