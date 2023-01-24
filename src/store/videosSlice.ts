import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { IVideo } from "../constants/constants";
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
  dataFetchFailed: boolean;
}

const initialState: IUserState = {
  searchResults: {
    videos: [],
    count: 0,
  },
  searchRequest: "",
  searchResultsForRequest: "",
  isFavoritesNotificationDisplayed: false,
  dataFetchFailed: false,
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
        state.dataFetchFailed = false;
      })
      .addCase(fetchVideosByKeyword.rejected, (state, action) => {
        state.dataFetchFailed = true;
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
  state.videos.dataFetchFailed;

export const selectSearchRequest = (state: RootState) =>
  state.videos.searchRequest;

export const searchResultsForRequest = (state: RootState) =>
  state.videos.searchResultsForRequest;

export const selectIsFavoritesNotificationDisplayed = (state: RootState) =>
  state.videos.isFavoritesNotificationDisplayed;

export default videosSlice.reducer;
