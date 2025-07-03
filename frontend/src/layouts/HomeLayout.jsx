import NavBar from "@/components/common/NavBar";
import { useColorMode } from "@/components/ui/color-mode";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

import React from "react";

const HomeLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = colorMode === "light" ? "white" : "#282828";
  return (
    <Flex w="full" minH="100vh" bg={bg}>
      <Box flex="1" w="full" py={"8"}>
        <NavBar />
        <Box my="16" mt="18" mx={{ base: "3", lg: "72" }}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default HomeLayout;
