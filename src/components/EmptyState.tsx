import { Text } from "@chakra-ui/react";

export default function EmptyState({ children }: { children: string }) {
  return (
    <Text color="ink.muted" fontSize="md" textAlign="center" py={16} w="100%">
      {children}
    </Text>
  );
}
