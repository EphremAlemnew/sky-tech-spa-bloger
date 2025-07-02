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
import { Link as RouterLink } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import Keycloak from "keycloak-js";
import { kc } from "@/hooks/useAuth"; // ✅ use the already initialized one

export const AvatarContent = () => {
  const firstName = localStorage.getItem("user_firstName") || "First";
  const lastName = localStorage.getItem("user_lastName") || "Last";
  const email = localStorage.getItem("user_email") || "user@example.com";
  const fullName = `${firstName} ${lastName}`;

  return (
    <Popover.Root lazyMount unmountOnExit>
      <Popover.Trigger asChild>
        <Button display={{ base: "flex", md: "flex" }} variant={"plain"}>
          <Image
            src="profile_picture.jpg" // placeholder pic
            name={fullName}
            w={"8"}
            h={"auto"}
            rounded={"full"}
          />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content p="4">
            <Popover.Arrow />
            <Popover.Body>
              <VStack color={"#fbae2f"} spacing="2" align="center">
                <Image
                  src="profile_picture.jpg"
                  name={fullName}
                  w={"20"}
                  rounded={"full"}
                  size="lg"
                />
                <Text fontWeight="bold">{fullName}</Text>
                <Text fontSize="sm" color="gray.500">
                  {email}
                </Text>
                <HStack w={"full"} mx={"auto"}>
                  {/* <Button
                  color={"#fbae2f"}
                  as={RouterLink}
                  to="/profile"
                  variant="plain"
                >
                  Profile Settings
                </Button> */}
                  <Button
                    color={"#f14e2e"}
                    onClick={() => {
                      kc.logout({ redirectUri: window.location.origin });
                    }}
                    variant={"plain"}
                  >
                    <BiLogOut />
                    Logout
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

// Dummy notification data
const notifications = [
  { id: 1, message: "New user registered", time: "2 mins ago" },
  { id: 2, message: "Server health check completed", time: "10 mins ago" },
  { id: 3, message: "New domain added", time: "30 mins ago" },
  { id: 4, message: "Mailbox quota exceeded", time: "1 hour ago" },
  { id: 5, message: "Message successfully delivered", time: "2 hours ago" },
];

export const NotificationContent = () => {
  return (
    <Popover.Root lazyMount unmountOnExit>
      <Popover.Trigger asChild>
        <Button display={{ base: "flex", md: "flex" }} variant={"plain"}>
          <Bell color={"#fbae2f"} />
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Popover.Title fontWeight="medium" color={"#fbae2f"}>
                Notifications
              </Popover.Title>

              {notifications.map((notification) => (
                <Box key={notification.id} p="2" borderBottom="1px solid #ddd">
                  <Text fontSize="sm">{notification.message}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {notification.time}
                  </Text>
                </Box>
              ))}

              <Button
                as={RouterLink}
                to={"/notifications"}
                mt="2"
                w="full"
                color={"#fbae2f"}
                variant={"plain"}
              >
                Show all notifications
              </Button>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};
