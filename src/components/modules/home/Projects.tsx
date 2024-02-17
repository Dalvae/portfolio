"use client";
import React, { createElement, forwardRef, useCallback, useRef } from "react";
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
  isSupportTechnology,
  TechnologyIcon,
} from "@/components/modules/home/TecnologyIcon";
import { clsxm } from "@/lib/helper";

import { m, useInView } from "framer-motion";

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

export const Projects = () => {
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
        <br />
        And maybe some future ones.
      </m.h2>
      <div>
        <ul className="space-y-4 ">
          {projects.map((project, i) => {
            const imageSrc = project.image;

            return (
              <m.li
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                initial={{ opacity: 0.001, x: 50 }}
                transition={{
                  ...softSpringPreset,
                  delay: 0.3 + 0.2 * i,
                }}
                key={i}
                className={clsx(
                  "relative h-[300px]  w-[580px]  rounded-md",
                  "border border-slate-200 dark:border-neutral-700/80",
                  "group p-4 pb-0 group relative "
                )}
              >
                <Link
                  className="flex h-full w-full flex-col"
                  href={project.link}
                >
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
                          className={`transition-opacity duration-200`}
                        />
                      ))}
                  </div>
                  {!!imageSrc && (
                    <div
                      aria-hidden
                      className="mask-cover absolute inset-0 top-0 z-[-1] rounded-md"
                      style={{
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div
                        className={clsx(
                          "absolute inset-0 transition-all duration-200 ease-in-out",
                          "group-hover:[-webkit-backdrop-filter:saturate(180%)_blur(20px)]",
                          "group-hover:[backdrop-filter:saturate(180%)_blur(20px)]",
                          "bg-transparent group-hover:bg-themed-bg_opacity",
                          "border-transparent group-hover:[border-bottom:1px_solid_rgba(187,187,187,0.2)] rounded-md"
                        )}
                      ></div>
                    </div>
                  )}
                </Link>
              </m.li>
            );
          })}
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
