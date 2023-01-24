import React from "react";
import "./Search.scss";
import {
  fetchVideosByKeyword,
  selectSearchRequest,
  setSearchRequest,
  setSearchResultsForRequest,
} from "../../store/videosSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import { Search } from "./Search";

export const SearchContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchRequest = useAppSelector(selectSearchRequest);

  const onSearchClick = async () => {
    await dispatch(fetchVideosByKeyword({ request: searchRequest }));
    await dispatch(setSearchRequest(searchRequest));
    await dispatch(setSearchResultsForRequest(searchRequest));
    navigate("/results");
  };

  return <Search onSearchClick={onSearchClick} dispatch={dispatch} />;
};
