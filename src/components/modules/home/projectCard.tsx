import React from "react";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  usePageScrollDirection,
  usePageScrollLocation,
} from "@/providers/root/page-scroll-info-provider";
import { m, useInView } from "framer-motion";
import Link from "next/link";
import { MotionButtonBase } from "@/components/ui/button";
import {
  TechnologyIcon,
  isSupportTechnology,
} from "@/components/modules/home/TecnologyIcon";
import clsx from "clsx";

type ProjectType = {
  name: string;
  link: string;
  image: string;
  technologies: string[];
};

interface ProjectCardProps {
  project: ProjectType;
  isActive: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      // Inicia la animación para entrar o expandirse dependiendo de isActive
      controls.start({ opacity: 1, scale: 1.1, y: 0 });
    } else {
      // Controla la salida o reposo de la tarjeta cuando no está activa
      controls.start({ opacity: 0, scale: 1, y: "-100%" });
    }
  }, [isActive, controls]);

  return (
    <m.div
      animate={controls}
      initial={{ opacity: 0, scale: 0.9, x: "100%" }}
      // variants={variants}
      exit="exit"
      className={clsx(
        "relative h-[300px] w-[580px] rounded-md",
        "border border-slate-200 dark:border-neutral-700/80",
        "group p-4 pb-0 project-card"
      )}
    >
      <Link href={project.link} className="flex h-full w-full flex-col">
        <h4 className="truncate text-xl font-medium text-black group-hover:text-white transition-colors duration-200">
          {project.name}
        </h4>

        <MotionButtonBase className="absolute bottom-4 right-4 flex items-center p-2 text-accent/95 opacity-0 duration-200 group-hover:opacity-100">
          Visit the Site
          <i className="icon-[mingcute--arrow-right-line]" />
        </MotionButtonBase>

        <div className="absolute right-4 top-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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

        {project.image && (
          <div
            aria-hidden="true"
            className="mask-cover absolute inset-0 top-0 z-[-1] rounded-md"
            style={{
              backgroundImage: `url(${project.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
      </Link>
    </m.div>
  );
};

export default ProjectCard;
