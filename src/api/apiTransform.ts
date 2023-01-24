import { IVideo } from "../constants/constants";

interface IPageInfo {
  totalResults: number;
}

interface IData {
  pageInfo: IPageInfo;
  items: IVideo[];
}

interface IAPIAnswer {
  data: IData;
}

export const apiTransform = (answer: IAPIAnswer) => {
  const videos: IVideo[] = [];
  const count = answer.data.pageInfo.totalResults;

  answer.data.items.forEach((searchResult: any) => {
    const video = {
      preview: searchResult.snippet.thumbnails.medium.url,
      title: searchResult.snippet.title,
      channel: searchResult.snippet.channelTitle,
      videoId: searchResult.id,
      channelId: searchResult.snippet.channelId,
      views: searchResult.statistics.viewCount,
    };

    videos.push(video);
  });

  const searchResults = {
    videos: videos,
    count: count,
  };

  return searchResults;
};
