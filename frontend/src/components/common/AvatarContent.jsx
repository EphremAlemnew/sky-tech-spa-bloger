import {
  Box,
  Button,
  HStack,
  Image,
  Popover,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";

import { useAuth } from "@/hooks/useAuth"; // ✅ use the already initialized one

export const AvatarContent = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <Popover.Root lazyMount unmountOnExit size={"sm"}>
      <Popover.Trigger asChild>
        <Button display={{ base: "flex", md: "flex" }} variant={"plain"}>
          <Image
            src="profile_picture.jpg"
            name={user?.name}
            w={"8"}
            h={"auto"}
            rounded={"full"}
          />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content w={"64"} p="4">
            <Popover.Arrow />
            <Popover.Body>
              <VStack color={"#fbae2f"} spacing="2" align="center">
                <Image
                  src="profile_picture.jpg"
                  name={user?.name}
                  w={"10"}
                  rounded={"full"}
                  size="lg"
                />
                <Text fontWeight="bold" color={"#86a157"}>
                  {user?.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user?.email}
                </Text>
                <HStack w={"full"} mx={"auto"}>
                  <Button
                    onClick={handleLogout}
                    variant="plain"
                    rounded="md"
                    bg="#bcf553"
                    color="gray.800"
                    fontWeight="bold"
                    px="8"
                    mx={"auto"}
                  >
                    Log out
                  </Button>
                </HStack>
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
