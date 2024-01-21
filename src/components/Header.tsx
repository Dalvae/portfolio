"use client";
import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Social {
  icon: IconDefinition;
  url: string;
}

const socials: Social[] = [
  {
    icon: faEnvelope,
    url: "mailto: diego.alvarez.e@ug.uchile.cl",
  },
  {
    icon: faGithub,
    url: "https://github.com/dalvae",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/diego-alvarez-espinoza/",
  },
  {
    icon: faInstagram,
    url: "http://instagram.com/diego.alvarez.e",
  },
];

const Header: React.FC = () => {
  const headerRef = useRef(null); // Referencia para el encabezado
  const lastScrollY = useRef(0); //

  const handleClick = (anchor: string) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        headerRef.current.style.transform = "translateY(0)";
      } else {
        headerRef.current.style.transform = "translateY(-100%)";
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      zIndex="sticky"
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={4}>
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white icon-link"
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    size="2x"
                    style={{ color: "white" }}
                  />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              <Link href="#projects-section">Projects</Link>
              <Link href="#contactme-section">Contact Me</Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;
