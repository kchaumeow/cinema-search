import { Flex, Heading, Text } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex direction="column" align="center" justify="center" gap={3} py={32}>
      <Heading size="3xl" color="ink.border">
        404
      </Heading>
      <Text fontSize="lg" fontWeight={500}>
        Page not found
      </Text>
      <Text color="ink.muted" fontSize="sm">
        The page you are looking for does not seem to exist
      </Text>
    </Flex>
  );
}
