import { forwardRef } from "react";
import { clsxm } from "@/lib/helper";
import { MotionButtonBase } from "./MotionButton";
import type { ComponentPropsWithRef } from "react";
import type { MotionProps } from "framer-motion";

type RoundedIconButtonProps = ComponentPropsWithRef<"button"> & MotionProps;

export const RoundedIconButton = forwardRef<
  HTMLButtonElement,
  RoundedIconButtonProps
>(({ className, children, ...rest }, ref) => {
  return (
    <MotionButtonBase
      ref={ref}
      className={clsxm(
        "inline-flex rounded-full bg-accent p-2 text-center leading-none center hover:opacity-90",
        className
      )}
      {...rest}
    >
      {children}
    </MotionButtonBase>
  );
});

RoundedIconButton.displayName = "RoundedIconButton";
