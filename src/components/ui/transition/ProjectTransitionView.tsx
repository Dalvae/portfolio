// src/components/ui/transition/ProjectTransitionView.tsx
"use client";

import React from "react";
import { m } from "framer-motion";
import { createTransitionView } from "./factor";

// Define las variantes de animación
const animationVariants = {
  from: {
    y: 300, // Inicialmente el proyecto estará 300px abajo de su posición final.
    opacity: 0, // Inicialmente el proyecto será totalmente transparente.
  },
  to: {
    y: 0, // Finalmente, el proyecto se moverá a su posición final (y=0).
    opacity: 1, // Finalmente, el proyecto será totalmente opaco.
    scale: 1.2, // Añadimos un poco de zoom para destacarlo.
    transition: {
      type: "spring", // Usamos una transición "spring" para un efecto suave.
      stiffness: 100, // Configuramos la "stiffness" de la transición spring.
    },
  },
  exit: {
    x: "-100vw", // Cuando el proyecto sale de la vista, se desplaza hacia la izquierda.
    opacity: 0, // Al salir, el proyecto se vuelve totalmente transparente.
    transition: { duration: 0.5 }, // La duración de la transición de salida es de 0.5s.
  },
};

// Crea el componente utilizando createTransitionView y pasando las variantes de animación
const ProjectTransitionView = createTransitionView(animationVariants);

export default ProjectTransitionView;
