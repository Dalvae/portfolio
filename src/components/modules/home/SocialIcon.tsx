/* eslint-disable react/jsx-key */
import { memo, useMemo } from "react";
import type { ReactNode } from "react";
import { XIcon } from "@/components/icons/platform/XIcon";
import { MotionButtonBase } from "@/components/ui/button";
import { FloatPopover } from "@/components/ui/float-popover";

interface SocialIconProps {
  type: string;
  id: string;
}

const type2Copy = {
  github: "GitHub",
  twitter: "Twitter",
  telegram: "Telegram",
  mail: "Email",
  rss: "RSS",
  email: "Email",
  feed: "RSS",
  linkedin: "LinkedIn",
  x: "X",
} as any;
const icons = new Set(Object.keys(type2Copy));

const iconSet: Record<
  string,
  [string, ReactNode, string, (id: string) => string]
> = {
  github: [
    "Github",
    <i className="icon-[mingcute--github-line]" />,
    "#181717",
    (id) => `https://github.com/${id}`,
  ],
  twitter: [
    "Twitter",
    <i className="icon-[mingcute--twitter-line]" />,
    "#1DA1F2",
    (id) => `https://twitter.com/${id}`,
  ],
  x: ["x", <XIcon />, "rgba(36,46,54,1.00)", (id) => `https://x.com/${id}`],
  telegram: [
    "Telegram",
    <i className="icon-[mingcute--telegram-line]" />,
    "#0088cc",
    (id) => `https://t.me/${id}`,
  ],
  mail: [
    "Email",
    <i className="icon-[mingcute--mail-line]" />,
    "#D44638",
    (id) => `mailto:${id}`,
  ],
  rss: [
    "RSS",
    <i className="icon-[mingcute--rss-line]" />,
    "#FFA500",
    (id) => id,
  ],
  linkedin: [
    "LinkedIn",
    <i className="icon-[mingcute--linkedin-line]" />,
    "#0077B5",
    (id) => `https://linkedin.com/in/${id}`,
  ],
};

export const isSupportIcon = (icon: string) => icons.has(icon);
export const SocialIcon = memo((props: SocialIconProps) => {
  const { id, type } = props;

  const [name, Icon, iconBg, hrefFn] = useMemo(() => {
    const [name, Icon, iconBg, hrefFn] = iconSet[type] || [];
    return [name, Icon, iconBg, hrefFn];
  }, [type]);

  if (!name) return null;
  const href = hrefFn(id);

  return (
    <FloatPopover
      type="tooltip"
      TriggerComponent={() => (
        <MotionButtonBase
          className="flex aspect-square h-10 w-10 rounded-full text-2xl text-white center"
          style={{
            background: iconBg,
          }}
        >
          <a
            target="_blank"
            href={href}
            className="flex center"
            rel="noreferrer"
          >
            {Icon}
          </a>
        </MotionButtonBase>
      )}
    >
      {type2Copy[type] || ""}
    </FloatPopover>
  );
});
SocialIcon.displayName = "SocialIcon";
