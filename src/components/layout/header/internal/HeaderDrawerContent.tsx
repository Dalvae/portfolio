"use client";

import { memo } from "react";
import { m } from "framer-motion";
import Link from "next/link";

import { reboundPreset } from "@/constants/spring";
import { jotaiStore } from "@/lib/store";

import { drawerOpenAtom } from "./HeaderDrawerButton";

const staticMenuConfig = [
  {
    path: "/",
    title: "Inicio",
    icon: "🏠", // Puedes reemplazar esto con componentes de íconos si lo deseas
    subMenu: [
      { path: "/subpage1", title: "Sub Página 1" },
      { path: "/subpage2", title: "Sub Página 2" },
    ],
  },
  // Agrega más ítems según sea necesario
];
export const HeaderDrawerContent = () => {
  const config = staticMenuConfig;

  return (
    <div className="mt-12 max-h-screen w-[90vw] space-y-4 overflow-auto pb-24 scrollbar-none">
      {config.map((section, index) => {
        return (
          <m.section
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              ...reboundPreset,
              delay: index * 0.08,
            }}
            key={section.path}
          >
            <LinkInternal className="block" href={section.path}>
              <span className="flex items-center space-x-2 py-2 text-lg">
                <i>{section.icon}</i>
                <h2>{section.title}</h2>
              </span>
            </LinkInternal>

            {section.subMenu && (
              <ul className="my-2 grid grid-cols-2 gap-2">
                {section.subMenu.map((sub) => {
                  return (
                    <li key={sub.path}>
                      <LinkInternal
                        className="inline-block p-2"
                        href={sub.path}
                      >
                        {sub.title}
                      </LinkInternal>
                    </li>
                  );
                })}
              </ul>
            )}
          </m.section>
        );
      })}
    </div>
  );
};
// @ts-ignore
const LinkInternal: typeof Link = memo(function LinkInternal({
  children,
  ...rest
}) {
  return (
    <Link
      {...rest}
      prefetch={false}
      onClick={() => {
        jotaiStore.set(drawerOpenAtom, false);
      }}
    >
      {children}
    </Link>
  );
});
