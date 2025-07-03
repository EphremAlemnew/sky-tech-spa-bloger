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
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import CommentBox from "./CommentBox";
import PostNewComment from "./PostNewComment";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/features/postsSlice";

import { fetchCommentsByPostId } from "@/features/commentsSlice";
import { BiPencil, BiSearch, BiUpArrow } from "react-icons/bi";

import DeletePost from "./DeletePost";
import { useNavigate } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";
export default function PostsList() {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showGoToTop, setShowGoToTop] = useState(false);
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const allComments = useSelector((state) => state.comments.byPostId);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleUpdate = (postId) => {
    navigate(`/update-post?id=${postId}`);
  };
  return (
    <>
      <SimpleGrid columns={{ base: 1 }} spaceY={6} w="full">
        <HStack w={{ base: "full", md: "1/2" }} align={"end"}>
          <InputGroup startElement={<BiSearch />}>
            <Input
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </HStack>
        {[...posts]
          .filter(
            (post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post?.author?.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
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
                h={"auto"}
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
                    {post?.author?.id === user?.id && (
                      <Box>
                        <Button
                          onClick={() => handleUpdate(post.id)}
                          mr={"-5"}
                          color={"blue.600"}
                          variant={"plain"}
                        >
                          <BiPencil />
                        </Button>

                        <DeletePost post={post} />
                      </Box>
                    )}
                  </HStack>

                  <Badge colorScheme="blue" size={{ base: "md", md: "lg" }}>
                    {post?.author?.name === user?.name
                      ? "Your post"
                      : "By " + post?.author?.name}
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

                <VStack
                  align="start"
                  spacing={3}
                  p={4}
                  pt={0}
                  className="flex-grow"
                >
                  <div
                    className={`transition-shadow overflow-hidden ${
                      isExpanded ? "" : "max-h-[100px]"
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
                      {[...comments]
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((c, i) => (
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
      {showGoToTop && (
        <Button
          position="fixed"
          bottom="4"
          left="auto"
          w={"16"}
          colorScheme="teal"
          onClick={scrollToTop}
          borderRadius="full"
          boxShadow="md"
          zIndex={1000}
        >
          <FiArrowUp />
        </Button>
      )}
    </>
  );
}
