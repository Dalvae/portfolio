import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

const projects = [
  {
    title: "Sublimahyca e-Commerce",
    description:
      "Robust e-commerce platform built using the Medusa framework for backend operations and Next.js for the frontend, seamlessly integrated with various services including Resend, Transbank, and GoogleAuth.",
    getImageSrc: () => require("../images/photo1.jpg"),
  },
  {
    title: "Carcaj",
    description:
      "Custom theme for Carcaj.cl in WordPress, where I updated the layout structure from a grid-based approach to flexbox. I fixed several pre-existing bugs in previous themes and implemented a new method for relating articles. Additionally, I established a CI/CD process using GitHub for efficient and up-to-date management of the site.",
    getImageSrc: () => require("../images/photo2.jpg"),
  },
  {
    title: "Buc",
    description:
      "Introducing my first custom WordPress theme for Buc.cl, built from scratch using Bootstrap and SASS for CSS, and PHP on the front-end. This theme features a simple and elegant design that highlights Buc's values, ensuring a smooth and user-friendly experience.",
    getImageSrc: () => require("../images/photo3.jpg"),
  },
  {
    title: "Ni-rotations",
    description:
      "I began my programming journey by automating rotations for the game World of Warcraft using the Ni framework, learning Lua, which is truly a great language for beginners. I gained insights into API communication through the WoW API, and some of my rotations became quite popular among players.",
    getImageSrc: () => require("../images/photo4.jpg"),
  },
];

const ProjectsSection = () => {
  return (
    <FullScreenSection
      backgroundColor="#492E87"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={["1fr", null, "repeat(2, minmax(0, 1fr))"]}
        gridGap={8}
      >
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            description={project.description}
            imageSrc={project.getImageSrc()}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
