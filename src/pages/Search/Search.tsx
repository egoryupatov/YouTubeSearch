import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import "./Search.scss";
import axios from "axios";
import { APIKey } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { apiTransform } from "../../api/apiTransform";
import {
  selectSearchRequest,
  setSearchRequest,
  setSearchResults,
  setSearchResultsForRequest,
} from "../../store/videosSlice";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRequest = useAppSelector(selectSearchRequest);

  const onSearchClick = async () => {
    const searchForKeywordResults = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchRequest}&key=${APIKey}`
    );

    const videoIDs = searchForKeywordResults.data.items
      .map((item: any) => item.id.videoId)
      .join("%2C");

    await axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoIDs}&key=${APIKey}`
      )
      .then((response) => {
        dispatch(setSearchResults(apiTransform(response)));
        dispatch(setSearchRequest(searchRequest));
        dispatch(setSearchResultsForRequest(searchRequest));
        navigate("/results");
      });
  };

  return (
    <div className="searchPageContainer">
      <Navbar />

      <div className="searchContainer">
        <div className="searchTitle">Search for a video</div>
        <div className="searchForm">
          <input
            type="text"
            placeholder="What are you looking for?"
            onChange={(event) => dispatch(setSearchRequest(event.target.value))}
            onKeyDown={(event) =>
              event.key === "Enter" ? onSearchClick() : null
            }
          />
          <button onClick={onSearchClick}>Search</button>
        </div>
      </div>
    </div>
  );
};
