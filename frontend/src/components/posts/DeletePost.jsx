import { Button, Dialog, Field, Portal, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { toaster } from "../ui/toaster";

import { useDispatch } from "react-redux";

import { fetchPosts } from "@/features/postsSlice";
import { deletePost } from "@/api/postApi";
const DeletePost = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (!post) {
      toaster.create({
        title: "Missing fields",
        description: "Please fill out all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await deletePost(post.id);

      toaster.create({
        title: "Blog Deleted",
        description: `${post.title} has been Deleted successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        type: "success",
      });

      // Call the onActionSuccess callback to refresh users data
      dispatch(fetchPosts());
    } catch (error) {
      toaster.create({
        title: "Server Error",
        description: "Failed to delete this blog.",
        status: "error",
        duration: 5000,
        isClosable: true,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button color={"red.500"} alignSelf="end" variant="plain" size={"sm"}>
          <BiTrash />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Deleting {post.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>
                    Are you sure to delete {post.title}?
                  </Field.Label>
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button size={"sm"} variant="outline">
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  size={"sm"}
                  bg={"red.500"}
                  isLoading={loading}
                  onClick={handleDelete}
                >
                  Yes
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeletePost;
