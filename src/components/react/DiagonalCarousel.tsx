import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechnologyIcon from "./TechnologyIcon";

// --- Interfaces ---
interface Project {
  name: string;
  image: string;
  description: string;
  technologies: string[];
  link: string;
}

interface DiagonalCarouselProps {
  projects: Project[];
}

// --- Mobile Card Component ---
const MobileProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="mobile-card"
  >
    <img
      src={project.image}
      alt={project.name}
      className="mobile-card-image"
      loading="lazy"
      width="500"
      height="450"
    />
    <div className="mobile-card-overlay"></div>
    <div className="mobile-card-content">
      <div>
        <h3 className="mobile-card-title">{project.name}</h3>
        <p className="mobile-card-description">{project.description}</p>
        <div className="mobile-card-tech">
          {project.technologies.slice(0, 5).map((techKey) => (
            <TechnologyIcon
              key={techKey}
              type={techKey as any}
              className="w-6 h-6"
            />
          ))}
        </div>
      </div>
    </div>
  </a>
);

// --- Desktop Project Content Component ---
const ProjectContent = ({ project, isSelected, isHovered, transition }) => (
  <>
    <motion.div
      layout
      className={`relative ${isSelected ? "w-full md:w-3/5 h-1/2 md:h-full" : "w-full h-full"} bg-background-secondary`}
    >
      <motion.img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: isSelected ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        loading="lazy"
      />
      <motion.img
        src={project.image}
        alt={project.name}
        className="absolute inset-0 w-full h-full object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        loading="lazy"
      />
      <motion.div
        className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
        animate={{ opacity: isSelected || isHovered ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <h2 className="relative text-3xl font-bold text-white w-full text-center left-[-15%] drop-shadow-lg">
          {project.name}
        </h2>
      </motion.div>
    </motion.div>

    <AnimatePresence>
      {isSelected && (
        <motion.div
          className="relative flex flex-col justify-center p-8 md:p-12 w-full md:w-2/5 h-1/2 md:h-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={transition}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-label-primary">
            {project.name}
          </h2>
          <p className="text-label-secondary mt-4 mb-6 flex-grow overflow-y-auto pr-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.map((techKey) => (
              <TechnologyIcon
                key={techKey}
                type={techKey as any}
                className="w-8 h-8"
              />
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto block text-center bg-accent text-white px-5 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
          >
            View Project →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);

// --- Main Carousel Component ---
const DiagonalCarousel: React.FC<DiagonalCarouselProps> = ({ projects }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [panOffset, setPanOffset] = useState(0);
  const panIntervalRef = useRef<number | null>(null);
  const panDirectionRef = useRef<"left" | "right" | "stop">("stop");

  const cardTransition = { type: "tween", ease: "easeInOut", duration: 0.6 };
  const detailsTransition = { type: "tween", ease: "easeInOut", duration: 0.4 };
  const CONFIG = {
    cardHeight: "85vh",
    cardWidth: 320,
    cardGap: 220,
    clipPath: "polygon(30% 0, 100% 0, 70% 100%, 0 100%)",
    expandedWidth: "90vw",
    expandedHeight: "85vh",
  };

  useEffect(() => {
    const panZoneSize = window.innerWidth * 0.1;
    const panSpeed = 15;

    const loop = () => {
      if (panDirectionRef.current === "stop") {
        panIntervalRef.current = null;
        return;
      }

      setPanOffset((current) => {
        const totalCarouselWidth = (projects.length - 1) * CONFIG.cardGap + CONFIG.cardWidth;
        const screenWidth = window.innerWidth;
        const maxPanRange = Math.max(0, (totalCarouselWidth - screenWidth) / 2 + 100);
        let newOffset = current + (panDirectionRef.current === "left" ? panSpeed : -panSpeed);
        return Math.max(-maxPanRange, Math.min(maxPanRange, newOffset));
      });

      panIntervalRef.current = requestAnimationFrame(loop);
    };

    const startPanning = () => {
      if (!panIntervalRef.current) loop();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (selectedId !== null) {
        panDirectionRef.current = "stop";
        return;
      }
      const { clientX } = e;
      const newDirection = clientX < panZoneSize ? "left" : clientX > window.innerWidth - panZoneSize ? "right" : "stop";

      if (newDirection !== panDirectionRef.current) {
        panDirectionRef.current = newDirection;
        if (newDirection !== "stop") startPanning();
      }
    };

    const carouselContainer = document.getElementById("diagonal-carousel-container");
    if (carouselContainer) {
      carouselContainer.addEventListener("mousemove", handleMouseMove);
      carouselContainer.addEventListener("mouseleave", () => {
        panDirectionRef.current = "stop";
      });
    }

    return () => {
      if (carouselContainer) {
        carouselContainer.removeEventListener("mousemove", handleMouseMove);
        carouselContainer.removeEventListener("mouseleave", () => {
          panDirectionRef.current = "stop";
        });
      }
      if (panIntervalRef.current) cancelAnimationFrame(panIntervalRef.current);
    };
  }, [selectedId, projects.length, CONFIG.cardGap, CONFIG.cardWidth]);

  return (
    <>
      <style>{`
        .desktop-carousel { display: none; }
        .mobile-vertical-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem 1rem;
          width: 100%;
        }
        @media (min-width: 1219px) {
          .desktop-carousel { display: flex; }
          .mobile-vertical-container { display: none; }
        }
        .mobile-card {
          width: 90%;
          max-width: 500px;
          height: 75vh;
          max-height: 450px;
          border-radius: 0.5rem;
          overflow: hidden;
          position: relative;
          display: block;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.2);
          transition: transform 0.3s ease;
          background-color: var(--color-background-secondary);
        }
        .mobile-card:hover { transform: translateY(-5px); }
        .mobile-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
        }
        .mobile-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 60%);
        }
        .mobile-card-content {
          position: absolute;
          inset: 0;
          padding: 1.5rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .mobile-card-title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .mobile-card-description {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.85);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .mobile-card-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
      `}</style>

      <div className="mobile-vertical-container">
        {projects.map((project, index) => (
          <MobileProjectCard key={index} project={project} />
        ))}
      </div>

      <div
        id="diagonal-carousel-container"
        className="desktop-carousel relative items-center justify-center w-full min-h-screen"
        onClick={() => setSelectedId(null)}
      >
        <motion.div
          className="relative flex items-center"
          style={{ height: CONFIG.cardHeight }}
        >
          {projects.map((project, index) => {
            const isSelected = selectedId === index;
            const isHovered = hoveredId === index;

            if (selectedId !== null && !isSelected) return null;

            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer shadow-2xl"
                style={{
                  width: isSelected ? CONFIG.expandedWidth : CONFIG.cardWidth,
                  height: isSelected ? CONFIG.expandedHeight : CONFIG.cardHeight,
                }}
                layoutId={`card-container-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(isSelected ? null : index);
                }}
                onHoverStart={() => !isSelected && setHoveredId(index)}
                onHoverEnd={() => setHoveredId(null)}
                animate={{
                  x: isSelected
                    ? -(parseFloat(CONFIG.expandedWidth) / 2) * (window.innerWidth / 100)
                    : (index - (projects.length - 1) / 2) * CONFIG.cardGap - CONFIG.cardWidth / 2 + panOffset,
                  zIndex: isSelected ? 40 : isHovered ? 39 : projects.length - Math.abs(index - (projects.length - 1) / 2),
                  clipPath: isSelected ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : CONFIG.clipPath,
                  scale: !isSelected && isHovered ? 1.1 : 1,
                }}
                transition={{
                  ...cardTransition,
                  x: { type: "tween", ease: "linear", duration: 0.05 },
                  scale: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <div className={`relative w-full h-full flex ${isSelected ? "flex-col md:flex-row" : ""} bg-background-secondary overflow-hidden`}>
                  <ProjectContent
                    project={project}
                    isSelected={isSelected}
                    isHovered={isHovered}
                    transition={detailsTransition}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
};

export default DiagonalCarousel;
