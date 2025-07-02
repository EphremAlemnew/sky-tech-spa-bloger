import {
  Box,
  HStack,
  Spacer,
  Button,
  VStack,
  useDisclosure,
  Text,
  Link,
} from "@chakra-ui/react";

import { useColorMode } from "../ui/color-mode";
import { BiMenu, BiX, BiLogoDrupal, BiMoon, BiSun } from "react-icons/bi";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
const NavBbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const bg = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "gray.800" : "white";

  return (
    <HStack
      px={4}
      position="fixed"
      top={0}
      w={"full"}
      zIndex={1000}
      bg={bg}
      color={textColor}
      h={"20"}
      justifyContent={"space-between"}
    >
      {/* Logo or App Name */}
      <Link href="/" textDecoration={"none"} variant={"plain"}>
        <Text fontSize="2xl" fontWeight="bold">
          SPA
        </Text>
        <Text fontSize="2xl" color={"#86a157"} fontWeight={"lighter"}>
          Bloger
        </Text>
      </Link>
      <Spacer />

      {/* Desktop Navigation Links */}
      <Spacer />
      <HStack display={{ base: "none", md: "flex" }}>
        <Button
          variant={"plain"}
          onClick={toggleColorMode}
          rounded={"md"}
          bg={"#bcf553"}
          color={"gray.800"}
          fontWeight={"bold"}
          px={"8"}
        >
          Log out
        </Button>
      </HStack>
      <Button variant={"plain"} onClick={toggleColorMode} rounded={"full"}>
        {colorMode === "light" ? <BiMoon /> : <BiSun />}
      </Button>
      <DrawerRoot placement={"top"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <Button variant={"plain"} display={{ base: "flex", md: "none" }}>
            {isOpen ? <BiX /> : <BiMenu />}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <VStack spacing={4} w={"full"}>
                <Button
                  variant={"plain"}
                  onClick={toggleColorMode}
                  rounded={"md"}
                  bg={"#bcf553"}
                  fontWeight={"bold"}
                  px={"8"}
                >
                  Log out
                </Button>
              </VStack>
            </Box>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </HStack>
  );
};

export default NavBbar;
