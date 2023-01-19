import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorization } from "./pages/Authorization/Authorization";
import { SearchContainer } from "./pages/Search/SearchContainer";
import { SearchResultsContainer } from "./pages/SearchResults/SearchResultsContainer";
import { FavoritesContainer } from "./pages/Favorites/FavoritesContainer";
import { AuthContainer } from "./components/AuthContainer/AuthContainer";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthContainer />
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/search" element={<SearchContainer />} />
          <Route path="/favorites" element={<FavoritesContainer />} />
          <Route path="/results" element={<SearchResultsContainer />} />
          <Route path="*" element={<SearchContainer />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
