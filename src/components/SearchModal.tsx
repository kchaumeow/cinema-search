import {
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import CinemaList from "./CinemaList";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import Loader from "./Loader";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../features/store";
import { add, selectHistory } from "../features/searchSlice";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useLazyGetCinemaByNameQuery } from "../features/api/cinemasSlice";

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const [trigger, { isLoading, isFetching, data: cinemas }, lastPromiseInfo] =
    useLazyGetCinemaByNameQuery();

  const { page, limit, setPage, setLimit } = usePagination("search");

  useEffect(() => {
    dispatch(add(debouncedQuery));
    const request = trigger({ page, limit, query: debouncedQuery });
    return () => request.abort();
  }, [debouncedQuery, page, limit]);
  const searchHistory = useSelector(selectHistory);
  return (
    <>
      <Input
        onClick={onOpen}
        placeholder="Search by title"
        w={{ base: "100%", md: "80" }}
        size="sm"
        borderRadius="lg"
        readOnly
        cursor="pointer"
      />

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight={600}>
            Search
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <AutoComplete rollNavigation>
              <AutoCompleteInput
                placeholder="Search by title"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <AutoCompleteList bg="ink.raised" borderColor="ink.border">
                {searchHistory.map((item, index) => (
                  <AutoCompleteItem
                    key={index}
                    value={item}
                    label={item}
                    color="ink.text"
                  >
                    {item}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </AutoComplete>

            <Flex direction="column" gap={8} mt={8}>
              {!query ? (
                <EmptyState>Start typing a film title</EmptyState>
              ) : isLoading || isFetching || !cinemas ? (
                <Loader />
              ) : (
                <>
                  <CinemaList cinemas={cinemas.docs} />
                  <Pagination
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    setLimit={setLimit}
                    maxPage={cinemas.pages}
                  />
                </>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
