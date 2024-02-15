import React, { memo, useMemo } from "react";
import { MotionButtonBase } from "@/components/ui/button";
import { FloatPopover } from "@/components/ui/float-popover";
import { BootstrapIcon } from "@/components/icons/platform/Bootstrap";
import { GraphQlIcon } from "@/components/icons/platform/GraphQl";
import { IoLogoJavascript } from "react-icons/io5";
import { DiMongodb } from "react-icons/di";
import { SiMysql, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaNodeJs, FaSass, FaWordpress } from "react-icons/fa";
interface TechnologyInfo {
  name: string;
  Icon: JSX.Element;
  iconBg: string;
}

const technologySet = {
  react: {
    name: "React",
    Icon: <i className="icon-[mingcute--react-line]" />,
    iconBg: "#61DAFB",
  },
  node: {
    name: "Node.js",
    Icon: <FaNodeJs />,
    iconBg: "#339933",
  },
  typescript: {
    name: "TypeScript",
    Icon: <SiTypescript />,
    iconBg: "#3178C6",
  },
  js: {
    name: "JavaScript",
    Icon: <IoLogoJavascript />,
    iconBg: "#F7DF1E",
  },
  tailwind: {
    name: "Tailwind CSS",
    Icon: <SiTailwindcss />,
    iconBg: "#38B2AC",
  },
  bootstrap: {
    name: "Bootstrap",
    Icon: <BootstrapIcon />,
    iconBg: "#7952B3",
  },
  sass: {
    name: "Sass",
    Icon: <FaSass />,
    iconBg: "#CC6699",
  },
  graphql: {
    name: "GraphQL",
    Icon: <GraphQlIcon />,
    iconBg: "#E10098",
  },
  mongodb: {
    name: "MongoDB",
    Icon: <DiMongodb />,
    iconBg: "#47A248",
  },
  wordpress: {
    name: "WordPress",
    Icon: <FaWordpress />,
    iconBg: "#21759B",
  },
  mysql: {
    name: "MySQL",
    Icon: <SiMysql />,
    iconBg: "#4479A1",
  },
};
interface TechnologyIconProps {
  type:
    | "react"
    | "typescript"
    | "node"
    | "js"
    | "tailwind"
    | "bootstrap"
    | "sass"
    | "graphql"
    | "mongodb"
    | "wordpress"
    | "mysql";
  className?: string; // Aquí se añade la prop className como opcional
}
type TechnologyType = keyof typeof technologySet;

export const isSupportTechnology = (icon: string): icon is TechnologyType =>
  Object.keys(technologySet).includes(icon);

export const TechnologyIcon: React.FC<TechnologyIconProps> = memo(
  ({ type }) => {
    const technologyInfo = useMemo(() => technologySet[type], [type]);

    if (!technologyInfo) return null;

    return (
      <FloatPopover
        type="tooltip"
        TriggerComponent={() => (
          <MotionButtonBase
            className="flex aspect-square h-10 w-10 items-center justify-center rounded-full text-2xl text-white"
            style={{ background: technologyInfo.iconBg }}
          >
            <div className="flex items-center justify-center">
              {technologyInfo.Icon}
            </div>
          </MotionButtonBase>
        )}
      >
        {technologyInfo.name}
      </FloatPopover>
    );
  }
);

TechnologyIcon.displayName = "TechnologyIcon";
