export interface IVideo {
  preview: string;
  title: string;
  channel: string;
  views: number;
  videoId: string;
  channelId: string;
}

export interface IFavoriteRequest {
  id: string;
  name: string;
  request: string;
  sortBy: string;
  maxResults: number;
}

export interface ISearchResult {
  snippet: {
    thumbnails: {
      medium: {
        url: string;
      };
    };
    title: string;
    channelTitle: string;
    channelId: string;
  };
  id: {
    videoId: string;
  };
  statistics: {
    viewCount: number;
  };
}
