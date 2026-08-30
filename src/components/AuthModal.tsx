import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userData, setUserData] = useState<{
    username?: string;
    password?: string;
  } | null>(null);
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={onOpen} size="sm">
        Log in
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight={600}>
            Sign in
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(setUser(userData));
                onClose();
              }}
            >
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Your username"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Your password"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <Button type="submit" mt={2}>
                  Sign in
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
