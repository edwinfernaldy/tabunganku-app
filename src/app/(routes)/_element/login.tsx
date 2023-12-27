"use client";

import Button from "@/components/Button";
import { useLandingStore } from "@/store";
import { useRouter } from "next/navigation";

const LoginSection = () => {
  const router = useRouter();
  const setType = useLandingStore((state) => state.setType);

  const logIn = async () => {
    await fetch("/api/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    router.push("/dashboard");
  };

  return (
    <>
      <h1 className='font-bold text-6xl tracking-tighter text-white'>Login</h1>

      <div className='flex flex-col gap-3'>
        <input placeholder='Username' className='p-3 rounded-md bg-white/80' />

        <input placeholder='Password' className='p-3 rounded-md bg-white/80' />

        <Button onClick={() => logIn()}>Login</Button>
      </div>

      <p className='text-white'>
        Don&lsquo;t have an account?{" "}
        <a
          className='border-b border-white cursor-pointer  hover:pb-1 transition-all duration-200'
          onClick={() => setType("register")}
        >
          Register here
        </a>
      </p>
    </>
  );
};

export default LoginSection;
