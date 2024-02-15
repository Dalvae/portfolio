"use client";

import { useViewport } from "@/atoms";
import { useHeaderMetaShouldShow } from "./hooks";
import { SiteOwnerAvatar } from "./SiteOwnerAvatar";
import { AnimatePresence, m } from "framer-motion";
// Eliminar el componente TapableLogo relacionado con React Query
const Logo = () => {
  return (
    <>
      <SiteOwnerAvatar className="cursor-pointer" />
      <span className="sr-only">Owner Avatar</span>
    </>
  );
};

// Modificar el componente AnimatedLogo para que use Logo en lugar de TapableLogo
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
