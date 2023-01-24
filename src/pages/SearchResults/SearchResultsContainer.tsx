import React, { useState } from "react";
import { NavbarContainer } from "../../components/Navbar/NavbarContainer";
import "./SearchResults.scss";
import { GridView } from "../../components/GridView/GridView";
import { ListView } from "../../components/ListView/ListView";
import { APIKey } from "../../constants/constants";
import {
  fetchVideosByKeyword,
  selectSearchResultsForRequest,
  selectDataFetchFailed,
  selectIsFavoritesNotificationDisplayed,
  selectSearchRequest,
  selectSearchResults,
  setSearchRequest,
  setSearchResultsForRequest,
} from "../../store/videosSlice";
import axios from "axios";
import { apiAnswerTransform } from "../../api/apiAnswerTransform";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { FavoritesFormContainer } from "../../components/FavoritesForm/FavoritesFormContainer";
import { FavoritesNotification } from "../../components/FavoritesNotification/FavoritesNotification";
import { SearchResults } from "./SearchResults";
import { useAppDispatch } from "../../store/store";

export const SearchResultsContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const [newSearchRequest, setNewSearchRequest] = useState<string>("");
  const [isFavoritesModalActive, setIsFavoritesModalActive] =
    useState<boolean>(false);
  const [isGridViewEnabled, setIsGridViewEnabled] = useState<boolean>(false);

  const searchRequest = useAppSelector(selectSearchRequest);
  const searchResults = useAppSelector(selectSearchResults);
  const searchResultsFor = useAppSelector(selectSearchResultsForRequest);
  const dataFetchFailed = useAppSelector(selectDataFetchFailed);
  const isFavoritesNotificationDisplayed = useAppSelector(
    selectIsFavoritesNotificationDisplayed
  );

  const favoriteRequests = JSON.parse(localStorage.getItem("favorites")!);

  const handleSearchClick = async () => {
    await dispatch(fetchVideosByKeyword({ request: newSearchRequest }));
    dispatch(setSearchResultsForRequest(newSearchRequest));
  };

  return (
    <SearchResults
      dataFetchFailed={dataFetchFailed}
      searchResults={searchResults}
      searchRequest={searchRequest}
      searchResultsFor={searchResultsFor}
      onSearchClick={handleSearchClick}
      isFavoritesNotificationDisplayed={isFavoritesNotificationDisplayed}
      isGridViewEnabled={isGridViewEnabled}
      isFavoritesModalActive={isFavoritesModalActive}
      setIsFavoritesModalActive={setIsFavoritesModalActive}
      setIsGridViewEnabled={setIsGridViewEnabled}
      setNewSearchRequest={setNewSearchRequest}
      newSearchRequest={newSearchRequest}
    />
  );
};
