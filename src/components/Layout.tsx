import { Suspense } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/userSlice";
import Loader from "./Loader";

export default function Layout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <Box minH="100vh" bg="ink.bg">
      <Flex
        as="header"
        position="sticky"
        top={0}
        zIndex="sticky"
        align="center"
        gap={4}
        px={{ base: 4, md: 8 }}
        py={4}
        bg="ink.bg"
        borderBottomWidth="1px"
        borderColor="ink.border"
      >
        {id && (
          <IconButton
            aria-label="Go back"
            icon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="ghost"
            size="sm"
          />
        )}
        <Link to="/">
          <Text fontWeight={600} fontSize="lg" letterSpacing="-0.02em">
            Cinema Search
          </Text>
        </Link>
        <Flex gap={2} align="center" ml="auto">
          {!user ? (
            <AuthModal />
          ) : (
            <>
              <Link to="/cinemas/random">
                <Button variant="ghost" size="sm">
                  Random title
                </Button>
              </Link>
              <Button
                onClick={() => dispatch(setUser(null))}
                variant="outline"
                size="sm"
              >
                Log out
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <Box as="main" px={{ base: 4, md: 8 }} py={10} maxW="1400px" mx="auto">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
