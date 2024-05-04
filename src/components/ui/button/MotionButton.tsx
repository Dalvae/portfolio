"use client";

import { forwardRef } from "react";
import { m } from "framer-motion";
import type { ForwardRefRenderFunction } from "react";
import type { HTMLMotionProps } from "framer-motion";

export const MotionButtonBase: ForwardRefRenderFunction<
  HTMLButtonElement,
  HTMLMotionProps<"button">
> = (props, ref) => {
  const { children, ...rest } = props;

  return (
    <m.button
      initial={true}
      whileFocus={{ scale: 1.02 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
      ref={ref}
    >
      {children}
    </m.button>
  );
};

export default forwardRef(MotionButtonBase);
