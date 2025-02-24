import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Divider = ({ className, orientation = "horizontal" }: DividerProps) => {
  return (
    <div
    className={twMerge(
        clsx(
          "bg-gray-300",
          orientation === "horizontal" ? "w-full h-[1px] my-2" : "h-full w-[1px] mx-2",
          className
        )
      )}
    />
  );
};
