import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Favorites.scss";
import { FavoriteRequest } from "../../constants/constants";
import { Link } from "react-router-dom";

export const Favorites: React.FC = () => {
  const favoriteRequests = JSON.parse(localStorage.getItem("favorites")!);

  return (
    <div className="searchResultsPageContainer">
      <Navbar />
      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Favorites</div>
        <div className="favoritesContainer ">
          {favoriteRequests.map((request: FavoriteRequest) => (
            <Link to={"/results"}>
              <div className="favoriteRequest">{request.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
