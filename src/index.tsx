import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authorization } from "./pages/Authorization/Authorization";
import { Search } from "./pages/Search/Search";
import { SearchResults } from "./pages/SearchResults/SearchResults";
import { Favorites } from "./pages/Favorites/Favorites";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authorization />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
  {
    path: "/results",
    element: (
      <SearchResults
        searchResults={{ videos: [], count: 0 }}
        searchRequest=""
      />
    ),
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
