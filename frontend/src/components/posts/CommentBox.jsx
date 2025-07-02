// components/CommentBox.jsx
import { useEffect, useRef, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const CommentBox = ({ author, content }) => {
  const ref = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.scrollHeight > el.clientHeight) {
      setIsOverflowing(true);
    }
  }, [content]);

  return (
    <Box
      p={2}
      w="full"
      borderRadius="md"
      border="1px solid"
      borderColor="gray.400"
    >
      <Text fontWeight="bold">{author}</Text>
      <Box
        ref={ref}
        maxHeight={expanded ? "none" : "60px"}
        overflow="hidden"
        transition="max-height 0.3s ease"
      >
        <Text fontSize="sm">{content}</Text>
      </Box>
      {isOverflowing && (
        <Button
          size="xs"
          variant="link"
          colorScheme="teal"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </Box>
  );
};

export default CommentBox;
