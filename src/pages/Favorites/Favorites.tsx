import React from "react";
import { NavbarContainer } from "../../components/Navbar/NavbarContainer";
import { FavoriteRequest } from "../../constants/constants";

interface FavoritesProps {
  favorites: [];
  onRequestClick: (request: FavoriteRequest) => void;
  onDeleteRequestClick: (requestName: string) => void;
}

export const Favorites: React.FC<FavoritesProps> = (props) => {
  return (
    <div className="searchResultsPageContainer">
      <NavbarContainer />
      <div className="searchResultsContainer">
        <div className="searchResultsTitle">Favorites</div>
        <div className="favoritesContainer ">
          {props.favorites && props.favorites.length > 0 ? (
            props.favorites.map((request: FavoriteRequest) => (
              <div className="favoriteRequest" key={request.name}>
                <span onClick={() => props.onRequestClick(request)}>
                  {request.name}
                </span>
                <img
                  src={"/images/delete.svg"}
                  onClick={() => props.onDeleteRequestClick(request.name)}
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
