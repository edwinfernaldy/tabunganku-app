import Button from "@/components/Button";
import { useLandingStore } from "@/store";

const RegisterSection = () => {
  const setType = useLandingStore((state) => state.setType);
  const register = () => {};

  return (
    <>
      <h1 className='font-bold text-6xl tracking-tighter text-white'>
        Register
      </h1>

      <div className='flex flex-col gap-3'>
        <input
          placeholder='Username'
          type={"text"}
          className='p-3 rounded-md bg-white/80'
        />

        <input
          placeholder='Password'
          type={"password"}
          className='p-3 rounded-md bg-white/80'
        />

        <input
          placeholder='Confirm Password'
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
