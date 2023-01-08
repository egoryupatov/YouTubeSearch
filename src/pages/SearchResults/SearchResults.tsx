import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./SearchResults.scss";
import { GridVideo } from "../../components/VideoGrid/GridVideo";
import { ListVideo } from "../../components/VideoList/ListVideo";
import { APIKey, FavoriteRequest, Video } from "../../constants/constants";
import {
  Results,
  selectSearchRequest,
  selectSearchResults,
  setSearchRequest,
  setSearchResults,
} from "../../store/videosSlice";
import axios from "axios";
import { apiTransform } from "../../api/apiTransform";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { Modal } from "../../components/Modal/Modal";
import { useParams } from "react-router-dom";

export const SearchResults: React.FC = () => {
  const [isFavoritesModalActive, setIsFavoritesModalActive] = useState(false);
  const [isGridViewEnabled, setIsGridViewEnabled] = useState(false);
  const dispatch = useDispatch();
  const searchRequest = useAppSelector(selectSearchRequest);
  const searchResults = useAppSelector(selectSearchResults);
  const params = useParams();

  const favoriteRequests = JSON.parse(localStorage.getItem("favorites")!);

  const onSearchClick = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchRequest}&key=${APIKey}`
      )
      .then((response) => {
        dispatch(setSearchResults(apiTransform(response)));
      });
  };

  return (
    <div className="searchResultsPageContainer">
      <Navbar />
      {isFavoritesModalActive ? (
        <Modal
          setIsFavoritesModalActive={setIsFavoritesModalActive}
          searchRequest={searchRequest}
        />
      ) : null}

      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Search for a video</div>
        <div className="searchForm">
          <input
            type="text"
            defaultValue={searchRequest}
            onChange={(event) => dispatch(setSearchRequest(event.target.value))}
          />
          <img
            src="/images/heart.svg"
            onClick={() => setIsFavoritesModalActive(true)}
          />
          <button onClick={onSearchClick}>Search</button>
        </div>

        <div className="searchResultsToolBar">
          <div className="searchResultsInfo">
            <div>Search results for "{searchRequest}"</div>
            <div className="numberOfSearchResults">{searchResults.count}</div>
          </div>
          <div className="searchResultsView">
            <img
              onClick={() => setIsGridViewEnabled(false)}
              src="/images/list.svg"
            />
            <img
              onClick={() => setIsGridViewEnabled(true)}
              src="/images/grid.svg"
            />
          </div>
        </div>

        {isGridViewEnabled ? (
          <div className="videoGridContainer">
            {searchResults.videos.map((video) => (
              <GridVideo
                preview={video.preview}
                title={video.title}
                channel={video.channel}
                views={video.views}
              />
            ))}
          </div>
        ) : (
          <div className="videoListContainer">
            {searchResults.videos.map((video) => (
              <ListVideo
                preview={video.preview}
                title={video.title}
                channel={video.channel}
                views={video.views}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
