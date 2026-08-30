import { Input, useDisclosure } from "@chakra-ui/react";
import { Suspense, lazy, useEffect, useState } from "react";

// The dialog carries the autocomplete and its popper, which nothing else on
// the catalogue page needs, so it is fetched on the first open.
const SearchDialog = lazy(() => import("./SearchDialog"));

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Kept mounted after the first open so the dialog keeps its query and its
  // close transition, exactly as it did before the split.
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setOpened(true);
  }, [isOpen]);

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

      {opened && (
        <Suspense fallback={null}>
          <SearchDialog isOpen={isOpen} onClose={onClose} />
        </Suspense>
      )}
    </>
  );
}
