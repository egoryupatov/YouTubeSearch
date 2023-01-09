import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Modal.scss";
import { FavoriteRequest } from "../../constants/constants";

interface ModalProps {
  setIsFavoritesModalActive: Dispatch<SetStateAction<boolean>>;
  searchRequest: string;
}

export const Modal: React.FC<ModalProps> = (props) => {
  useEffect(() => {
    setId(uuidv4());
  }, []);
  const [id, setId] = useState("");
  const [requestName, setRequestName] = useState("");
  const [sortBy, setSortBy] = useState("unsorted");
  const [maxResults, setMaxResults] = useState(25);
  const [isSaveRequestErrorDisplayed, setIsSaveRequestErrorDisplayed] =
    useState(false);

  const favorites = JSON.parse(localStorage.getItem("favorites")!);

  const onSaveClick = () => {
    if (
      favorites.find(
        (favoriteRequest: FavoriteRequest) =>
          favoriteRequest.name === requestName
      )
    ) {
      setIsSaveRequestErrorDisplayed(true);
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
    setIsSaveRequestErrorDisplayed(false);
  };

  return (
    <div className="modalContainer">
      <div className="modalTitle">Save a search request</div>

      <div className="modalGroup">
        <div className="modalInputContainer">
          <div className="modalTextField">
            <label>Request</label>
            <input type="text" value={props.searchRequest} disabled />
          </div>
        </div>
        <div className="modalInputContainer">
          <div className="modalTextField">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter the name"
              onChange={(event) => setRequestName(event.target.value)}
            />
          </div>
        </div>
        <div className="modalInputContainer">
          <div className="modalTextField">
            <label>Sort by</label>
            <select onChange={(event) => setSortBy(event.target.value)}>
              <option value={"unsorted"}>Unsorted</option>
              <option value={"date"}>Date</option>
              <option value={"rating"}>Rating</option>
              <option value={"relevance"}>Relevance</option>
              <option value={"title"}>Title</option>
              <option value={"videoCount"}>Video count</option>
              <option value={"viewCount"}>View count</option>
            </select>
          </div>
        </div>

        <div className="sliderInfo">
          <div className="title">Max count</div>
          <div className="sliderParameter">
            <div className="sliderContainer">
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                defaultValue="25"
                className="slider"
                onChange={(event) => {
                  setMaxResults(event.target.valueAsNumber);
                }}
              />
            </div>
            <input className="numberOfResults" value={maxResults} />
          </div>

          {isSaveRequestErrorDisplayed ? (
            <div className="errorMessage">
              You already have a favorite request with that name!
            </div>
          ) : null}

          <div className="modalButtonsGroup">
            <div className="modalButtonWhite">
              <button onClick={() => props.setIsFavoritesModalActive(false)}>
                Don't save
              </button>
            </div>
            <div className="modalButtonBlue">
              <button onClick={onSaveClick}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
