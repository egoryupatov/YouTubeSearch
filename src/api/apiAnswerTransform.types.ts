export interface IPageInfo {
  totalResults: number;
}

export interface IData {
  pageInfo: IPageInfo;
  items: ISearchResult[];
}

export interface IAPIAnswer {
  data: IData;
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
  statistics: {
    viewCount: number;
  };
  id: string;
}
