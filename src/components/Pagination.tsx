import { Button, Flex, IconButton, Select, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { UsePaginationResult } from "../hooks/usePagination";

type PaginationProps = UsePaginationResult & { maxPage: number };

export default function Pagination({
  limit,
  page,
  setPage,
  maxPage,
  setLimit,
}: PaginationProps) {
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
          display={button && button < maxPage ? "block" : "none"}
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
      <Select
        w="20"
        size="sm"
        borderRadius="lg"
        defaultValue={limit}
        onChange={(e) => setLimit(e.target.value)}
      >
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="10">10</option>
      </Select>
    </Flex>
  );
}
