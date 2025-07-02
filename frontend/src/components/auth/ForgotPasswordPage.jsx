import React, { useState } from "react";
import {
  Flex,
  Box,
  Image,
  Input,
  Button,
  VStack,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { PinInput } from "../ui/pin-input";
import { useColorMode } from "../ui/color-mode";

const ForgotPasswordPage = () => {
  const [isOtp, setIsOtp] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const bg = colorMode === "light" ? "white" : "black";
  const imageSrc = colorMode === "light" ? "light_logo.png" : "dark_logo.png";
  return (
    <Flex
      color={"black"}
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      w={"full"}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        alignItems="center"
        maxW="800px"
        w="90%"
      >
        {/* Image Section */}
        <Box flex="1" textAlign="center">
          <Image
            src={imageSrc} // Replace with your image URL
            alt="Login Image"
            borderRadius="lg"
            w={{ base: "1/3", md: "full" }}
            h="auto"
            mx={"auto"}
          />
        </Box>

        {/* Form Section */}
        <Box flex="1" px={{ base: "2" }} w={"full"}>
          {isOtp ? (
            <>
              <Heading
                as="h1"
                size={{ base: "xl", md: "3xl" }}
                textAlign="center"
                fontWeight={"bolder"}
                mb={6}
              >
                OTP Verification
              </Heading>
              <VStack spacing={4}>
                <PinInput />

                {/* Sign In Button */}
                <Button
                  as={Link}
                  to={"/login"}
                  bg={"#3fd7f4"}
                  _hover={{ bg: "#304552" }}
                  color={"white"}
                  width="full"
                  onClick={() => {
                    setIsOtp(!isOtp);
                  }}
                >
                  Verify
                </Button>

                {/* Forgot Password Link */}
                <Text fontSize={"sm"}>Didn't get the code? resend in </Text>
                <Text
                  as={Link}
                  to="/"
                  color="blue.500"
                  fontSize="sm"
                  textAlign="center"
                  _hover={{ textDecoration: "underline" }}
                ></Text>
              </VStack>
            </>
          ) : (
            <>
              <Heading
                as="h1"
                size={{ base: "xl", md: "3xl" }}
                textAlign="center"
                fontWeight={"bolder"}
                mb={6}
              >
                Forgot password page!
              </Heading>
              <VStack spacing={4}>
                <Input
                  placeholder="Enter your email"
                  required
                  type="email"
                  size="md"
                />

                {/* Sign In Button */}
                <Button
                  bg={"#3fd7f4"}
                  _hover={{ bg: "#304552" }}
                  color={"white"}
                  width="full"
                  onClick={() => {
                    setIsOtp(!isOtp);
                  }}
                >
                  Send OTP
                </Button>

                {/* Forgot Password Link */}
                <Text
                  as={Link}
                  to="/login"
                  color="blue.500"
                  fontSize="sm"
                  textAlign="center"
                  _hover={{ textDecoration: "underline" }}
                >
                  Back to login page
                </Text>
              </VStack>
            </>
          )}
        </Box>
      </Stack>
    </Flex>
  );
};

export default ForgotPasswordPage;
