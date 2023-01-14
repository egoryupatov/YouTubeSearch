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

/*export interface SearchResult {
  snippet: Snippet;
  statistics: Statistics;
  id: {
    videoId: string;
  };
}

interface Snippet {
  preview: string;
  title: string;
  channelTitle: string;
  channel: string;
  views: number;
  channelId: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}*/
