import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authorization } from "./pages/Authorization/Authorization";
import { Search } from "./pages/Search/Search";
import { SearchResults } from "./pages/SearchResults/SearchResults";
import { Favorites } from "./pages/Favorites/Favorites";
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
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="*" element={<Search />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
