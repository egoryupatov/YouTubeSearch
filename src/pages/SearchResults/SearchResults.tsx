import React from "react";
import { NavbarContainer } from "../../components/Navbar/NavbarContainer";
import { FavoritesFormContainer } from "../../components/FavoritesForm/FavoritesFormContainer";
import { FavoritesNotification } from "../../components/FavoritesNotification/FavoritesNotification";
import { GridView } from "../../components/GridView/GridView";
import { ListView } from "../../components/ListView/ListView";
import { ISearchResults } from "../../store/videosSlice";
import { IVideo } from "../../constants/constants";

interface SearchResultsProps {
  isFavoritesModalActive: boolean;
  setIsFavoritesModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  newSearchRequest: string;
  searchRequest: string;
  setNewSearchRequest: (newSearchRequest: string) => void;
  onSearchClick: () => void;
  isFavoritesNotificationDisplayed: boolean;
  searchResultsFor: string;
  searchResults: ISearchResults;
  isGridViewEnabled: boolean;
  setIsGridViewEnabled: (isGridViewEnabled: boolean) => void;
  dataFetchFailed: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = (props) => {
  return (
    <div className="searchResultsPageContainer">
      <NavbarContainer />
      {props.isFavoritesModalActive ? (
        <FavoritesFormContainer
          setIsFavoritesModalActive={props.setIsFavoritesModalActive}
          searchRequest={
            props.newSearchRequest.length >= 1
              ? props.newSearchRequest
              : props.searchRequest
          }
        />
      ) : null}

      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Search for a video</div>
        <div className="searchForm">
          <input
            type="text"
            defaultValue={props.searchRequest}
            onChange={(event) => props.setNewSearchRequest(event.target.value)}
            onKeyDown={(event) =>
              event.key === "Enter" ? props.onSearchClick() : null
            }
          />
          <div className="heartContainer">
            <img
              src={
                props.isFavoritesNotificationDisplayed
                  ? "/images/heart-blue.svg"
                  : "/images/heart.svg"
              }
              alt=""
              onClick={() => props.setIsFavoritesModalActive(true)}
            />
            {props.isFavoritesNotificationDisplayed ? (
              <FavoritesNotification />
            ) : null}
          </div>
          <button onClick={props.onSearchClick}>Search</button>
        </div>

        <div className="searchResultsToolBar">
          <div className="searchResultsInfo">
            {props.dataFetchFailed ? (
              "Something went wrong!"
            ) : (
              <>
                <div>Search results for "{props.searchResultsFor}"</div>

                <div className="numberOfSearchResults">
                  {props.searchResults.count}
                </div>
              </>
            )}
          </div>

          <div className="searchResultsView">
            <img
              onClick={() => props.setIsGridViewEnabled(false)}
              src={
                props.isGridViewEnabled
                  ? "/images/list.svg"
                  : "/images/list-black.svg"
              }
              alt=""
            />
            <img
              onClick={() => props.setIsGridViewEnabled(true)}
              src={
                props.isGridViewEnabled
                  ? "/images/grid-black.svg"
                  : "/images/grid.svg"
              }
              alt=""
            />
          </div>
        </div>

        {props.isGridViewEnabled ? (
          <div className="videoGridContainer">
            {props.searchResults.videos.map((video: IVideo) => (
              <GridView
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
            {props.searchResults.videos.map((video: IVideo) => (
              <ListView
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
