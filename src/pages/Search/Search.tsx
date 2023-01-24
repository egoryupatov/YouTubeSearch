import React from "react";
import { NavbarContainer } from "../../components/Navbar/NavbarContainer";
import { setSearchRequest } from "../../store/videosSlice";
import { Dispatch } from "@reduxjs/toolkit";

interface SearchProps {
  dispatch: Dispatch;
  onSearchClick: () => void;
}

export const Search: React.FC<SearchProps> = (props) => {
  return (
    <div className="searchPageContainer">
      <NavbarContainer />

      <div className="searchContainer">
        <div className="searchTitle">Search for a video</div>
        <div className="searchForm">
          <input
            type="text"
            placeholder="What are you looking for?"
            onChange={(event) =>
              props.dispatch(setSearchRequest(event.target.value))
            }
            onKeyDown={(event) =>
              event.key === "Enter" ? props.onSearchClick() : null
            }
          />
          <button onClick={props.onSearchClick}>Search</button>
        </div>
      </div>
    </div>
  );
};
