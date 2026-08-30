import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";

// Each page owns its heaviest dependencies (the carousel on the detail page,
// the autocomplete behind search), so they load per route instead of shipping
// in the initial bundle. Layout renders the Suspense boundary.
const Home = lazy(() => import("./pages/Home"));
const Cinema = lazy(() => import("./pages/Cinema"));
const Random = lazy(() => import("./pages/Random"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: (
          <Protected>
            <Random />
          </Protected>
        ),
        path: "/cinemas/random",
      },
      {
        element: <Cinema />,
        path: "/cinemas/:mediaType/:id",
      },
      {
        element: <NotFound />,
        path: "*",
      },
    ],
  },
]);
