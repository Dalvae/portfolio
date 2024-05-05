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
  const isInView = useInView(imageRef, { amount: 0.3 });
  const isMobile = useIsMobile();

  const scale = useTransform(scrollYProgress, [0, 0.6, 0.9], [0, 0.6, 0.5]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const position = useTransform(scrollYProgress, (pos) => {
    if (isMobile) {
      if (pos < 0.2) {
        console.log("relative");
        return "relative";
      } else {
        console.log("sticky");
        return "sticky";
      }
    } else {
      if (pos >= 0.1 && pos <= 0.8) {
        console.log("sticky");
        return "sticky";
      } else {
        console.log("relative");
        return "static";
      }
    }
  });
  const scaleSpring = useSpring(isMobile ? mobileScale : scale, {
    damping: 15,
    mass: 0.2,
    stiffness: 100,
  });

  const imageAnimation = {
    hidden: { x: 0 },
    visible: {
      x: isMobile ? "0%" : "-20%",
      transition: { duration: 0.1, ease: "easeOut" },
    },
  };
  const infoAnimation = {
    hidden: { x: "-100%" },
    visible: {
      x: isMobile ? "0%" : "150%",
      transition: { duration: 0.7, delay: 0.2 },
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
        className="flex flex-col lg:flex-row gap-4"
        style={{
          position,
          width: "100%",
          maxWidth: "100%",
          top: position.get() === "sticky" ? "80%" : "10px",
          transform:
            position.get() === "sticky" && !isMobile
              ? "translateY(-50%)"
              : "none",
          bottom: position.get() === "sticky" ? "0" : "auto",
        }}
      >
        <m.div
          variants={imageAnimation}
          style={{
            scale: isMobile ? mobileScale : scaleSpring,
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
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{
            type: "spring",
            damping: 3,
            stiffness: 50,
            restDelta: 0.001,
          }}
          style={{
            // position: isMobile ? "relative" : "absolute",
            width: isMobile ? "100%" : "40%",
            padding: "1.5rem",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "0.75rem",
            top: isMobile ? "auto" : "50%",
            transform: isMobile ? "none" : "translate(20%, -50%)",
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
