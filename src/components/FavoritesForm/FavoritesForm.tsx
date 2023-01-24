import React from "react";
import { FavoritesModalFormErrors } from "./FavoritesFormContainer";

interface FavoritesModalFormProps {
  searchRequest: string;
  setRequestName: (requestName: string) => void;
  setSortBy: (sortBy: string) => void;
  setMaxResults: (maxResults: number) => void;
  maxResults: number;
  errors: FavoritesModalFormErrors;
  setIsFavoritesModalActive: (isFavoritesModalActive: boolean) => void;
  onSaveClick: () => void;
}

export const FavoritesForm: React.FC<FavoritesModalFormProps> = (props) => {
  return (
    <div className="favoritesFormContainer">
      <div className="favoritesFormTitle">Save a search request</div>

      <div className="favoritesFormGroup">
        <div className="favoritesFormInputContainer">
          <div className="favoritesFormTextField">
            <label>Request</label>
            <input type="text" value={props.searchRequest} disabled />
          </div>
        </div>
        <div className="favoritesFormInputContainer">
          <div className="favoritesFormTextField">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter the name"
              onChange={(event) => props.setRequestName(event.target.value)}
            />
          </div>
        </div>
        <div className="favoritesFormInputContainer">
          <div className="favoritesFormTextField">
            <label>Sort by</label>
            <select onChange={(event) => props.setSortBy(event.target.value)}>
              <option value={"relevance"}>Relevance</option>
              <option value={"date"}>Date</option>
              <option value={"rating"}>Rating</option>
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
                  props.setMaxResults(event.target.valueAsNumber);
                }}
              />
            </div>
            <input className="numberOfResults" value={props.maxResults} />
          </div>

          {props.errors.existingName ? (
            <div className="errorMessage">
              You already have a favorite search request with that name!
            </div>
          ) : null}

          {props.errors.emptyName ? (
            <div className="errorMessage">
              The "Name" field can not be empty!
            </div>
          ) : null}

          <div className="favoritesFormButtonsGroup">
            <div className="favoritesFormButtonWhite">
              <button onClick={() => props.setIsFavoritesModalActive(false)}>
                Don't save
              </button>
            </div>
            <div className="favoritesFormButtonBlue">
              <button onClick={props.onSaveClick}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
