"use client";
import React, {
  useEffect,
  forwardRef,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import Link from "next/link";
import clsx from "clsx";
import { MotionButtonBase } from "@/components/ui/button";
import type { PropsWithChildren } from "react";
import {
  microReboundPreset,
  softBouncePreset,
  softSpringPreset,
} from "@/constants/spring";

import { clsxm } from "@/lib/helper";
import ProjectCard from "./projectCard";
import { m, useInView, useViewportScroll, useTransform } from "framer-motion";

const Screen = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    className?: string;
  }>
>((props, ref) => {
  const inViewRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(inViewRef, { once: true });

  return (
    <div
      ref={ref}
      className={clsxm(
        "relative flex h-screen min-h-[900px] flex-col center",
        props.className
      )}
    >
      <span ref={inViewRef} />
      {inView && props.children}
    </div>
  );
});
Screen.displayName = "Screen";

export const ProjectsContainer = () => {
  const projects = [
    {
      name: "Sublimahyca",
      link: "https://www.sublimahyca.cl/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707073977/photo1_sv4ekw.jpg",
      technologies: ["react", "typescript"],
    },
    {
      name: "Carcaj",
      link: "http://carcaj.cl/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707073978/photo2_nm5onl.jpg",
      technologies: ["Tecnología 3", "Tecnología 4"],
    },
    {
      name: "BUC",
      link: "https://buc.cl/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707073977/photo3_kzqgfp.jpg",
      technologies: ["Tecnología 3", "Tecnología 4"],
    },
  ];

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement | null>; // Type assertion for scrollRef

  const handleScroll = () => {
    if (activeProjectIndex < projects.length - 1) {
      setActiveProjectIndex((current) => current + 1);
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, [activeProjectIndex]);

  const handleAnimationComplete = () => {};
  return (
    <Screen className="h-fit min-h-[120vh]">
      <m.h2
        initial={{
          opacity: 0.0001,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={softSpringPreset}
        className="text-3xl font-medium leading-loose"
      >
        Here are my recents projects
      </m.h2>
      <div>
        <ul className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              isActive={i === activeProjectIndex}
              onAnimationComplete={() => {
                // Solo procede a la siguiente tarjeta si esta tarjeta está activa
                if (i === activeProjectIndex) {
                  handleAnimationComplete();
                }
              }}
            />
          ))}
        </ul>

        <m.div
          initial={{ opacity: 0.0001, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ...softBouncePreset,
            delay: 0.3 + 0.2 * projects.length,
          }}
          className="relative mt-12 w-full text-center"
        >
          <MotionButtonBase>
            <Link className="shiro-link--underline" href="/proyectos">
              Do you want some more?
            </Link>
          </MotionButtonBase>
        </m.div>
      </div>
    </Screen>
  );
};
