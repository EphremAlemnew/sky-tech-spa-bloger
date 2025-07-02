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
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import CommentBox from "./CommentBox";
import PostNewComment from "./PostNewComment";

// Dummy posts
const posts = [
  {
    id: 1,
    title: "Understanding React Context",
    content:
      "React Context provides a way to pass data through the component tree without having to pass props down manually. It's great for global state like user authentication, theme, and more. It reduces prop drilling and simplifies deeply nested component trees.",
    author: "Jane Doe",
    date: "2025-06-30T14:00:00Z",
    image: "light_logo.png",
    comments: [
      {
        author: "Michael",
        content:
          "Great explanation! I finally understood how context works deeply within nested components. It’s such a powerful tool especially when dealing with authentication flows, theming, and global configurations.",
      },
      {
        author: "Emily",
        content: "Really helped me, thanks!",
      },
    ],
  },
  {
    id: 2,
    title: "Why Clean Architecture Matters",
    content:
      "Clean architecture ensures maintainable and scalable code. It separates concerns and improves long-term development. Domain layers, application services, and infrastructure all play key roles in helping teams scale codebases cleanly.",
    author: "John Smith",
    date: "2025-06-25T10:30:00Z",
    image: "https://source.unsplash.com/random/400x200?code",
    comments: [
      {
        author: "Sarah",
        content:
          "Excellent write-up! Clean architecture is one of the most underrated concepts in building reliable software.",
      },
    ],
  },
  {
    id: 3,
    title: "What is Lorem Ibsum?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    author: "John Smith",
    date: "2025-06-25T10:30:00Z",
    image:
      "https://www.justinmind.com/wp-content/uploads/2018/11/Lorem-Ipsum-alternatives.png",
    comments: [
      {
        author: "Sarah",
        content:
          "Excellent write-up! Clean architecture is one of the most underrated concepts in building reliable software.",
      },
    ],
  },
];

export default function PostsList() {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});
  const [expandedComments, setExpandedComments] = useState({}); // new

  const toggleExpanded = (postId) => {
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleCommentExpand = (postId, commentIndex) => {
    setExpandedComments((prev) => ({
      ...prev,
      [`${postId}-${commentIndex}`]: !prev[`${postId}-${commentIndex}`],
    }));
  };

  return (
    <SimpleGrid columns={{ base: 1 }} spaceY={6} w="full">
      {posts.map((post) => {
        const isExpanded = expandedPostId === post.id;
        const showComments = visibleComments[post.id];
        const preview = post.content.slice(0, 100) + "...";

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
              <Heading size="xl" color={"#86a157"}>
                {post.title}
              </Heading>
              <Badge colorScheme="blue" size={{ base: "md", md: "lg" }}>
                By {post.author}
              </Badge>
              <Text fontSize="sm" color="gray.400">
                {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
              </Text>
            </VStack>

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

            <VStack align="start" spacing={3} p={4} className="flex-grow">
              <div
                className={`transition-shadow overflow-hidden ${
                  isExpanded ? "max-h-[500px]" : "max-h-[100px]"
                } duration-300 ease-in-out`}
              >
                <Text fontSize={{ base: "sm", md: "lg" }}>
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
                    Comments ({post.comments.length})
                  </Button>
                </HStack>
              </Box>

              {/* Comment Section */}
              {showComments && (
                <VStack align="start" w="full" spacing={2} pt={2}>
                  <PostNewComment />
                  {post.comments.map((c, i) => (
                    <CommentBox key={i} author={c.author} content={c.content} />
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
