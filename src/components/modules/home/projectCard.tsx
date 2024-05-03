import React, { useRef } from "react";
import {
  m,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { MotionButtonBase } from "@/components/ui/button";
import {
  TechnologyIcon,
  isSupportTechnology,
} from "@/components/modules/home/TecnologyIcon";
import clsx from "clsx";
import Image from "next/image";
import { useIsMobile } from "@/atoms";

type ProjectType = {
  name: string;
  link: string;
  image: string;
  technologies: string[];
  description: string;
};

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  totalProjects: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalProjects,
}) => {
  const projectRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["0 1", "1.5 0"],
  });

  const isMobile = useIsMobile();

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.6, 0.5]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const position = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.32) {
      return "relative";
    } else if (pos >= 0.32 && pos <= 0.87) {
      return "fixed";
    } else {
      return "relative";
    }
  });

  const opacitySpring = useSpring(opacity, {
    damping: 15,
    mass: 0.2,
    stiffness: 100,
  });

  const scaleSpring = useSpring(isMobile ? mobileScale : scale, {
    damping: 15,
    mass: 0.2,
    stiffness: 100,
  });

  const infoOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const infoPosition = useTransform(
    scrollYProgress,
    [0.6, 0.7],
    ["100%", "0%"]
  );
  const leftPosition = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["0%", "-20%"]
  );
  const imageWidth = useTransform(position, (pos) =>
    pos === "fixed" ? "100vw" : "100%"
  );

  return (
    <m.li
      className={`flex flex-col justify-around ${
        isMobile ? "h-[150vh]" : "h-[200vh]"
      }`}
      style={{ position: "relative", overflow: "hidden" }}
      ref={projectRef}
    >
      <m.div
        style={{
          opacity: opacitySpring,
          scale: scaleSpring,
          position,
          top: isMobile
            ? position.get() === "fixed"
              ? "10%"
              : "40%"
            : position.get() === "fixed"
            ? "auto"
            : "0",
          left: isMobile ? "0" : leftPosition,
          borderRadius: "0.375rem",
          transition: "all 0.4s ease-out",
        }}
        className={clsx(
          "md:bottom-1 border border-slate-200 dark:border-neutral-700/80  w-full  "
        )}
      >
        <Image
          src={project.image}
          alt={project.name}
          layout="responsive"
          width={1600}
          height={900}
          objectFit="cover"
          objectPosition="center"
          quality={90}
        />
      </m.div>
      <m.div
        style={{
          position,
          bottom: isMobile ? 0 : "40%",
          right: isMobile ? 0 : infoPosition,
          top: position.get() === "fixed" ? "auto" : isMobile ? "auto" : "40%",
          transform: isMobile ? "none" : "translateY(-50%)",
          opacity: infoOpacity,
          width: isMobile ? "100%" : "40%",
          padding: "1.5rem",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "0.375rem",
          transition: "all 0.4s ease-out",
          height: isMobile ? "50%" : "auto",
        }}
      >
        <Link
          href={project.link}
          className="flex flex-col justify-center items-center p-4"
        >
          <h2 className=" py-4 text-xl font-medium text-white transition-colors duration-200">
            {project.name}
          </h2>

          <p className="mt-2 text-white opacity-100 transition-opacity duration-200">
            {project.description}
          </p>
          <div className="flex space-x-2 mt-4 opacity-100 transition-opacity duration-200">
            {project.technologies
              .filter(isSupportTechnology)
              .map((tech, index) => (
                <TechnologyIcon
                  key={index}
                  type={tech}
                  className="transition-opacity duration-200"
                />
              ))}
          </div>
          <MotionButtonBase className="flex items-center  mt-4 text-accent/95 opacity-100 duration-200">
            Visit the Site
            <i className="icon-[mingcute--arrow-right-line] ml-1" />
          </MotionButtonBase>
        </Link>
      </m.div>
    </m.li>
  );
};

export default ProjectCard;
