"use client";

import { forwardRef } from "react";
import { m } from "framer-motion";
import type { ButtonHTMLAttributes } from "react";

// Tipo que resuelve todos los conflictos
type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  initial?: boolean | object;
  whileHover?: object;
  whileTap?: object;
  whileFocus?: object;
  // Sobreescribe los handlers conflictivos con any
  onAnimationStart?: any;
  onDragStart?: any;
  onDragEnd?: any;
  [key: string]: any; // Permite cualquier otra prop de motion
};

export const MotionButtonBase = forwardRef<
  HTMLButtonElement,
  MotionButtonProps
>(({ children, initial = true, ...rest }, ref) => {
  return (
    <m.button
      initial={initial}
      whileFocus={{ scale: 1.02 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
      ref={ref}
    >
      {children}
    </m.button>
  );
});

MotionButtonBase.displayName = "MotionButtonBase";
