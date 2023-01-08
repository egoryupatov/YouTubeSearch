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
}

const initialState: UserState = {
  searchResults: {
    videos: [],
    count: 0,
  },
  searchRequest: "",
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
  },
});

export const { setSearchResults, setSearchRequest } = videosSlice.actions;

export const selectSearchResults = (state: RootState) =>
  state.videos.searchResults;

export const selectSearchRequest = (state: RootState) =>
  state.videos.searchRequest;

export default videosSlice.reducer;
