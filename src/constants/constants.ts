export const APIKey = "AIzaSyBDruJEOObi2q0EzetH-3u_v82UT_xoKJ0";

export interface Video {
  preview: string;
  title: string;
  channel: string;
  views: number;
}

export interface FavoriteRequest {
  name: string;
  request: string;
  sortBy: string;
  maxCount: number;
}
