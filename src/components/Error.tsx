import { Flex, Heading, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorProps {
  error: unknown;
}

// RTK Query reports three different shapes: an HTTP status with a body, a
// transport-level failure, and a plain serialized exception. Only the first
// two carry a status worth showing.
function describe(error: unknown): { status?: string; message?: string } {
  if (typeof error !== "object" || error === null) return {};

  if ("status" in error) {
    const queryError = error as FetchBaseQueryError;
    if (typeof queryError.status === "number") {
      return {
        status: String(queryError.status),
        message: apiMessage(queryError.data),
      };
    }
    return { status: queryError.status, message: queryError.error };
  }

  const { name, message } = error as SerializedError;
  return { status: name, message };
}

function apiMessage(data: unknown): string | undefined {
  if (typeof data === "object" && data !== null && "message" in data) {
    const { message } = data as { message: unknown };
    if (typeof message === "string") return message;
  }
  return undefined;
}

export default function Error({ error }: ErrorProps) {
  const { status, message } = describe(error);
  return (
    <Flex direction="column" align="center" justify="center" gap={3} py={32}>
      <WarningTwoIcon boxSize={6} color="red.400" />
      <Heading size="md">
        Something went wrong{status && ` (${status})`}
      </Heading>
      {message && (
        <Text color="ink.muted" fontSize="sm" maxW="60ch" textAlign="center">
          {message}
        </Text>
      )}
    </Flex>
  );
}
