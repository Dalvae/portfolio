"use client";
import React, { forwardRef, useState, useRef } from "react";
import Link from "next/link";
import { MotionButtonBase } from "@/components/ui/button";
import type { PropsWithChildren } from "react";
import { softBouncePreset, softSpringPreset } from "@/constants/spring";
import { clsxm } from "@/lib/helper";
import ProjectCard, { ProjectType } from "./projectCard";
import { m, useInView } from "framer-motion";

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
      id="projects"
      style={props.style}
      className={clsxm(
        "relative flex min-h-[900px] flex-col align-center",
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
  const isInViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(isInViewRef, { once: false, amount: 0.6 });
  const projects: ProjectType[] = [
    {
      name: "Sublimahyca",
      link: "https://www.sublimahyca.cl/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707073977/photo1_sv4ekw.jpg",
      technologies: [
        "react",
        "next",
        "typescript",
        "tailwind",
        "medusa",
        "postgresql",
        "redis",
      ],
      description:
        "High-performing ecommerce platform meticulously crafted using the Medusa framework, featuring seamless integration capabilities.",
    },
    {
      name: "Carcaj",
      link: "https://carcaj.cl/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707073978/photo2_nm5onl.jpg",
      technologies: ["wordpress", "php", "sass", "mysql"],
      description:
        "Literature, essays, and poetry. Crafted from the ground up with PHP and Sass.",
    },
    {
      name: "BUC",
      link: "https://buc.cl/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1707073977/photo3_kzqgfp.jpg",
      technologies: ["wordpress", "php", "bootstrap", "mysql"],
      description:
        "My inaugural website: a custom-built Wordpress theme using Bootstrap tailored for a consulting firm.",
    },
    {
      name: "Pokedex",
      link: "https://pokedex-puce-two.vercel.app/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1714922737/pokedex_ed3kcy.jpg",
      technologies: ["next", "react", "typescript", "tailwind"],
      description:
        "Performant Pokedex utilizing the PokeAPI and Approuter from Next.js.",
    },
    {
      name: "Internet is great",
      link: "https://internetisgreat.vercel.app/",
      image:
        "https://res.cloudinary.com/dwxc8s4mq/image/upload/v1714923479/Internet_is_greath_mknegt.jpg",
      technologies: ["next", "react", "typescript", "tailwind", "aws"],
      description: "Just a meme page, using AWS and Approuter from Next.js.",
    },

    //Ni rotations
    //la applicacion de comentar temblores
  ];
  const minHeight = projects.length * 150 + 20 + "vh";

  return (
    <Screen
      ref={isInViewRef}
      className="projectscreen flex flex-col justify-between"
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
        className="text-3xl font-medium leading-loose text-center my-4"
      >
        Here are my recent projects
      </m.h2>
      <ul className="flex-1 flex flex-col justify-evenly flex-wrap items-stretch gap-4 px-4 mb-4">
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            key={index}
            index={index}
            totalProjects={projects.length}
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
            What's your next big idea? Let's work together.
          </Link>
        </MotionButtonBase>
      </m.div>
    </Screen>
  );
};
