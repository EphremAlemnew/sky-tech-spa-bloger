import { HStack, Spacer, Button, Text, Link } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useColorMode } from "../ui/color-mode";
import { BiMoon, BiSun } from "react-icons/bi";

import { fetchMe } from "@/features/authSlice";
import { useEffect } from "react";
import { AvatarContent } from "./AvatarContent";
const NavBbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = colorMode === "light" ? "white" : "gray.800";
  const textColor = colorMode === "light" ? "gray.800" : "white";

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
      </Link>
      <Spacer />

      {/* Desktop Navigation Links */}
      <Spacer />

      <AvatarContent user={user} />
      <Button variant={"plain"} onClick={toggleColorMode} rounded={"full"}>
        {colorMode === "light" ? <BiMoon /> : <BiSun />}
      </Button>
    </HStack>
  );
};

export default NavBbar;
