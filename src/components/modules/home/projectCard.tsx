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
import { Position } from "@cloudinary/url-gen/qualifiers";

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
  const projectRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["0 1", "1.5 0"],
  });
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const position = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.5) {
      return "relative";
    } else if (pos >= 0.5 && pos <= 0.8) {
      return "fixed";
    } else {
      return "relative";
    }
  });
  return (
    <m.li className="flex flex-col justify-around h-[200vh]" ref={projectRef}>
      <m.div
        style={{
          opacity: opacity,
          scale: scale,
          position,
          backgroundImage: `url(${project.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={clsx(
          " rounded-md top-20 fixed border border-slate-200 dark:border-neutral-700/80 group p-4 pb-0 project-card"
        )}
      >
        <Link href={project.link}>
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
        </Link>
      </m.div>
    </m.li>
  );
};

export default ProjectCard;
