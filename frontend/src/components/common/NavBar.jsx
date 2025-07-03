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
import { useDispatch, useSelector } from "react-redux";
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
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "@/features/authSlice";
import { useEffect } from "react";
const NavBbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const bg = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "gray.800" : "white";
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <HStack
      px={4}
      position="fixed"
      top={0}
      w={"full"}
      zIndex={1000}
      bg={bg}
      color={textColor}
      h={"16"}
      justifyContent={"space-between"}
      shadow={"md"}
    >
      {/* Logo or App Name */}
      <Link href="/" textDecoration={"none"} variant={"plain"}>
        <Text fontSize="2xl" fontWeight="bold">
          SPA
        </Text>
        <Text fontSize="2xl" color={"#86a157"} fontWeight={"lighter"}>
          Blogger
        </Text>
        <Text fontSize="2xl" color={"#86a157"} fontWeight={"lighter"}>
          {user?.name}
        </Text>
      </Link>
      <Spacer />

      {/* Desktop Navigation Links */}
      <Spacer />
      <HStack display={{ base: "none", md: "flex" }}>
        <Button
          onClick={handleLogout}
          variant="plain"
          rounded="md"
          bg="#bcf553"
          color="gray.800"
          fontWeight="bold"
          px="8"
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
              <VStack justifyContent={"flex-start"} spacing={4} w={"full"}>
                <Button
                  onClick={handleLogout}
                  variant="plain"
                  rounded="md"
                  bg="#bcf553"
                  color="gray.800"
                  fontWeight="bold"
                  px="8"
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
