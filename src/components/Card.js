import { Heading, HStack, Text, VStack, Box } from "@chakra-ui/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <VStack
      border="2px"
      borderColor="black"
      borderRadius="md"
      overflow="hidden"
      spacing={5}
      p={4}
      align="stretch"
      backgroundColor={"#F2F597"}
    >
      <Box border="2px" borderColor="black" borderRadius="md" overflow="hidden">
        <Image src={imageSrc} alt={title} layout="responsive" />
      </Box>

      <VStack align="start" spacing={2}>
        <HStack justify="space-between" w="full">
          <Heading color="black" size="md">
            {title}
          </Heading>
          <FontAwesomeIcon color="black" icon={faArrowRight} />
        </HStack>

        <Text color="black">{description}</Text>
      </VStack>
    </VStack>
  );
};

export default Card;
