import React from "react";
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
import { Search } from "./Search";

export const SearchContainer: React.FC = () => {
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

    const detailedSearchResults = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoIDs}&key=${APIKey}`
    );

    dispatch(setSearchResults(apiTransform(detailedSearchResults)));
    dispatch(setSearchRequest(searchRequest));
    dispatch(setSearchResultsForRequest(searchRequest));
    navigate("/results");
  };

  return <Search onSearchClick={onSearchClick} dispatch={dispatch} />;
};
