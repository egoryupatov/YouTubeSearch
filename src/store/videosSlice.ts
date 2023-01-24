import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IVideo } from "../types/general.types";
import { fetchVideos } from "../utils/fetchVideos";

export interface ISearchResults {
  videos: IVideo[];
  count: number;
}

interface IUserState {
  searchResults: ISearchResults;
  searchRequest: string;
  searchResultsForRequest: string;
  isFavoritesNotificationDisplayed: boolean;
  isDataFetchFailed: boolean;
}

const initialState: IUserState = {
  searchResults: {
    videos: [],
    count: 0,
  },
  searchRequest: "",
  searchResultsForRequest: "",
  isFavoritesNotificationDisplayed: false,
  isDataFetchFailed: false,
};

export const fetchVideosByKeyword = createAsyncThunk(
  "videos/fetchVideosByKeyword",
  async (
    {
      request,
      maxResults,
      order,
    }: {
      request: string;
      maxResults?: number;
      order?: string;
    },
    thunkAPI
  ) => {
    return await fetchVideos(request, maxResults, order);
  }
);

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
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
    builder
      .addCase(fetchVideosByKeyword.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isDataFetchFailed = false;
      })
      .addCase(fetchVideosByKeyword.rejected, (state) => {
        state.isDataFetchFailed = true;
      });
  },
});

export const {
  setSearchRequest,
  setIsFavoritesNotificationDisplayed,
  setSearchResultsForRequest,
} = videosSlice.actions;

export const selectSearchResults = (state: RootState) =>
  state.videos.searchResults;

export const selectDataFetchFailed = (state: RootState) =>
  state.videos.isDataFetchFailed;

export const selectSearchRequest = (state: RootState) =>
  state.videos.searchRequest;

export const selectSearchResultsForRequest = (state: RootState) =>
  state.videos.searchResultsForRequest;

export const selectIsFavoritesNotificationDisplayed = (state: RootState) =>
  state.videos.isFavoritesNotificationDisplayed;

export default videosSlice.reducer;
