import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./FavoritesForm.scss";
import { useDispatch } from "react-redux";
import { setIsFavoritesNotificationDisplayed } from "../../store/videosSlice";
import { FavoriteRequest } from "../../constants/constants";
import { FavoritesForm } from "./FavoritesForm";

interface ModalProps {
  setIsFavoritesModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  searchRequest: string;
}

export interface FavoritesModalFormErrors {
  emptyName: boolean;
  existingName: boolean;
}

export const FavoritesFormContainer: React.FC<ModalProps> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setId(uuidv4());
  }, []);
  const [id, setId] = useState<string>("");
  const [requestName, setRequestName] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("unsorted");
  const [maxResults, setMaxResults] = useState<number>(25);
  const [errors, setErrors] = useState<FavoritesModalFormErrors>({
    emptyName: false,
    existingName: false,
  });

  const favorites = JSON.parse(localStorage.getItem("favorites")!);

  const onSaveClick = () => {
    if (
      favorites &&
      favorites.find(
        (favoriteRequest: FavoriteRequest) =>
          favoriteRequest.name === requestName
      )
    ) {
      setErrors({ ...errors, existingName: true });
      return;
    }
    if (!requestName) {
      setErrors({ ...errors, emptyName: true });
      return;
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites
          ? [
              ...favorites,
              {
                id: id,
                request: props.searchRequest,
                name: requestName,
                sortBy: sortBy,
                maxResults: maxResults,
              },
            ]
          : [
              {
                id: id,
                request: props.searchRequest,
                name: requestName,
                sortBy: sortBy,
                maxResults: maxResults,
              },
            ]
      )
    );

    props.setIsFavoritesModalActive(false);
    dispatch(setIsFavoritesNotificationDisplayed(true));
    setErrors({ emptyName: false, existingName: false });
  };

  return (
    <FavoritesForm
      searchRequest={props.searchRequest}
      setRequestName={setRequestName}
      setSortBy={setSortBy}
      setMaxResults={setMaxResults}
      maxResults={maxResults}
      errors={errors}
      setIsFavoritesModalActive={props.setIsFavoritesModalActive}
      onSaveClick={onSaveClick}
    />
  );
};
