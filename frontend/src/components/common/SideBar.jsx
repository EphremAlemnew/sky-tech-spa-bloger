import React from "react";
import { Box } from "@chakra-ui/react";
import SideBarContents from "./SideBarContents";

const Sidebar = () => {
  return (
    <>
      <Box display={{ base: "none", md: "block" }}>
        <Box
          position="fixed"
          shadow={"lg"}
          left={0}
          top={0}
          h="100vh"
          w={"60"}
          color={"#fbae2f"}
        >
          <Box mt={"14"}>
            <SideBarContents />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
