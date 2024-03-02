import React, { useRef } from "react";
import { useEffect } from "react";
import {
  usePageScrollDirection,
  usePageScrollLocation,
  usePageScrollLocationSelector,
} from "@/providers/root/page-scroll-info-provider";
import {
  m,
  useInView,
  useAnimation,
  useScroll,
  useTransform,
} from "framer-motion";
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  // const scrollY = usePageScrollLocation();
  // const { scrollY } = useScroll({
  //   offset: ["01", "1.33 1"],
  // });
  const projectRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start end", "end start"],
  });
  const { scrollY } = useScroll();
  // const y = useTransform(scrollY, [0, 200], [100, 0]); // Ajusta estos valores
  // const opacity = useTransform(scrollY, [0, 500], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={projectRef}>
      <m.div
        style={{ opacity: opacity }}
        className={clsx(
          "relative rounded-md",
          "border min-h-[100vh] border-slate-200 dark:border-neutral-700/80",
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
    </div>
  );
};

export default ProjectCard;
