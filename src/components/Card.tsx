import React from "react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = (props: CardProps) => {
  const { children, className } = props;

  return (
    <div className={"shadow-md rounded-md p-4 bg-white " + className}>
      {children}
    </div>
  );
};

export default Card;
