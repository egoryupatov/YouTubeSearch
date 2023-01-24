import React, { useEffect, useState } from "react";
import "./Favorites.scss";
import { IFavoriteRequest } from "../../types/general.types";
import {
  fetchVideosByKeyword,
  setIsFavoritesNotificationDisplayed,
  setSearchRequest,
  setSearchResultsForRequest,
} from "../../store/videosSlice";
import { useNavigate } from "react-router-dom";
import { Favorites } from "./Favorites";
import { useAppDispatch } from "../../store/store";

export const FavoritesContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsFavoritesNotificationDisplayed(false));
  }, []);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")!)
  );

  const handleRequestClick = async (request: IFavoriteRequest) => {
    await dispatch(
      fetchVideosByKeyword({
        request: request.request,
        maxResults: request.maxResults,
        order: request.sortBy,
      })
    );
    await dispatch(setSearchRequest(request.request));
    await dispatch(setSearchResultsForRequest(request.name));
    navigate("/results");
  };

  const handleDeleteRequestClick = (requestName: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")!).filter(
      (request: IFavoriteRequest) => request.name !== requestName
    );
    setFavorites(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <Favorites
      favorites={favorites}
      onDeleteRequestClick={handleDeleteRequestClick}
      onRequestClick={handleRequestClick}
    />
  );
};
