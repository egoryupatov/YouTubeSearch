import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Favorites.scss";
import { APIKey, FavoriteRequest } from "../../constants/constants";
import axios from "axios";
import {
  selectSearchRequest,
  selectSearchResults,
  setSearchRequest,
  setSearchResults,
} from "../../store/videosSlice";
import { apiTransform } from "../../api/apiTransform";
import { useDispatch } from "react-redux";
import { SearchResults } from "../SearchResults/SearchResults";
import { useAppSelector } from "../../store/hooks";

export const Favorites: React.FC = () => {
  const favoriteRequests = JSON.parse(localStorage.getItem("favorites")!);
  const dispatch = useDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const searchRequest = useAppSelector(selectSearchRequest);
  const [areSearchResultsDisplayed, setAreSearchResultsDisplayed] =
    useState(false);

  const onFavoritesClick = (request: FavoriteRequest) => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${request.maxResults}&order=${request.sortBy}&q=${request.request}&key=${APIKey}`
      )
      .then((response) => {
        dispatch(setSearchResults(apiTransform(response)));
        dispatch(setSearchRequest(request.request));
        setAreSearchResultsDisplayed(true);
      });
  };

  return (
    <>
      {areSearchResultsDisplayed ? (
        <div className="searchResultsPageContainer">
          <Navbar />
          <SearchResults
            searchResults={searchResults}
            searchRequest={searchRequest}
          />
        </div>
      ) : (
        <div className="searchResultsPageContainer">
          <Navbar />
          <div className="searchResultsContainer">
            <div className="searchResultsTitle">Favorites</div>
            <div className="favoritesContainer ">
              {favoriteRequests ? (
                favoriteRequests.map((request: FavoriteRequest) => (
                  <div className="favoriteRequest">
                    <span onClick={() => onFavoritesClick(request)}>
                      {request.name}
                    </span>
                  </div>
                ))
              ) : (
                <div className="favoriteErrorMessage">
                  <h2>You don't have any favorite requests yet!</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
