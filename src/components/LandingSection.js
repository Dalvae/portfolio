import React from "react";
import { Avatar, Heading, VStack, Box } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Image,
} from "@chakra-ui/react";

const greeting = "Hello, I am Diego Alvarez!";
const bio1 = "Frontend developer";
const bio2 = "specialised in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
    position="relative"
  >
    <VStack spacing={4}>
      <Avatar size="2xl" name="Diego" src="/avatarcirculo.webp" />{" "}
      <Heading
        fontFamily="'Iosevka', monospace"
        as="h1"
        size="xl"
        color="white"
      >
        {greeting}
      </Heading>
      <Heading
        fontFamily="'Iosevka', monospace"
        fontStyle="italic"
        as="h2"
        size="md"
      >
        {bio1}
      </Heading>
      <Heading fontFamily="'Iosevka', monospace" as="h2" size="md">
        {bio2}
        <Popover>
          <PopoverTrigger>
            <Button colorScheme="blackAlpha" size="sm" ml={3}>
              Cv
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <Image src="/untipazo.jpg" alt="Un tipazo" borderRadius="md" />
          </PopoverContent>
        </Popover>
      </Heading>
    </VStack>
    <Box position="absolute" left={0} bottom={0}>
      <img
        src="/palm tree.svg"
        alt="Descripción del SVG"
        width="200px"
        height="200px"
      />
    </Box>
  </FullScreenSection>
);

export default LandingSection;
