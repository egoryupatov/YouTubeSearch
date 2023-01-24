import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import videosReducer from "./videosSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    videos: videosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
