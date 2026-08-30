import { Flex, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex justify="center" align="center" py={20} w="100%">
      <Spinner
        thickness="2px"
        speed="0.7s"
        emptyColor="ink.border"
        color="brand.400"
        boxSize={8}
      />
    </Flex>
  );
}
