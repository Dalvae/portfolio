// src/components/react/TechnologyIcon.tsx
import React from "react";

// Importamos el JSON directamente. Asegúrate de que la ruta sea correcta.
// Si tu archivo está en 'src/components/react', la ruta al data es '../../data/...'
import technologies from "../../data/technologies-data.json";

// Todos tus imports de react-icons, sin cambios
import {
  SiAstro,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiMedusa,
} from "react-icons/si";
import {
  FaReact,
  FaNodeJs,
  FaSass,
  FaWordpress,
  FaPhp,
  FaAws,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { MdTranslate, MdEmail } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io5";
import { DiMongodb, DiRedis } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiNextjsLine } from "react-icons/ri";
import { BsBootstrap } from "react-icons/bs";
import { GrGraphQl } from "react-icons/gr";

// La interfaz de Props es la misma
export interface Props {
  type: keyof typeof technologies;
  className?: string;
  link?: string;
}

// El mapa de iconos, sin cambios
const iconMap = {
  MdTranslate: MdTranslate,
  MdEmail: MdEmail,
  SiAstro: SiAstro,
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  SiTypescript: SiTypescript,
  IoLogoJavascript: IoLogoJavascript,
  SiTailwindcss: SiTailwindcss,
  Bs: BsBootstrap,
  FaSass: FaSass,
  Gr: GrGraphQl,
  DiMongodb: DiMongodb,
  FaWordpress: FaWordpress,
  SiMysql: SiMysql,
  FaPhp: FaPhp,
  SiMedusa: SiMedusa,
  BiLogoPostgresql: BiLogoPostgresql,
  RiNextjsLine: RiNextjsLine,
  DiRedis: DiRedis,
  FaAws: FaAws,
  FaGithub: FaGithub,
  FaLinkedin: FaLinkedin,
};

const TechnologyIcon: React.FC<Props> = ({ type, className, link }) => {
  const techInfo = technologies[type];

  // La lógica para encontrar el icono, sin cambios
  const IconComponent = techInfo?.iconIdentifier
    ? iconMap[techInfo.iconIdentifier]
    : null;

  // Lógica de tamaño, sin cambios
  const isLargeIcon =
    className && (className.includes("w-16") || className.includes("h-16"));
  const containerSize = isLargeIcon ? "w-16 h-16" : "w-10 h-10";
  const iconSize = isLargeIcon ? "w-10 h-10" : "w-7 h-7";

  // El JSX es casi idéntico, solo cambiamos 'class' por 'className'
  const content = (
    <div className="relative inline-flex flex-col items-center group mx-0.5">
      <div
        className={`flex aspect-square items-center justify-center rounded-full text-white transition-transform duration-200 ease-out hover:scale-110 ${containerSize}`}
        style={{ backgroundColor: techInfo?.iconBg || "#9ca3af" }}
      >
        {IconComponent ? (
          <IconComponent className={iconSize} />
        ) : (
          <span className={`font-bold p-1 text-center leading-tight`}>
            {techInfo?.iconIdentifier || "?"}
          </span>
        )}
      </div>
      <div className="absolute top-full mt-2 bg-background-tertiary text-label-primary text-xs font-medium py-1.5 px-2.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out pointer-events-none shadow-md z-30 group-hover:delay-300">
        {techInfo?.name || "Unknown"}
      </div>
    </div>
  );

  // Si hay link, lo envolvemos en una <a>
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default TechnologyIcon;
