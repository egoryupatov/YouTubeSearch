import React, { useState } from "react";
import { NavbarContainer } from "../../components/Navbar/NavbarContainer";
import "./SearchResults.scss";
import { GridView } from "../../components/GridView/GridView";
import { ListView } from "../../components/ListView/ListView";
import { APIKey } from "../../constants/constants";
import {
  searchResultsForRequest,
  selectIsFavoritesNotificationDisplayed,
  selectSearchRequest,
  selectSearchResults,
  setSearchRequest,
  setSearchResults,
  setSearchResultsForRequest,
} from "../../store/videosSlice";
import axios from "axios";
import { apiTransform } from "../../api/apiTransform";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { FavoritesFormContainer } from "../../components/FavoritesForm/FavoritesFormContainer";
import { FavoritesNotification } from "../../components/FavoritesNotification/FavoritesNotification";
import { SearchResults } from "./SearchResults";

export const SearchResultsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [newSearchRequest, setNewSearchRequest] = useState<string>("");
  const [isFavoritesModalActive, setIsFavoritesModalActive] =
    useState<boolean>(false);
  const [isGridViewEnabled, setIsGridViewEnabled] = useState<boolean>(false);

  const searchRequest = useAppSelector(selectSearchRequest);
  const searchResults = useAppSelector(selectSearchResults);
  const searchResultsFor = useAppSelector(searchResultsForRequest);
  const isFavoritesNotificationDisplayed = useAppSelector(
    selectIsFavoritesNotificationDisplayed
  );

  const favoriteRequests = JSON.parse(localStorage.getItem("favorites")!);

  const onSearchClick = async () => {
    const searchForKeywordResults = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${newSearchRequest}&key=${APIKey}`
    );

    const videoIDs = searchForKeywordResults.data.items
      .map((item: any) => item.id.videoId)
      .join("%2C");

    const detailedSearchResults = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoIDs}&key=${APIKey}`
    );

    dispatch(setSearchResults(apiTransform(detailedSearchResults)));
    dispatch(setSearchResultsForRequest(newSearchRequest));
  };

  return (
    <SearchResults
      searchResults={searchResults}
      searchRequest={searchRequest}
      searchResultsFor={searchResultsFor}
      onSearchClick={onSearchClick}
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
