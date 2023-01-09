import React from "react";
import { Video } from "../../constants/constants";
import "./ListView.scss";

export const ListVideo: React.FC<Video> = (props) => {
  return (
    <div className="listVideo">
      <div className="preview">
        <a
          target="_blank"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
        >
          <img src={props.preview} />
        </a>
      </div>
      <div className="info">
        <div className="title">
          {" "}
          <a
            target="_blank"
            href={`https://www.youtube.com/watch?v=${props.videoId}`}
          >
            {props.title}
          </a>
        </div>
        <div className="desc">
          <div>
            <a
              target="_blank"
              href={`https://www.youtube.com/channel/${props.channelId}`}
            >
              {props.channel}
            </a>
          </div>
          <div>{props.views}</div>
        </div>
      </div>
    </div>
  );
};
