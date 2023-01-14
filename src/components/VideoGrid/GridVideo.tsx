import React from "react";
import "./GridView.scss";
import { Video } from "../../constants/constants";

export const GridVideo: React.FC<Video> = (props) => {
  return (
    <div className="videoGrid">
      <div className="preview">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
        >
          {" "}
          <img src={props.preview} alt="" />
        </a>
      </div>
      <div className="title">
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
        >
          {props.title.length >= 56
            ? props.title.slice(0, 56) + "..."
            : props.title}
        </a>
      </div>
      <div className="desc">
        <div>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.youtube.com/channel/${props.channelId}`}
          >
            {props.channel.length >= 27
              ? props.channel.slice(0, 27) + "..."
              : props.channel}
          </a>
        </div>
        <div>{props.views}</div>
      </div>
    </div>
  );
};
