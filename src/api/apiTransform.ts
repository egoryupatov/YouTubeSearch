import { Video } from "../constants/constants";

interface PageInfo {
  totalResults: number;
}

interface Data {
  pageInfo: PageInfo;
  items: Video[];
}

interface APIAnswer {
  data: Data;
}

export const apiTransform = (answer: APIAnswer) => {
  const videos: Video[] = [];
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
