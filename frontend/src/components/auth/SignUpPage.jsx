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
  Field,
  Group,
} from "@chakra-ui/react";

import { Link, Navigate } from "react-router-dom";
import { useColorMode } from "../ui/color-mode";
import { useState } from "react";
import { register } from "@/api/AuthApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toaster } from "../ui/toaster";

const SignUpPage = () => {
  const { colorMode } = useColorMode();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const bg = colorMode === "light" ? "white" : "gray.900";
  const imageSrc = colorMode === "light" ? "light_logo.png" : "light_logo.png";

  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" />;

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email address";
    }

    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;
      await register({ email, name: fullName, password });
      toaster.create({
        title: `Account Created successfully!`,
        type: "success",
      });
      window.location.href = "/login";
    } catch (error) {
      alert();
      toaster.create({
        title: error.message || "Registration failed",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  return (
    <Flex
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
        <Box flex="1" textAlign="center">
          <Image
            src={imageSrc}
            alt="Signup Image"
            borderRadius="lg"
            w={{ base: "1/3", md: "full" }}
            h="auto"
            mx={"auto"}
          />
        </Box>

        <Box flex="1" px={{ base: "2" }} w={"full"}>
          <Heading
            as="h1"
            color={"#86a157"}
            size={{ base: "xl", md: "3xl" }}
            textAlign="center"
            fontWeight={"bolder"}
            mb={6}
          >
            Create New Account.
          </Heading>
          <VStack spacing={4}>
            <Field.Root invalid={!!errors.firstName}>
              <Field.Label>First Name</Field.Label>
              <Input
                placeholder="Enter your first name"
                type="text"
                size="md"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {errors.firstName && (
                <Field.ErrorText>{errors.firstName}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.lastName}>
              <Field.Label>Last Name</Field.Label>
              <Input
                placeholder="Enter your last name"
                type="text"
                size="md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {errors.lastName && (
                <Field.ErrorText>{errors.lastName}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="Enter your email"
                type="email"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {errors.email && (
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Password</Field.Label>
              <Group w={"full"}>
                <Input
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  size="md"
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
              {errors.password && (
                <Field.ErrorText>{errors.password}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors.confirmPassword}>
              <Field.Label>Confirm Password</Field.Label>
              <Group w={"full"}>
                <Input
                  placeholder="Confirm your password"
                  type={showPassword ? "text" : "password"}
                  size="md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {errors.confirmPassword && (
                <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
              )}
            </Field.Root>

            <Button
              bg={"#545aea"}
              _hover={{ bg: "#304552" }}
              color={"white"}
              width="full"
              onClick={handleSignUp}
              isLoading={loading}
            >
              Sign Up
            </Button>

            <Text
              as={Link}
              alignSelf={"self-end"}
              to="/login"
              color="blue.500"
              fontSize="sm"
              fontWeight={"bold"}
            >
              Back to login page.
            </Text>
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;
