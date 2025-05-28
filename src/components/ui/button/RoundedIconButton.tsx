import { forwardRef } from "react";
import { clsxm } from "@/lib/helper";
import { MotionButtonBase } from "./MotionButton";
import type { ButtonHTMLAttributes } from "react";

type RoundedIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const RoundedIconButton = forwardRef<
  HTMLButtonElement,
  RoundedIconButtonProps
>(({ className, children, ...rest }, ref) => {
  return (
    <MotionButtonBase
      ref={ref}
      className={clsxm(
        "inline-flex rounded-full bg-accent p-2 text-center leading-none center hover:opacity-90",
        className,
      )}
      {...rest}
    >
      {children}
    </MotionButtonBase>
  );
});

RoundedIconButton.displayName = "RoundedIconButton";
