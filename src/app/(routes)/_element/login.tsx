"use client";

import Button from "@/components/Button";
import { useLandingStore, useSessionStore } from "@/store";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginSection = () => {
  const router = useRouter();
  const setType = useLandingStore((state) => state.setType);
  const setUserId = useSessionStore((state) => state.setUserId);
  const setUsername = useSessionStore((state) => state.setUsername);
  const [userData, setUserData] = useState({
    username: "",
    password: ""
  });

  const logIn = async () => {
    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(async (data) => {
        const user = (await data.json()) as User;

        if (user.id) {
          setUserId(user.id);
          setUsername(user.username);
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1 className='font-bold text-6xl tracking-tighter text-white'>Login</h1>

      <div className='flex flex-col gap-3'>
        <input
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          placeholder='Username'
          type={"text"}
          className='p-3 rounded-md bg-white/80'
        />

        <input
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          placeholder='Password'
          type={"password"}
          className='p-3 rounded-md bg-white/80'
        />

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
