import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "../ui/color-mode";

const ErrorPage = () => {
  const { colorMode } = useColorMode();

  const imageSrc = colorMode === "light" ? "Not_found.png" : "Not_found.png";
  return (
    <Flex
      color={"#bcf553"}
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      textAlign="center"
      w={"full"}
    >
      <Box textAlign="center" p={"4"}>
        <Image src={imageSrc} w={"96"} mx={"auto"} />

        <Text fontWeight={"bold"} fontSize="lg" mt={4}>
          Oops! The page you are looking for does not exist.
        </Text>
      </Box>
    </Flex>
  );
};

export default ErrorPage;
