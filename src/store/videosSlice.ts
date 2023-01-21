import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { APIKey, Video } from "../constants/constants";

export interface Results {
  videos: Video[];
  count: number;
}

interface UserState {
  searchResults: Results;
  searchRequest: string;
  searchResultsForRequest: string;
  isFavoritesNotificationDisplayed: boolean;
  videosThunk: Video[];
}

const initialState: UserState = {
  searchResults: {
    videos: [],
    count: 0,
  },
  searchRequest: "",
  searchResultsForRequest: "",
  isFavoritesNotificationDisplayed: false,
  videosThunk: [],
};

const fetchVideos = async (keyword: any) => {
  return fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${keyword}&key=${APIKey}`
  ).then((r) => r.json());
};

export const fetchVideosByKeyword = createAsyncThunk(
  "videos/fetchVideosByKeyword",
  async (keyword: any, thunkAPI) => {
    return await fetchVideos(keyword);
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchVideosByKeyword.fulfilled, (state, action) => {
      state.videosThunk = action.payload;
    });
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
