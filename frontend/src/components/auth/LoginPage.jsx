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
import { Link, useNavigate } from "react-router-dom";
import { toaster } from "../ui/toaster";
import { useColorMode } from "../ui/color-mode";
import { useState } from "react";
import { login } from "@/api/AuthApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { colorMode } = useColorMode();
  const { login: loginUser } = useAuth(); // from your useAuth hook
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const bg = colorMode === "light" ? "white" : "gray.900";
  const imageSrc = colorMode === "light" ? "light_logo.png" : "light_logo.png";

  const handleLogin = async () => {
    if (!email || !password) {
      toaster.create({
        title: `Please fill all fields`,
        type: "info",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      await loginUser(data.access_token); // Store token in cookie & update user
      toaster.create({
        title: `Login successful`,
        type: "success",
      });
      navigate("/"); // Go to home/dashboard
    } catch (err) {
      toaster.create({
        title: err.message || `Invalid credentials`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      w="full"
      bg={bg}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
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
            mx="auto"
          />
        </Box>

        {/* Form Section */}
        <Box flex="1" px={{ base: "2" }} w="full">
          <Heading
            as="h1"
            color="#86a157"
            size={{ base: "xl", md: "3xl" }}
            textAlign="center"
            fontWeight="bolder"
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
              onKeyDown={handleKeyDown}
            />

            <Group w="full">
              <Input
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                size="md"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
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
              bg="#86a157"
              _hover={{ bg: "#304552" }}
              color="white"
              width="full"
              onClick={handleLogin}
              isLoading={loading}
            >
              Sign In
            </Button>

            <Text
              as={Link}
              alignSelf="self-start"
              to="/sign-up"
              color="blue.500"
              fontSize="sm"
              fontWeight="bold"
            >
              Create account
            </Text>
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
