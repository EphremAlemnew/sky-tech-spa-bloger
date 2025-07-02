import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InputGroup } from "../ui/input-group";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useColorMode } from "../ui/color-mode";
import { fetchUsersData } from "@/features/users/usersSlice";
import { useNavigate } from "react-router-dom";
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
import { BiSearch } from "react-icons/bi";
import { fetchDomainsData } from "@/features/domains/domainsSlice";
import { links } from "./SideBarContents";
const SearchContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const { users } = useSelector((state) => state.users);
  const { domains } = useSelector((state) => state.domains);

  const navigate = useNavigate();

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();

      if (query === "") {
        setFilteredResults([]);
      } else {
        // Match users
        const userMatches = users
          .filter((user) => user.username.toLowerCase().includes(query))
          .map((user) => ({ type: "user", value: user.username }));

        // Match domains
        const domainMatches = domains
          .filter((domain) => domain.toLowerCase().includes(query))
          .map((domain) => ({ type: "domain", value: domain }));

        // Match sidebar links
        const linkMatches = links
          .filter((link) => link.name.toLowerCase().includes(query))
          .map((link) => ({ type: "link", value: link.name, path: link.path }));

        setFilteredResults([...userMatches, ...domainMatches, ...linkMatches]);
      }

      setIsSearching(false);
    }, 300);
  };

  const handleResultClick = (result) => {
    if (result.type === "user") {
      navigate("/users");
    } else if (result.type === "domain") {
      navigate("/domains");
    } else if (result.type === "link") {
      navigate(result.path);
    }

    setSearchQuery(""); // Clear input
    setFilteredResults([]);
  };

  return (
    <Box>
      <InputGroup startElement={<Search size={20} />}>
        <Input
          placeholder="Search here..."
          name="name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleSearch}
          w={{ lg: "xl" }}
          rounded={"xl"}
        />
      </InputGroup>

      {filteredResults.length > 0 && (
        <VStack
          position="absolute"
          top="100%"
          h={"96"}
          left={0}
          bg="white"
          width="xl"
          boxShadow="md"
          borderRadius="md"
          alignItems="start"
          p={2}
          mt={2}
          zIndex={10}
          overflowY={"auto"}
        >
          {filteredResults.map((result, index) => (
            <Box
              key={index}
              p={2}
              w="full"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => handleResultClick(result)}
            >
              <Text>
                {result.value}{" "}
                <Text as="span" fontSize="sm" color="gray.500">
                  ({result.type})
                </Text>
              </Text>
            </Box>
          ))}
        </VStack>
      )}

      {searchQuery && !isSearching && filteredResults.length === 0 && (
        <VStack
          position="absolute"
          top="100%"
          left={0}
          bg="white"
          width="xl"
          boxShadow="md"
          borderRadius="md"
          alignItems="start"
          p={2}
          mt={2}
          zIndex={10}
        >
          <Box p={2} w="full">
            <Text color="gray.500">No results found</Text>
          </Box>
        </VStack>
      )}
    </Box>
  );
};

export const DesktopSearch = () => {
  return (
    <HStack
      fontWeight={"bold"}
      as="nav"
      display={{ base: "none", md: "flex" }}
      justifyContent="space-between"
      alignSelf={"center"}
      alignItems={"center"}
      position="relative"
    >
      <SearchContent />
    </HStack>
  );
};

export const MobileSearch = () => {
  const { colorMode } = useColorMode();
  const textColor = colorMode === "light" ? "#fbae2f" : "#fbae2f";

  return (
    <DrawerRoot placement={"top"}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button
          color={textColor}
          variant={"plain"}
          display={{ base: "flex", md: "none" }}
        >
          <BiSearch />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Search</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <HStack w={"full"}>
            <SearchContent />
          </HStack>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};
