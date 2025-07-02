// components/PostNewComment.jsx
import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";
const PostNewComment = ({ postId, onCommentAdded }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!author.trim() || !content.trim()) {
      toaster.create({
        title: "Missing fields",
        description: "Please fill out all fields",
        type: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate API call — replace with actual POST
      const newComment = {
        author,
        content,
      };

      // TODO: Replace with Axios POST to backend
      // await axios.post(`/api/comments`, { authorId, postId, content })

      onCommentAdded?.(newComment); // Callback to update UI

      // Reset form
      setAuthor("");
      setContent("");

      toaster.create({
        title: "Comment added",
        description: "Your comment was successfully posted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toaster.create({
        title: "Failed to add comment",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      w="full"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.400"
      mt={4}
      p={2}
      rounded="md"
      borde
    >
      <VStack spacing={3} align="start" className="w-full">
        <Textarea
          placeholder="Your comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <Button
          size="sm"
          colorScheme="teal"
          onClick={handleSubmit}
          isLoading={loading}
          alignSelf="end"
        >
          Add Comment
        </Button>
      </VStack>
    </Box>
  );
};

export default PostNewComment;
