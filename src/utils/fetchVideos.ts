import axios from "axios";
import { APIKey, ISearchResult } from "../constants/constants";
import { apiTransform } from "../api/apiTransform";

export const fetchVideos = async (
  request: string,
  maxResults?: number,
  order?: string
) => {
  const searchByKeyword = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${
      maxResults ? maxResults : "12"
    }&q=${request}&order=${order ? order : "relevance"}&key=${APIKey}`
  );

  const videoIDs = searchByKeyword.data.items
    .map((item: ISearchResult) => item.id.videoId)
    .join("%2C");

  const detailedSearchResults = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoIDs}&key=${APIKey}`
  );

  return apiTransform(detailedSearchResults);
};
