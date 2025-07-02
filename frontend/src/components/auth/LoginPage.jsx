import {
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  Box,
  Group,
} from "@chakra-ui/react";

import { Checkbox } from "../ui/checkbox";
import { Link, Navigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { useColorMode } from "../ui/color-mode";
import { useState } from "react";
import { login } from "@/api/AuthApi";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const bg = colorMode === "light" ? "white" : "gray.900";
  const imageSrc = colorMode === "light" ? "light_logo.png" : "light_logo.png";

  // ✅ Redirect if already logged in
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" />;

  const handleLogin = async () => {
    if (!userName || !password) {
      toaster.create({
        title: `Please fill all fields`,
        type: "info",
      });
      return;
    }

    try {
      const response = await login(userName, password);
      localStorage.setItem("token", response.token);
      toaster.create({
        title: `You have successfully logged in!`,
        type: "success",
      });
      window.location.href = "/";
    } catch (error) {
      toaster.create({
        title: `Login failed!`,
        type: "error",
      });
    }
  };

  // ✅ Handle enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Flex
      color={"#fbae2f"}
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      w={"full"}
      bg={bg}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        p={8}
        borderRadius="lg"
        boxShadow={"2xl"}
        alignItems="center"
        maxW="800px"
        w="90%"
      >
        {/* Image Section */}
        <Box flex="1" textAlign="center">
          <Image
            src={imageSrc}
            alt="Login Image"
            borderRadius="lg"
            w={{ base: "1/3", md: "full" }}
            h="auto"
            mx={"auto"}
          />
        </Box>

        {/* Form Section */}
        <Box flex="1" px={{ base: "2" }} w={"full"}>
          <Heading
            as="h1"
            color={"#bcf553"}
            size={{ base: "xl", md: "3xl" }}
            textAlign="center"
            fontWeight={"bolder"}
            mb={6}
          >
            Welcome! Please login.
          </Heading>
          <VStack spacing={4}>
            <Input
              placeholder="Enter your email"
              required
              type="email"
              size="md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown} // Handle Enter key
            />

            {/* Password Field with show/hide */}
            <Group w={"full"}>
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                size="md"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown} // Handle Enter key
              />

              <Button
                onClick={() => setShowPassword(!showPassword)}
                variant="ghost"
                size="sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </Button>
            </Group>

            <Button
              bg={"#bcf553"}
              _hover={{ bg: "#304552" }}
              color={"white"}
              width="full"
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
