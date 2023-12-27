import Button from "@/components/Button";
import { useLandingStore, useSessionStore } from "@/store";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterSection = () => {
  const setType = useLandingStore((state) => state.setType);
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirm_password: ""
  });

  const setUserId = useSessionStore((state) => state.setUserId);

  const register = async () => {
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(async (data) => {
        const res = await data.json();
        const user = JSON.parse(res) as User;

        if (user.id) {
          setUserId(user.id);
          router.push("/dashboard");
        } else {
          throw new Error();
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1 className='font-bold text-6xl tracking-tighter text-white'>
        Register
      </h1>

      <div className='flex flex-col gap-3'>
        <input
          placeholder='Username'
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          type={"text"}
          className='p-3 rounded-md bg-white/80'
        />

        <input
          placeholder='Password'
          type={"password"}
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className='p-3 rounded-md bg-white/80'
        />

        <input
          placeholder='Confirm Password'
          value={userData.confirm_password}
          onChange={(e) =>
            setUserData({ ...userData, confirm_password: e.target.value })
          }
          type={"password"}
          className='p-3 rounded-md bg-white/80'
        />

        <Button onClick={() => register()}>Register</Button>
      </div>

      <p className='text-white'>
        Have an account?{" "}
        <a
          className='border-b border-white cursor-pointer  hover:pb-1 transition-all duration-200'
          onClick={() => setType("login")}
        >
          Log in now
        </a>
      </p>
    </>
  );
};

export default RegisterSection;
