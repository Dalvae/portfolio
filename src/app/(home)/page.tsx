"use client";
import Image from "next/image";
import React, { createElement, forwardRef, useCallback, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { noopObj } from "@/lib/noop";
import {
  isSupportIcon,
  SocialIcon,
} from "@/components/modules/home/SocialIcon";
import { shuffle } from "@/lib/_";
import { MotionButtonBase } from "@/components/ui/button";

import type { PropsWithChildren } from "react";
import { BottomToUpTransitionView } from "@/components/ui/transition/BottomToUpTransitionView";
import { TextUpTransitionView } from "@/components/ui/transition/TextUpTransitionView";
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
import { MailIcon } from "@/components/icons/platform/MailIcon";

const Screen = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    className?: string;
    id?: string;
  }>
>((props, ref) => {
  const inViewRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(inViewRef, { once: true });

  return (
    <div
      ref={ref}
      id={props.id}
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

export default function Home() {
  return (
    <div>
      <Welcome />
      <Projects />
    </div>
  );
}

const TwoColumnLayout = ({
  children,
  leftContainerClassName,
  rightContainerClassName,
}: {
  children:
    | [React.ReactNode, React.ReactNode]
    | [React.ReactNode, React.ReactNode, React.ReactNode];

  leftContainerClassName?: string;
  rightContainerClassName?: string;
}) => {
  return (
    <div className="relative flex h-full w-full flex-col flex-wrap items-center lg:flex-row">
      {children.slice(0, 2).map((child, i) => {
        return (
          <div
            key={i}
            className={clsxm(
              "flex h-1/2 w-full flex-col center lg:h-auto lg:w-1/2",

              i === 0 ? leftContainerClassName : rightContainerClassName
            )}
          >
            <div className="relative max-w-full lg:max-w-xl">{child}</div>
          </div>
        );
      })}

      {children[2]}
    </div>
  );
};

const Welcome = () => {
  const title = {
    template: [
      { type: "h1", text: "Hello, I'm", class: "text-4xl font-light" },
      {
        type: "h1",
        text: " Diego 👋",
        class: "text-4xl font-medium",
        breakAfter: true,
      },
      { type: "br" },
      { type: "p", text: "A Full Stack developer", class: "text-xl" },
    ],
  };
  const description = "Turning ideas into digital realities";
  const avatar =
    "https://res.cloudinary.com/dwxc8s4mq/image/upload/w_3000,h_3000,c_crop,g_face/avatarcirculo_mlgwge.webp";

  const socialIds = {
    github: "Dalvae",
    linkedin: "diego-alvarez-e",
    mail: "diego.alvarez.e@ug.uchile.cl",
  };
  const titleAnimateD =
    title.template.reduce((acc, cur) => {
      return acc + (cur.text?.length || 0);
    }, 0) * 50;

  return (
    <Screen className="mt-20 lg:mt-[-4.5rem]">
      <TwoColumnLayout leftContainerClassName="mt-[120px] lg:mt-0 h-[15rem] lg:h-1/2">
        <>
          <m.div
            className="group relative leading-[4] [&_*]:inline-block"
            initial={{ opacity: 0.0001, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={softBouncePreset}
          >
            {title.template.map((t, i) => {
              const { type } = t;
              const prevAllTextLength = title.template
                .slice(0, i)
                .reduce((acc, cur) => {
                  return acc + (cur.text?.length || 0);
                }, 0);
              return createElement(
                type,
                { key: i, className: t.class },
                t.text && (
                  <TextUpTransitionView
                    initialDelay={prevAllTextLength * 0.05}
                    eachDelay={0.05}
                  >
                    {t.text}
                  </TextUpTransitionView>
                )
              );
            })}
          </m.div>

          <BottomToUpTransitionView
            delay={titleAnimateD + 500}
            transition={softBouncePreset}
            className="my-3"
          >
            <span className="opacity-80">{description}</span>
          </BottomToUpTransitionView>

          <ul className="mt-8 flex space-x-4 center lg:mt-[7rem] lg:block">
            {Object.entries(socialIds || noopObj).map(
              ([type, id]: any, index) => {
                if (!isSupportIcon(type)) return null;
                return (
                  <BottomToUpTransitionView
                    key={type}
                    delay={index * 100 + titleAnimateD + 500}
                    className="inline-block"
                    as="li"
                  >
                    <SocialIcon id={id} type={type} />
                  </BottomToUpTransitionView>
                );
              }
            )}
          </ul>
        </>

        <div
          className={clsx("lg:h-[300px] lg:w-[300px]", "h-[200px] w-[200px]")}
        >
          <Image
            height={300}
            width={300}
            src={avatar!}
            alt="Diego Alvarez"
            className={clsxm(
              "rounded-full border border-slate-200 dark:border-neutral-800",
              "w-full"
            )}
          />
        </div>

        <m.div
          initial={{ opacity: 0.0001, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={softBouncePreset}
          className={clsx(
            "absolute bottom-0 left-0 right-0 flex flex-col center",

            "text-neutral-800/80 center dark:text-neutral-200/80"
          )}
        >
          <small>
            &quot;Si el agua es simple y el pan bueno, mi corazón es pan y
            agua&quot;. Pablo de Rokha
          </small>
          <span className="mt-8 animate-bounce">
            <i className="icon-[mingcute--right-line] rotate-90 text-2xl" />
          </span>
        </m.div>
      </TwoColumnLayout>
    </Screen>
  );
};

const Projects = () => {
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
    <Screen id="projects" className="h-fit min-h-[120vh]">
      <TwoColumnLayout leftContainerClassName="h-[30rem] lg:h-1/2">
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
                    <h3 className="truncate p-3 text-xl font-bold text-black transition-colors duration-200">
                      {project.name}
                    </h3>

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
      </TwoColumnLayout>
    </Screen>
  );
};
