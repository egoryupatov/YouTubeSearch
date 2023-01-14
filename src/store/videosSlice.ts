import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Video } from "../constants/constants";

export interface Results {
  videos: Video[];
  count: number;
}

interface UserState {
  searchResults: Results;
  searchRequest: string;
  searchResultsForRequest: string;
  isFavoritesNotificationDisplayed: boolean;
}

const initialState: UserState = {
  searchResults: {
    videos: [],
    count: 0,
  },
  searchRequest: "",
  searchResultsForRequest: "",
  isFavoritesNotificationDisplayed: false,
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchRequest: (state, action) => {
      state.searchRequest = action.payload;
    },
    setSearchResultsForRequest: (state, action) => {
      state.searchResultsForRequest = action.payload;
    },
    setIsFavoritesNotificationDisplayed: (state, action) => {
      state.isFavoritesNotificationDisplayed = action.payload;
    },
  },
});

export const {
  setSearchResults,
  setSearchRequest,
  setIsFavoritesNotificationDisplayed,
  setSearchResultsForRequest,
} = videosSlice.actions;

export const selectSearchResults = (state: RootState) =>
  state.videos.searchResults;

export const selectSearchRequest = (state: RootState) =>
  state.videos.searchRequest;

export const searchResultsForRequest = (state: RootState) =>
  state.videos.searchResultsForRequest;

export const selectIsFavoritesNotificationDisplayed = (state: RootState) =>
  state.videos.isFavoritesNotificationDisplayed;

export default videosSlice.reducer;
