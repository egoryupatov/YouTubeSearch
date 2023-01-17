import React, { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./SearchResults.scss";
import { GridVideo } from "../../components/VideoGrid/GridVideo";
import { ListVideo } from "../../components/VideoList/ListVideo";
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
import { Modal } from "../../components/Modal/Modal";
import { Notification } from "../../components/Notification/Notification";

export const SearchResults: React.FC = () => {
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
    <div className="searchResultsPageContainer">
      <Navbar />

      {isFavoritesModalActive ? (
        <Modal
          setIsFavoritesModalActive={setIsFavoritesModalActive}
          searchRequest={
            newSearchRequest.length >= 1 ? newSearchRequest : searchRequest
          }
        />
      ) : null}

      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Search for a video</div>
        <div className="searchForm">
          <input
            type="text"
            defaultValue={searchRequest}
            onChange={(event) => setNewSearchRequest(event.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" ? onSearchClick() : null
            }
          />
          <div className="heartContainer">
            <img
              src={
                isFavoritesNotificationDisplayed
                  ? "/images/heart-blue.svg"
                  : "/images/heart.svg"
              }
              alt=""
              onClick={() => setIsFavoritesModalActive(true)}
            />
            {isFavoritesNotificationDisplayed ? <Notification /> : null}
          </div>
          <button onClick={onSearchClick}>Search</button>
        </div>

        <div className="searchResultsToolBar">
          <div className="searchResultsInfo">
            <div>Search results for "{searchResultsFor}"</div>
            <div className="numberOfSearchResults">{searchResults.count}</div>
          </div>
          <div className="searchResultsView">
            <img
              onClick={() => setIsGridViewEnabled(false)}
              src="/images/list.svg"
              alt=""
            />
            <img
              onClick={() => setIsGridViewEnabled(true)}
              src="/images/grid.svg"
              alt=""
            />
          </div>
        </div>

        {isGridViewEnabled ? (
          <div className="videoGridContainer">
            {searchResults.videos.map((video) => (
              <GridVideo
                key={video.videoId}
                preview={video.preview}
                title={video.title}
                channel={video.channel}
                views={video.views}
                videoId={video.videoId}
                channelId={video.channelId}
              />
            ))}
          </div>
        ) : (
          <div className="videoListContainer">
            {searchResults.videos.map((video) => (
              <ListVideo
                key={video.videoId}
                preview={video.preview}
                title={video.title}
                channel={video.channel}
                views={video.views}
                videoId={video.videoId}
                channelId={video.channelId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
