import React from "react";
import { Video } from "../../constants/constants";
import "./ListView.scss";
import { countViews } from "../../utils/countViews";

export const ListVideo: React.FC<Video> = (props) => {
  return (
    <div className="listVideo">
      <div className="preview">
        <a
          target="_blank"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
          rel="noreferrer"
        >
          <img src={props.preview} alt="" />
        </a>
      </div>
      <div className="info">
        <div className="title">
          {" "}
          <a
            target="_blank"
            href={`https://www.youtube.com/watch?v=${props.videoId}`}
            rel="noreferrer"
          >
            {props.title}
          </a>
        </div>
        <div className="desc">
          <div>
            <a
              target="_blank"
              href={`https://www.youtube.com/channel/${props.channelId}`}
              rel="noreferrer"
            >
              {props.channel}
            </a>
          </div>
          <div>{countViews(Number(props.views))}</div>
        </div>
      </div>
    </div>
  );
};
