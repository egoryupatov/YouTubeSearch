export const APIKey = "AIzaSyBDruJEOObi2q0EzetH-3u_v82UT_xoKJ0";

export interface Video {
  preview: string;
  title: string;
  channel: string;
  views: number;
  videoId: string;
  channelId: string;
}

export interface FavoriteRequest {
  id: string;
  name: string;
  request: string;
  sortBy: string;
  maxResults: number;
}
