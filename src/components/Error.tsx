import { Flex, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

interface APIError {
  status: number | string;
  error: string;
}

interface ErrorProps {
  error: unknown;
}

export default function Error({ error }: ErrorProps) {
  return (
    <Flex direction="column" align="center" justify="center" gap={3} py={32}>
      <WarningTwoIcon boxSize={6} color="red.400" />
      <Heading size="md">
        Something went wrong{isAPIError(error) && ` (${error.status})`}
      </Heading>
      <Text color="ink.muted" fontSize="sm">
        {isAPIError(error) && error.error}
      </Text>
    </Flex>
  );
}

function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === "object" &&
    error !== null &&
    error.hasOwnProperty("status") &&
    error.hasOwnProperty("error")
  );
}
