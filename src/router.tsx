import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cinema from "./pages/Cinema";
import NotFound from "./pages/NotFound";
import Protected from "./components/Protected";
import Random from "./pages/Random";

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
