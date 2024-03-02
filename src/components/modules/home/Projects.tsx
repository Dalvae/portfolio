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
import {
  usePageScrollDirection,
  usePageScrollLocation,
} from "@/providers/root/page-scroll-info-provider";
import {
  useIsScrollDownAndPageIsOver,
  useIsScrollUpAndPageIsOver,
} from "@/providers/root/page-scroll-info-provider";
import useDebounceValue from "@/hooks/common/use-debounce-value";
import { clsxm } from "@/lib/helper";
import ProjectCard from "./projectCard";
import { m, useInView, useViewportScroll, useTransform } from "framer-motion";
import { debounce } from "@/lib/_";

type ProjectType = {
  name: string;
  link: string;
  image: string;
  technologies: string[];
};

const Screen = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
  }>
>((props, ref) => {
  const inViewRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(inViewRef, { once: true });

  return (
    <div
      ref={ref}
      style={props.style}
      className={clsxm(
        "relative flex h-screen min-h-[900px] flex-col align-center ",
        props.className
      )}
    >
      <span ref={inViewRef} />
      {inView && props.children}
    </div>
  );
});
Screen.displayName = "Screen";

export const ProjectsContainer: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const scrollDirection = usePageScrollDirection();
  const scrollLocation = usePageScrollLocation();
  const isInViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(isInViewRef, { once: false, amount: 0.6 });
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

  const minHeight = projects.length * 100 + 20 + "vh";

  return (
    <Screen
      ref={isInViewRef}
      className="h-fit projectscreen<"
      style={{ minHeight: minHeight }}
    >
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
        className="text-3xl font-medium leading-loose text-center my-5  sticky"
      >
        Here are my recents projects
      </m.h2>
      <div>
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
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
              What's your next big idea? Let's work together.
            </Link>
          </MotionButtonBase>
        </m.div>
      </div>
    </Screen>
  );
};
