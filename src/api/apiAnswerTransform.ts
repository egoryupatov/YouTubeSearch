import { ISearchResult } from "./apiAnswerTransform.types";
import { IAPIAnswer } from "./apiAnswerTransform.types";

export const apiAnswerTransform = (answer: IAPIAnswer) => {
  const count = answer.data.pageInfo.totalResults;

  const videos = answer.data.items.map((searchResult: ISearchResult) => {
    const video = {
      preview: searchResult.snippet.thumbnails.medium.url,
      title: searchResult.snippet.title,
      channel: searchResult.snippet.channelTitle,
      videoId: searchResult.id,
      channelId: searchResult.snippet.channelId,
      views: searchResult.statistics.viewCount,
    };

    return video;
  });

  const searchResults = {
    videos: videos,
    count: count,
  };

  return searchResults;
};
