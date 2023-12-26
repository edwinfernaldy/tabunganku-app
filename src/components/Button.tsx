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
        "py-4 px-10 w-full text-black hover:text-white bg-white/50 hover:bg-black/50 rounded-md transition-all " +
        className
      }
    >
      {children}
    </button>
  );
}
