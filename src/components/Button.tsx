import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  isLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onClick, className, children, isLoading } = props;

  return (
    <button
      onClick={onClick}
      className={
        "py-4 px-10 w-full border flex items-center justify-between border-gray-400 hover:text-black text-white hover:bg-white/50 bg-blue-800/80 rounded-md transition-all " +
        className
      }
    >
      <>
        {children}
        {isLoading && (
          <AiOutlineLoading3Quarters className='text-2xl animate-spin' />
        )}
      </>
    </button>
  );
}
