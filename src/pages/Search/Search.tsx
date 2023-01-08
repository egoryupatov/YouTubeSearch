import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Search.scss";
import axios from "axios";
import { APIKey } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { apiTransform } from "../../api/apiTransform";
import {
  selectSearchRequest,
  selectSearchResults,
  setSearchRequest,
  setSearchResults,
} from "../../store/videosSlice";
import { useAppSelector } from "../../store/hooks";
import { SearchResults } from "../SearchResults/SearchResults";
import { Modal } from "../../components/Modal/Modal";

export const Search: React.FC = () => {
  const [areSearchResultsDisplayed, setAreSearchResultsDisplayed] =
    useState(false);
  const dispatch = useDispatch();
  const searchResults = useAppSelector(selectSearchResults);
  const searchRequest = useAppSelector(selectSearchRequest);

  const onSearchClick = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchRequest}&key=${APIKey}`
      )
      .then((response) => {
        dispatch(setSearchResults(apiTransform(response)));
        setAreSearchResultsDisplayed(true);
      });
  };

  return (
    <div className="searchPageContainer">
      <Navbar />

      {areSearchResultsDisplayed ? (
        <SearchResults
          searchResults={searchResults}
          searchRequest={searchRequest}
        />
      ) : (
        <div className="searchContainer">
          <div className="searchTitle">Search for a video</div>
          <div className="searchForm">
            <input
              type="text"
              placeholder="What are you looking for?"
              onChange={(event) =>
                dispatch(setSearchRequest(event.target.value))
              }
            />
            <button onClick={onSearchClick}>Search</button>
          </div>
        </div>
      )}
    </div>
  );
};
