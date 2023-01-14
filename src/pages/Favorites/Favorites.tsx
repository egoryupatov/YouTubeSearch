import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Favorites.scss";
import { APIKey, FavoriteRequest } from "../../constants/constants";
import axios from "axios";
import { setSearchRequest, setSearchResults } from "../../store/videosSlice";
import { apiTransform } from "../../api/apiTransform";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteRequests = JSON.parse(localStorage.getItem("favorites")!);

  const onFavoritesClick = (request: FavoriteRequest) => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${request.maxResults}&order=${request.sortBy}&q=${request.request}&key=${APIKey}`
      )
      .then((response) => {
        dispatch(setSearchResults(apiTransform(response)));
        dispatch(setSearchRequest(request.request));
        navigate("/results");
      });
  };

  return (
    <div className="searchResultsPageContainer">
      <Navbar />
      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Favorites</div>
        <div className="favoritesContainer ">
          {favoriteRequests ? (
            favoriteRequests.map((request: FavoriteRequest) => (
              <div className="favoriteRequest" key={request.name}>
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
  );
};
