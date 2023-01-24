import React from "react";
import { IVideo } from "../../constants/constants";
import "./ListView.scss";
import { countViews } from "../../utils/countViews";

export const ListView: React.FC<IVideo> = (props) => {
  return (
    <div className="listView">
      <div className="preview">
        <a
          target="_blank"
          href={`https://www.youtube.com/watch?v=${props.videoId}`}
          rel="noreferrer"
        >
          <div className="tooltipLeft" />
          <img src={props.preview} alt="" />
          <div className="tooltipRight" />
        </a>
      </div>
      <div className="info">
        <div className="title">
          <a
            target="_blank"
            href={`https://www.youtube.com/watch?v=${props.videoId}`}
            rel="noreferrer"
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
