import { Video } from "../constants/constants";

export const apiTransform = (answer: any) => {
  const videos: Video[] = [];
  const count = answer.data.pageInfo.totalResults;

  answer.data.items.map((searchResult: any) => {
    const video = {
      preview: searchResult.snippet.thumbnails.medium.url,
      title: searchResult.snippet.title,
      channel: searchResult.snippet.channelTitle,
      views: 0,
      videoId: searchResult.id.videoId,
      channelId: searchResult.snippet.channelId,
    };

    videos.push(video);
  });

  const searchResults = {
    videos: videos,
    count: count,
  };

  return searchResults;
};
