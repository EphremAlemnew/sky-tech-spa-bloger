import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { useDispatch } from "react-redux";
import { addComment } from "@/features/commentsSlice";
const PostNewComment = ({ postId, onCommentAdded }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!content.trim()) {
      toaster.create({
        title: "Empty comment",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    try {
      await dispatch(addComment({ postId, content })).unwrap();
      setContent("");
      toaster.create({
        title: "Comment added",
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      toaster.create({
        title: "Error adding comment",
        description: err.message || "Something went wrong",
        type: "error",
      });
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
