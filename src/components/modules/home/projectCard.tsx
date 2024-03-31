import React, { useRef } from "react";
import { m, useAnimation, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MotionButtonBase } from "@/components/ui/button";
import {
  TechnologyIcon,
  isSupportTechnology,
} from "@/components/modules/home/TecnologyIcon";
import clsx from "clsx";
import Image from "next/image";

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

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.5, 0.4]);
  const position = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.32) {
      return "relative";
    } else if (pos >= 0.32 && pos <= 0.87) {
      return "fixed";
    } else {
      return "relative";
    }
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
    ["0%", "-30%"]
  );

  return (
    <m.li
      className="flex flex-col justify-around h-[200vh]"
      style={{ position: "relative" }}
      ref={projectRef}
    >
      <m.div
        style={{
          opacity: opacity,
          scale: scale,
          position,
          left: leftPosition,
          width: "100%",
          paddingTop: "56.51%",
          borderRadius: "0.375rem",
          overflow: "hidden",
        }}
        className={clsx(
          "bottom-1 border border-slate-200 dark:border-neutral-700/80 group project-card"
        )}
      >
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Image
            src={project.image}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={90}
          />
        </div>
      </m.div>
      <m.div
        style={{
          position,
          bottom: "50%",
          right: infoPosition,
          transform: "translateY(-50%)",
          opacity: infoOpacity,
          width: "50%",
          padding: "1.5rem",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "0.375rem",
        }}
      >
        <Link href={project.link}>
          <h4 className="text-xl font-medium text-white transition-colors duration-200">
            {project.name}
          </h4>
          <MotionButtonBase className="flex items-center p-2 mt-2 text-accent/95 opacity-100 duration-200">
            Visit the Site
            <i className="icon-[mingcute--arrow-right-line] ml-1" />
          </MotionButtonBase>
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
          <p className="mt-2 text-white opacity-100 transition-opacity duration-200">
            {project.description}
          </p>
        </Link>
      </m.div>
    </m.li>
  );
};

export default ProjectCard;
