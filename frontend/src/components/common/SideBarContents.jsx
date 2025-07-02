import React from "react";
import { HStack, Icon, Box, VStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { BiLineChart, BiSolidDashboard, BiTask } from "react-icons/bi";
import { GiHealthNormal } from "react-icons/gi";
import {
  FiGlobe,
  FiInbox,
  FiMail,
  FiPieChart,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { FaAddressBook } from "react-icons/fa";

export const links = [
  { name: "Dashboard", path: "/", icon: BiSolidDashboard },
  { name: "Health Check", path: "/health_check", icon: GiHealthNormal },
  { name: "Users", path: "/users", icon: FiUsers },
  { name: "Domains", path: "/domains", icon: FiGlobe },
  { name: "Mailboxes", path: "/mailboxes", icon: FiInbox },

  { name: "Quotas", path: "/quotas", icon: FiPieChart },
  { name: "Address", path: "/address", icon: FaAddressBook },
  { name: "Mail Repository", path: "/mail_repositories", icon: FiMail },
  // { name: "Deleted Message", path: "/deleted_messages", icon: FiTrash2 },
  { name: "Tasks", path: "/tasks", icon: BiTask },
  { name: "Report", path: "/report", icon: BiLineChart },
];
const SideBarContents = () => {
  const location = useLocation(); // Get the current route
  return (
    <VStack
      alignContent={"space-around"}
      spaceY={{ md: "44" }}
      h={"full"}
      p={"2"}
      color={"#fbae2f"}
    >
      <VStack w={"full"} mt={"2"}>
        {links.map((link) => {
          const isActive = location.pathname === link.path; // Check if link is active

          return (
            <HStack
              key={link.path}
              as={RouterLink}
              to={link.path}
              _hover={{
                color: isActive ? "white" : "#f14e2e",
                borderBottomWidth: "thin",
                borderBottomColor: "#f14e2e",
                transition: "all 0.3s ease",
              }}
              p="2"
              w="full"
              rounded={isActive ? "md" : "none"}
              fontWeight={"bold"}
              bg={isActive ? "#f14e2e" : "transparent"} // Active state background
              color={isActive ? "white" : "#fbae2f"} // Active state text color
            >
              <Box display="flex" alignItems="center" w="full">
                <Icon as={link.icon} size={20} />
                <Box ml={2}>{link.name}</Box>
              </Box>
            </HStack>
          );
        })}
      </VStack>
    </VStack>
  );
};

export default SideBarContents;
