import React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
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

const ProjectCard = ({
  project,
  isActive,
  onAnimationComplete, // Tipo correcto para una función
}: {
  project: ProjectType;
  isActive: boolean;
  onAnimationComplete: () => void; // Tipo correcto para una función
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const variants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      //   scale: isActive ? 1.1 : 1.0, // Usa 'isActive' para determinar el scale
      transition: {
        duration: 0.5,
        onComplete: isActive ? onAnimationComplete : undefined,
      },
    },
    exit: { x: "-100%", transition: { duration: 0.5 } },
  };

  return (
    <m.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      onAnimationComplete={() => isActive && onAnimationComplete()} // Llama a onAnimationComplete solo si isActive es true
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
