import { useCallback } from "react";
import Image from "next/image";
import { clsxm } from "@/lib/helper";
import { useTheme } from "next-themes";

type ClassNameType = string | undefined;

export const SiteOwnerAvatar = ({
  className,
}: {
  className: ClassNameType;
}) => {
  const { theme } = useTheme();

  const avatarDark =
    "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707097436/logodalvaeblanco_mgqirc.png";
  const avatarLight =
    "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707086863/logodalvae_thz65z.png";

  const avatar = theme === "dark" ? avatarDark : avatarLight;

  return (
    <div
      className={clsxm(
        "overflow pointer-events-none relative z-[9] select-none",
        className
      )}
    >
      <Image
        src={avatar}
        alt="Site Owner Avatar"
        width={40}
        height={40}
        className={clsxm(
          "ring-2 ring-slate-200 dark:ring-neutral-800",
          "mask mask-squircle"
        )}
      />
    </div>
  );
};
