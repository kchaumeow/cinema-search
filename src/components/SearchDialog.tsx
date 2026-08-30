import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import CinemaList from "./CinemaList";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import Loader from "./Loader";
import Error from "./Error";
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

export default function SearchDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const finalRef = useRef(null);

  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const [trigger, { isLoading, isFetching, isError, error, data: cinemas }] =
    useLazyGetCinemaByNameQuery();

  const { page, setPage } = usePagination("search");

  useEffect(() => {
    if (!debouncedQuery) return;
    dispatch(add(debouncedQuery));
    const request = trigger({ page, query: debouncedQuery });
    return () => request.abort();
  }, [debouncedQuery, page]);
  const searchHistory = useSelector(selectHistory);

  return (
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
              <EmptyState>Start typing a film or series title</EmptyState>
            ) : isError ? (
              <Error error={error} />
            ) : isLoading || isFetching || !cinemas ? (
              <Loader />
            ) : (
              <>
                <CinemaList cinemas={cinemas.items} />
                {cinemas.items.length > 0 && (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    maxPage={cinemas.totalPages}
                  />
                )}
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
