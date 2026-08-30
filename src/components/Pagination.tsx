import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { UsePaginationResult } from "../hooks/usePagination";

type PaginationProps = UsePaginationResult & { maxPage: number };

export default function Pagination({ page, setPage, maxPage }: PaginationProps) {
  const buttons = [page - 1, page, page + 1];
  return (
    <Flex align="center" gap={2} flexWrap="wrap" justify="center">
      <IconButton
        aria-label="Previous page"
        icon={<ArrowBackIcon />}
        variant="outline"
        size="sm"
        isDisabled={page === 1}
        onClick={() => setPage(page - 1)}
      />
      {buttons.map((button) => (
        <Button
          key={button}
          variant={page === button ? "solid" : "outline"}
          size="sm"
          minW={9}
          isDisabled={page === button}
          display={button >= 1 && button <= maxPage ? "block" : "none"}
          onClick={() => setPage(button)}
        >
          {button}
        </Button>
      ))}
      <IconButton
        aria-label="Next page"
        icon={<ArrowForwardIcon />}
        variant="outline"
        size="sm"
        isDisabled={page === maxPage}
        onClick={() => setPage(page + 1)}
      />
      <Text color="ink.muted" fontSize="sm" px={2}>
        of {maxPage}
      </Text>
    </Flex>
  );
}
