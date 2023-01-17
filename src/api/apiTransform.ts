import { Video } from "../constants/constants";

export const apiTransform = (answer: any) => {
  const videos: Video[] = [];
  const count = answer.data.pageInfo.totalResults;

  answer.data.items.forEach((searchResult: any) => {
    const video = {
      preview: searchResult.snippet.thumbnails.medium.url,
      title: searchResult.snippet.title,
      channel: searchResult.snippet.channelTitle,
      videoId: searchResult.id.videoId,
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
