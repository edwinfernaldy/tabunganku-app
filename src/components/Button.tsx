import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

export default function Button(props: ButtonProps) {
  const { onClick, className, children } = props;

  return (
    <button
      onClick={onClick}
      className={
        "py-4 px-10 w-full hover:text-black text-white hover:bg-white/50 bg-blue-800/80 rounded-md transition-all " +
        className
      }
    >
      {children}
    </button>
  );
}
