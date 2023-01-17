import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Favorites.scss";
import { APIKey, FavoriteRequest } from "../../constants/constants";
import axios from "axios";
import {
  setIsFavoritesNotificationDisplayed,
  setSearchRequest,
  setSearchResults,
  setSearchResultsForRequest,
} from "../../store/videosSlice";
import { apiTransform } from "../../api/apiTransform";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsFavoritesNotificationDisplayed(false));
  }, []);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")!)
  );

  const onRequestClick = async (request: FavoriteRequest) => {
    const searchForKeywordResults = await axios.get(
      request.sortBy == "unsorted"
        ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${request.maxResults}&q=${request.request}&key=${APIKey}`
        : `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${request.maxResults}&order=${request.sortBy}&q=${request.request}&key=${APIKey}`
    );

    const videoIDs = searchForKeywordResults.data.items
      .map((item: any) => item.id.videoId)
      .join("%2C");

    const detailedSearchResults = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoIDs}&key=${APIKey}`
    );

    dispatch(setSearchResults(apiTransform(detailedSearchResults)));
    dispatch(setSearchRequest(request.request));
    dispatch(setSearchResultsForRequest(request.name));
    navigate("/results");
  };

  const onDeleteRequestClick = (requestName: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")!).filter(
      (request: any) => request.name !== requestName
    );
    setFavorites(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className="searchResultsPageContainer">
      <Navbar />
      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Favorites</div>
        <div className="favoritesContainer ">
          {favorites && favorites.length > 0 ? (
            favorites.map((request: FavoriteRequest) => (
              <div className="favoriteRequest" key={request.name}>
                <span onClick={() => onRequestClick(request)}>
                  {request.name}
                </span>
                <img
                  src={"/images/delete.svg"}
                  onClick={() => onDeleteRequestClick(request.name)}
                />
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
  );
};
