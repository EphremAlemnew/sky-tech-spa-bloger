import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { toaster } from "../ui/toaster";
import { createPost } from "@/api/postApi";
const AddNewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toaster.create({
        title: "Please fill in both fields",
        type: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await createPost({
        title: title.trim(),
        content: content.trim(),
      });

      toaster.create({
        title: "Post created successfully",
        type: "success",
        duration: 3000,
        isClosable: true,
      });

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to post:", error);
      toaster.create({
        title: "Error creating post",
        type: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button
          bg={"#bcf553"}
          borderRadius={"full"}
          color={"gray.800"}
          variant="outline"
          height={"16"}
          w={"16"}
        >
          <FiPlus size={32} />
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add New Blog</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input
                    placeholder="Your blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Content</Field.Label>
                  <Textarea
                    placeholder="Your blog content..."
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button bg="#bcf553" color="gray.800" onClick={handleSubmit}>
                  Post
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddNewPost;
