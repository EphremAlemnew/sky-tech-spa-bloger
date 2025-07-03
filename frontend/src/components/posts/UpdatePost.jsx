import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toaster } from "../ui/toaster";
import { useDispatch } from "react-redux";
import { fetchPosts } from "@/features/postsSlice";
const API_URL = "http://localhost:5000"; // adjust to your backend

const UpdatePost = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch post details
  useEffect(() => {
    const token = Cookies.get("token");

    axios
      .get(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load post:", err);
        toaster.create({
          title: "Failed to load post",
          type: "error",
          isClosable: true,
        });
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async () => {
    const token = Cookies.get("token");

    try {
      await axios.put(
        `${API_URL}/posts/${id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchPosts());
      toaster.create({
        title: "Post updated successfully",
        type: "success",
        isClosable: true,
      });

      navigate("/"); // redirect after update
    } catch (err) {
      console.error("Update failed:", err);
      toaster.create({
        title: "Failed to update post",
        description: err.response?.data?.message || "Unexpected error",
        type: "error",
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box mt={40} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box mx="auto" mt={40} p={4}>
      <Heading size="lg" mb={6} color="#86a157">
        Update Post
      </Heading>
      <VStack spaceY={4} align="stretch">
        <Input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Post content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <HStack alignSelf={"end"}>
          <Button
            alignSelf={"end"}
            colorScheme="teal"
            onClick={handleUpdate}
            isDisabled={!title.trim() || !content.trim()}
          >
            Cancel
          </Button>
          <Button
            alignSelf={"end"}
            bg="#bcf553"
            color={"gray.700"}
            colorScheme="teal"
            onClick={handleUpdate}
            isDisabled={!title.trim() || !content.trim()}
          >
            Update
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default UpdatePost;
