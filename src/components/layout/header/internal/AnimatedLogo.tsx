"use client";

import { useViewport } from "@/atoms";
import { useHeaderMetaShouldShow } from "./hooks";
import { SiteOwnerAvatar } from "./SiteOwnerAvatar";
import { AnimatePresence, m } from "framer-motion";
const Logo = () => {
  return (
    <>
      <SiteOwnerAvatar className="cursor-pointer" />
      <span className="sr-only">Owner Avatar</span>
    </>
  );
};

export const AnimatedLogo = () => {
  const shouldShowMeta = useHeaderMetaShouldShow();
  const isDesktop = useViewport(($) => $.lg && $.w !== 0);

  if (isDesktop) {
    return (
      <>
        <Logo />
      </>
    );
  }

  return (
    <AnimatePresence>
      {!shouldShowMeta && (
        <m.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Logo />
        </m.div>
      )}
    </AnimatePresence>
  );
};
