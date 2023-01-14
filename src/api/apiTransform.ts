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

  // отправлять запрос на странице поиска и массив айли из респонса передавать в метод apiTransform

  /*  https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=Ks-_Mh1QhMc % 2Cc0KYU2j0TM4 % 2CeIho2S0ZahI&key=[YOUR_API_KEY]*/
  //id в запросе разделены %

  const searchResults = {
    videos: videos,
    count: count,
  };

  return searchResults;
};
