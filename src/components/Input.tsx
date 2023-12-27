import { ChangeEvent } from "react";

interface InputProps {
  placeholder?: string;
  className?: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  defaultValue?: string | number;
}

const Input = (props: InputProps) => {
  const { placeholder, className, type, onChange, value, defaultValue } = props;

  return (
    <input
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={"p-3 rounded-md bg-white/80 " + className}
    />
  );
};

export default Input;
