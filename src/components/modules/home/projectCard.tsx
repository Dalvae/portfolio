import React, { useRef } from "react";
import {
  m,
  useAnimation,
  useInView,
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
import { left, right } from "@cloudinary/url-gen/qualifiers/textAlignment";

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
    offset: ["0 0.5", "1 0.5"],
  });
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imageRef, { amount: 0.5 });
  const isMobile = useIsMobile();

  const scale = useTransform(scrollYProgress, [0, 0.6, 0.9], [0, 0.6, 0.5]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const position = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.3) {
      console.log("relative");
      return "relative";
    } else if (pos >= 0.3 && pos <= 0.8) {
      console.log("sticky");
      return "sticky";
    } else {
      console.log("relative");
      return "relative";
    }
  });

  const scaleSpring = useSpring(isMobile ? mobileScale : scale, {
    damping: 15,
    mass: 0.2,
    stiffness: 100,
  });

  const imageAnimation = {
    hidden: { x: 0, scale: 0 },
    visible: {
      x: isMobile ? "0%" : "-20%",
      scale: isMobile ? 1 : 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const infoAnimation = {
    hidden: { left: "-100%" },
    visible: {
      left: isMobile ? "0" : "calc(60% + 20px)",
      transition: { duration: 1.2, ease: "easeOut", delay: 0.4 },
    },
  };

  return (
    <li
      className={`flex  flex-col justify-around h-[150vh] ${
        index === totalProjects - 1 ? "mb-[20vh]" : ""
      }`}
      ref={projectRef}
    >
      <m.div
        ref={imageRef}
        animate={isInView ? "visible" : "hidden"}
        className="flex md:flex-row flex-col"
        style={{
          position,
          width: "100vw",
          maxWidth: "100vw",
          top: position.get() === "sticky" ? "80%" : "10px",
          transform:
            position.get() === "sticky" && !isMobile
              ? "translateY(-50%)"
              : "none",
          bottom: position.get() === "sticky" ? "0" : "auto",
          transition: "all 0.4s ease-out",
        }}
      >
        <m.div
          variants={imageAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            scale: isMobile ? mobileScale : scaleSpring,
            // top: "20%",
            // bottom: "40%",
            transition: "all 0.4s ease-out",
          }}
          className={clsx(" w-full")}
        >
          <Image
            src={project.image}
            alt={project.name}
            layout="responsive"
            width={1600}
            height={900}
            objectFit="cover"
            quality={90}
            loading="eager"
            className="rounded-xl "
          />
        </m.div>
        <m.div
          variants={infoAnimation}
          style={{
            position: isMobile ? "relative" : "absolute",
            width: isMobile ? "100%" : "40%",
            padding: "1.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "0.75rem",
            transition: "all 0.4s ease-out",
            top: isMobile ? "auto" : "50%",
            left: isMobile ? "0" : "auto",
            transform: isMobile ? "none" : "translateY(-50%)",
          }}
        >
          <Link
            href={project.link}
            className="flex flex-col justify-center items-center "
          >
            <h2 className="py-4 text-xl font-medium text-white transition-colors duration-200">
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
            <MotionButtonBase className="flex items-center my-4 text-accent/95 opacity-100 duration-200">
              Visit the Site
              <i className="icon-[mingcute--arrow-right-line] ml-1" />
            </MotionButtonBase>
          </Link>
        </m.div>
      </m.div>
    </li>
  );
};

export default ProjectCard;
