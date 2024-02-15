import { memo } from "react";

import { OnlyMobile } from "@/components/ui/viewport/OnlyMobile";
import { clsxm } from "@/lib/helper";

import { AnimatedLogo } from "./internal/AnimatedLogo";
import { BluredBackground } from "./internal/BluredBackground";
import styles from "./internal/grid.module.css";
import {
  HeaderCenterArea,
  HeaderLeftButtonArea,
  HeaderLogoArea,
} from "./internal/HeaderArea";
import { HeaderContent } from "./internal/HeaderContent";
import { HeaderDrawerButton } from "./internal/HeaderDrawerButton";
import { HeaderMeta } from "./internal/HeaderMeta";
import { HeaderWithShadow } from "./internal/HeaderWithShadow";

export const Header = () => {
  return <MemoedHeader />;
};
const MemoedHeader = memo(() => {
  return (
    <HeaderWithShadow>
      <BluredBackground />
      <div
        className={clsxm(
          "relative mx-auto grid h-full min-h-0 max-w-7xl grid-cols-[4.5rem_auto_4.5rem] lg:px-8",
          styles["header--grid"]
        )}
      >
        <HeaderLeftButtonArea>
          <HeaderDrawerButton />
        </HeaderLeftButtonArea>

        <HeaderLogoArea>
          <AnimatedLogo />

          <OnlyMobile>
            <HeaderMeta />
          </OnlyMobile>
        </HeaderLogoArea>

        <HeaderCenterArea>
          <HeaderContent />
          <HeaderMeta />
        </HeaderCenterArea>

        <div className="flex h-full w-full items-center"></div>
      </div>
    </HeaderWithShadow>
  );
});

MemoedHeader.displayName = "MemoedHeader";
