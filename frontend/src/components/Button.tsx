import type { ReactNode } from "react";

const sizeMap = {
  sm: "w-8 h-6",
  md: "w-12 h-10",
  lg: "w-18 h-14",
  xl: "w-24 h-18",
};

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  children: ReactNode;
  size?: keyof typeof sizeMap;
  className?: string;
};

const Button = ({
  children,
  size = "md",
  className,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      className={`rounded-base border-contrast cursor-pointer border p-1 ${sizeMap[size]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
