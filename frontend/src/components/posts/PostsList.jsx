import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Badge,
  Button,
  SimpleGrid,
  HStack,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import CommentBox from "./CommentBox";
import PostNewComment from "./PostNewComment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/features/postsSlice";

import { fetchCommentsByPostId } from "@/features/commentsSlice";
import { LuOption } from "react-icons/lu";
import { BiEdit, BiMenu, BiPen, BiPencil, BiTrash } from "react-icons/bi";
import { FaEdit, FaPen } from "react-icons/fa";
export default function PostsList() {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({}); // new
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const allComments = useSelector((state) => state.comments.byPostId);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "loading") return <Spinner />;
  if (status === "failed") return <p>Error: {error}</p>;
  const toggleExpanded = (postId) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    if (!visibleComments[postId]) {
      dispatch(fetchCommentsByPostId(postId)); // Load only when first opened
    }
  };

  const toggleCommentExpand = (postId, commentIndex) => {
    setExpandedComments((prev) => ({
      ...prev,
      [`${postId}-${commentIndex}`]: !prev[`${postId}-${commentIndex}`],
    }));
  };

  return (
    <SimpleGrid columns={{ base: 1 }} spaceY={6} w="full">
      {[...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post) => {
          const isExpanded = expandedPostId === post.id;
          const showComments = visibleComments[post.id];
          const preview = post.content.slice(0, 100) + "...";

          const comments = allComments[post.id] || [];

          return (
            <Box
              key={post.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
              transition="all 0.2s ease-in-out"
              display="flex"
              flexDirection="column"
            >
              <VStack align="start" spacing={1} p={4}>
                <HStack w={"full"}>
                  <Heading size="xl" color={"#86a157"}>
                    {post.title}
                  </Heading>
                  <Spacer />
                  <Box>
                    <Button mr={"-5"} color={"blue.600"} variant={"plain"}>
                      <BiPencil />
                    </Button>
                    <Button color={"red.500"} variant={"plain"}>
                      <BiTrash />
                    </Button>{" "}
                  </Box>
                </HStack>

                <Badge colorScheme="blue" size={{ base: "md", md: "lg" }}>
                  By {post?.author?.name}
                </Badge>
                <Text fontSize="sm" color="gray.400">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </Text>
              </VStack>
              {post.imageUrls &&
                post.imageUrls.map((url, idx) => (
                  <>
                    <Image
                      px={4}
                      src={post.image}
                      alt={" Image of " + post.title}
                      w="full"
                      h={{ lg: "fit" }}
                      borderRadius={"lg"}
                      className=" border-r-4"
                      // objectFit="contain"
                    />
                  </>
                ))}

              <VStack align="start" spacing={3} p={4} className="flex-grow">
                <div
                  className={`transition-shadow overflow-hidden ${
                    isExpanded ? "max-h-[500px]" : "max-h-[100px]"
                  } duration-300 ease-in-out`}
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    whiteSpace="pre-wrap"
                  >
                    {isExpanded ? post.content : preview}
                  </Text>
                </div>

                {/* Bottom Actions */}
                <Box w="full">
                  <HStack justifyContent="space-between">
                    <Button
                      variant="link"
                      size="sm"
                      color={"#bcf553"}
                      colorScheme="teal"
                      onClick={() => toggleExpanded(post.id)}
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </Button>

                    <Button
                      variant={"outline"}
                      size="sm"
                      colorScheme="gray"
                      onClick={() => toggleComments(post.id)}
                    >
                      Comments
                      {/* ({post.comments.length}) */}
                    </Button>
                  </HStack>
                </Box>

                {/* Comment Section */}
                {showComments && (
                  <VStack align="start" w="full" spacing={2} pt={2}>
                    <PostNewComment postId={post.id} />
                    {comments.map((c, i) => (
                      <CommentBox
                        key={i}
                        author={c?.author?.name}
                        content={c.content}
                        createdAt={c.createdAt}
                      />
                    ))}
                  </VStack>
                )}
              </VStack>
            </Box>
          );
        })}
    </SimpleGrid>
  );
}
