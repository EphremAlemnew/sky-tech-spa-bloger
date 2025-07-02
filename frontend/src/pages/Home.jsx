import AddNewPost from "@/components/posts/AddNewPost";
import PostsList from "@/components/posts/PostsList";
import {
  VStack,
  Text,
  Stack,
  SimpleGrid,
  Float,
  Circle,
  Box,
  IconButton,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <VStack alignItems={"start"} w={"full"} spaceY={"4"}>
        <Text
          w={"full"}
          borderBottom={"sm"}
          borderBottomColor={"gray.400"}
          fontWeight={"bold"}
          fontSize={"3xl"}
          pb={2}
        >
          Blogs
        </Text>
        <Stack
          w={"full"}
          mt={"5"}
          gap={0}
          direction={{ base: "column", md: "row" }}
          pb={"14"}
        >
          <PostsList />
        </Stack>
      </VStack>

      <Box
        position="fixed"
        bottom="10"
        right="10"
        shadow={"2xl"}
        borderRadius={"full"}
        zIndex={1000}
      >
        <AddNewPost />
      </Box>
    </>
  );
};

export default Home;
